const { agenteSchema } = require('../schemas')
const agentesRepository = require('../repositories/agentesRepository')

const getAll = (req, res) => {
  let allAgentes = agentesRepository.findAll()
  // res.status(200).json(allAgentes)

  const { cargo, sort } = req.query

  if (cargo) {
    agentes = agentes.filter(
      (a) => a.cargo.toLowerCase() === cargo.toLowerCase()
    )
  }

  if (sort) {
    const validSortFields = ['dataDeIncorporacao']
    const sortKey = sort.replace('-', '')
    const reverse = sort.startsWith('-')

    if (validSortFields.includes(sortKey)) {
      agentes.sort((a, b) => {
        const aDate = new Date(a[sortKey])
        const bDate = new Date(b[sortKey])
        return reverse ? bDate - aDate : aDate - bDate
      })
    }
  }

  res.json(allAgentes)
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

  agentesRepository.create(data.data)
  res.status(201).json(data)
}

const put = (req, res) => {
  try {
    const data = agenteSchema.parse(req.body)

    console.log('Dados:', data)

    const updated = agentesRepository.update(req.params.id, data)
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
