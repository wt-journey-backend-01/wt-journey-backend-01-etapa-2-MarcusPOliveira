const { agenteSchema } = require('../schemas')
const agentesRepository = require('../repositories/agentesRepository')

const getAll = (req, res) => {
  let agentes = agentesRepository.findAll()
  const { cargo, sort } = req.query

  if (cargo) {
    const cargosValidos = ['delegado', 'inspetor']
    if (!cargosValidos.includes(cargo.toLowerCase())) {
      return res.status(400).json({
        status: 400,
        message: 'Cargo inválido no filtro',
        errors: [
          { cargo: 'Cargo não reconhecido. Use "delegado" ou "inspetor"' },
        ],
      })
    }

    agentes = agentes.filter(
      (a) => a.cargo.toLowerCase() === cargo.toLowerCase()
    )
  }

  if (sort) {
    const validSortFields = ['dataDeIncorporacao']
    const sortKey = sort.replace('-', '')
    const reverse = sort.startsWith('-')

    if (!validSortFields.includes(sortKey)) {
      return res.status(400).json({
        status: 400,
        message: 'Campo de ordenação inválido',
        errors: [
          {
            sort: 'Campo sort deve ser "dataDeIncorporacao" ou "-dataDeIncorporacao"',
          },
        ],
      })
    }

    agentes.sort((a, b) => {
      const aDate = new Date(a[sortKey])
      const bDate = new Date(b[sortKey])
      return reverse ? bDate - aDate : aDate - bDate
    })
  }

  res.json(agentes)
}

const getById = (req, res) => {
  const { id } = req.params
  const agente = agentesRepository.findById(id)

  if (!agente) return res.status(404).json({ message: 'Agente não encontrado' })

  res.status(200).json(agente)
}

const create = (req, res) => {
  const data = agenteSchema.safeParse(req.body)

  console.log('Dados:', data)

  if (!data.success) {
    console.error('Erro de validação:', data.error)

    const formattedErrors = data.error.issues.map((issue) => ({
      [issue.path[0]]: issue.message,
    }))

    return res.status(400).json({
      status: 400,
      message: 'Parâmetros inválidos',
      errors: formattedErrors,
    })
  }

  const novoAgente = agentesRepository.create(data.data)
  res.status(201).json(novoAgente)
}

const put = (req, res, next) => {
  try {
    const { id } = req.params
    const parsed = agenteSchema.safeParse(req.body)

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

    if (parsed.data.id !== id) {
      return res.status(400).json({
        status: 400,
        message: 'ID no corpo da requisição deve ser igual ao ID da URL',
        errors: [{ id: 'ID inconsistente com o parâmetro da URL' }],
      })
    }

    const updated = agentesRepository.update(id, parsed.data)
    if (!updated) {
      return res.status(404).json({ message: 'Agente não encontrado' })
    }

    res.json(updated)
  } catch (err) {
    next(err)
  }
}

const patch = (req, res) => {
  try {
    const partialSchema = agenteSchema.partial()

    const data = partialSchema.parse(req.body)

    const updated = agentesRepository.patch(req.params.id, data)
    if (!updated)
      return res.status(404).json({ message: 'Agente não encontrado' })

    res.json(updated)
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: 'Parâmetros inválidos',
      errors: error.flatten().fieldErrors,
    })
  }
}

const remove = (req, res) => {
  const deleted = agentesRepository.remove(req.params.id)
  if (!deleted)
    return res.status(404).json({ message: 'Agente não encontrado' })

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
