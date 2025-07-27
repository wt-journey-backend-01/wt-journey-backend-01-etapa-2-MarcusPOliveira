const casosRepository = require('../repositories/casosRepository')
const agentesRepository = require('../repositories/agentesRepository')
const { casoSchema } = require('../schemas')

const getAll = (req, res) => {
  const { agente_id, status, q } = req.query
  let data = casosRepository.findAll()

  if (agente_id) {
    data = data.filter((caso) => caso.agente_id === agente_id)
  }

  if (status) {
    const statusValidos = ['aberto', 'solucionado']
    if (!statusValidos.includes(status.toLowerCase())) {
      return res.status(400).json({
        status: 400,
        message: 'Status inválido no filtro',
        errors: [{ status: 'Status deve ser "aberto" ou "solucionado"' }],
      })
    }

    data = data.filter((caso) => caso.status === status.toLowerCase())
  }

  if (q) {
    const qLower = q.toLowerCase()
    data = data.filter(
      (caso) =>
        caso.titulo.toLowerCase().includes(qLower) ||
        caso.descricao.toLowerCase().includes(qLower)
    )
  }

  res.json(data)
}

const getById = (req, res) => {
  const caso = casosRepository.findById(req.params.id)
  if (!caso) return res.status(404).json({ message: 'Caso não encontrado' })
  res.json(caso)
}

const create = (req, res) => {
  const parsed = casoSchema.safeParse(req.body)
  console.log('Dados recebidos:', parsed)

  if (!parsed.success) {
    const errors = parsed.error.issues.map((issue) => ({
      [issue.path[0]]: issue.message,
    }))

    return res.status(400).json({
      status: 400,
      message: 'Parâmetros inválidos',
      errors,
    })
  }

  const agenteExiste = agentesRepository.findByAgenteId(parsed.data.agente_id)
  if (!agenteExiste) {
    return res
      .status(404)
      .json({ message: 'Agente responsável não encontrado' })
  }

  const novo = casosRepository.create(parsed.data)
  res.status(201).json(novo)
}

const put = (req, res) => {
  const parsed = casoSchema.safeParse(req.body)

  if (!parsed.success) {
    const errors = parsed.error.issues.map((issue) => ({
      [issue.path[0]]: issue.message,
    }))

    return res.status(400).json({
      status: 400,
      message: 'Parâmetros inválidos',
      errors,
    })
  }

  const atualizado = casosRepository.update(req.params.id, parsed.data)
  if (!atualizado)
    return res.status(404).json({ message: 'Caso não encontrado' })

  res.json(atualizado)
}

const patch = (req, res) => {
  const partialSchema = casoSchema.partial()
  const parsed = partialSchema.safeParse(req.body)

  if (!parsed.success) {
    const errors = parsed.error.issues.map((issue) => ({
      [issue.path[0]]: issue.message,
    }))

    return res.status(400).json({
      status: 400,
      message: 'Parâmetros inválidos',
      errors,
    })
  }

  const atualizado = casosRepository.patch(req.params.id, parsed.data)
  if (!atualizado)
    return res.status(404).json({ message: 'Caso não encontrado' })

  res.json(atualizado)
}

const remove = (req, res) => {
  const sucesso = casosRepository.remove(req.params.id)
  if (!sucesso) return res.status(404).json({ message: 'Caso não encontrado' })

  res.status(204).send()
}

module.exports = {
  getAll,
  getById,
  create,
  put,
  patch,
  remove,
}
