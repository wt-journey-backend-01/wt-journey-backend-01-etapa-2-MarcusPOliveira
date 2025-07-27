const agentes = [
  {
    id: '401bccf5-cf9e-489d-8412-446cd169a0f1',
    nome: 'José Augusto',
    dataDeIncorporacao: '1992-10-04',
    cargo: 'delegado',
  },
  {
    id: 'a52fa070-3704-4d9d-aef5-d31d9b963419',
    nome: 'Helena Souza',
    dataDeIncorporacao: '2010-03-15',
    cargo: 'inspetor',
  },
  {
    id: '6b6aa5f6-d13e-4e1d-8711-9d173b7cc5a9',
    nome: 'Carlos Oliveira',
    dataDeIncorporacao: '2015-07-20',
    cargo: 'delegado',
  },
  {
    id: '35458b61-72e5-463b-a181-e10b3f0f858e',
    nome: 'Fernanda Lima',
    dataDeIncorporacao: '2018-01-10',
    cargo: 'inspetor',
  },
  {
    id: 'c8b71c9e-0f7e-48a2-a8c3-6d9693e64f3f',
    nome: 'João Mendes',
    dataDeIncorporacao: '2020-09-25',
    cargo: 'delegado',
  },
]

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

const patch = (id, data) => {
  const agente = findById(id)
  if (!agente) return null
  Object.assign(agente, data)
  return agente
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
