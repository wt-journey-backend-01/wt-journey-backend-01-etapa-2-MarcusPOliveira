const casos = []

const findAll = () => {
  return casos
}

const findById = (id) => {
  return casos.find((caso) => caso.id === id)
}

const create = (caso) => {
  casos.push(caso)
  return caso
}

const update = (id, updated) => {
  const index = casos.findIndex((caso) => caso.id === id)
  if (index === -1) return null

  updated.id = id
  casos[index] = updated

  return updated
}

const patch = (id, data) => {
  const caso = findById(id)
  if (!caso) return null

  Object.assign(caso, data)

  return caso
}

const remove = (id) => {
  const index = casos.findIndex((caso) => caso.id === id)
  if (index === -1) return false

  casos.splice(index, 1)

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
