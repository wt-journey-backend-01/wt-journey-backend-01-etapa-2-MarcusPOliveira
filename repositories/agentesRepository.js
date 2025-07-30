const agentes = []

const findAll = () => {
  return agentes
}

const findById = (id) => {
  return agentes.find((a) => a.id === id)
}

const create = (agente) => {
  agentes.push(agente)
  return agente
}

const update = (id, updated) => {
  const index = agentes.findIndex((agente) => agente.id === id)
  if (index === -1) return null

  agentes[index] = updated

  return updated
}

const patch = (id, partial) => {
  const index = agentes.findIndex((a) => a.id === id)
  if (index === -1) return null

  agentes[index] = { ...agentes[index], ...partial }

  return agentes[index]
}

const remove = (id) => {
  const index = agentes.findIndex((agente) => agente.id === id)
  if (index === -1) return false

  agentes.splice(index, 1)

  return true
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  patch,
  remove,
}
