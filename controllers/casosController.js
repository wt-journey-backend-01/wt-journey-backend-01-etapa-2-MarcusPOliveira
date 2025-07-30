const { v4: uuidv4 } = require('uuid')

const casosRepository = require('../repositories/casosRepository')
const agentesRepository = require('../repositories/agentesRepository')

const { casoSchema, casoSchemaComId } = require('../schemas')

const { z } = require('zod')

const getAll = (req, res, next) => {
  try {
    const { agente_id, status, q } = req.query
    let data = casosRepository.findAll()

    if (agente_id) {
      const uuidCheck = z.string().uuid().safeParse(agente_id)
      if (!uuidCheck.success) {
        const err = new Error('Parâmetros inválidos')
        err.status = 400
        err.errors = [
          { agente_id: "Campo 'agente_id' deve ser um UUID válido" },
        ]
        return next(err)
      }

      data = data.filter(
        (caso) => caso.agente_id.toLowerCase() === agente_id.toLowerCase()
      )
    }

    if (status) {
      const statusValidos = ['aberto', 'solucionado']
      const statusLower = status.toLowerCase()

      if (!statusValidos.includes(statusLower)) {
        const err = new Error('Status inválido no filtro')
        err.status = 400
        err.errors = [{ status: 'Status deve ser "aberto" ou "solucionado"' }]
        return next(err)
      }

      data = data.filter((caso) => caso.status.toLowerCase() === statusLower)
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
  } catch (err) {
    next(err)
  }
}

const getById = (req, res) => {
  const caso = casosRepository.findById(req.params.id)
  if (!caso) return res.status(404).json({ message: 'Caso não encontrado' })
  res.json(caso)
}

const create = (req, res) => {
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

  const agenteExiste = agentesRepository.findById(parsed.data.agente_id)
  if (!agenteExiste) {
    return res
      .status(404)
      .json({ message: 'Agente responsável não encontrado' })
  }

  const novoCaso = {
    id: uuidv4(),
    ...parsed.data,
  }

  casosRepository.create(novoCaso)
  res.status(201).json(novoCaso)
}

const put = (req, res, next) => {
  try {
    const { id } = req.params
    const parsed = casoSchemaComId.safeParse(req.body)

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

    const agenteExiste = agentesRepository.findById(parsed.data.agente_id)
    if (!agenteExiste) {
      return res.status(404).json({
        message: 'Agente responsável não encontrado',
      })
    }

    const updated = casosRepository.update(id, parsed.data)
    if (!updated) {
      return res.status(404).json({ message: 'Caso não encontrado' })
    }

    res.json(updated)
  } catch (err) {
    next(err)
  }
}

const patch = (req, res) => {
  const partialSchema = casoSchemaComId.partial()
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

  if (parsed.data.agente_id) {
    const agenteExiste = agentesRepository.findById(parsed.data.agente_id)
    if (!agenteExiste) {
      return res.status(404).json({
        message: 'Agente responsável não encontrado',
      })
    }
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
