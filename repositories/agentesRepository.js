const agentes = [
  {
    id: '401bccf5-cf9e-489d-8412-446cd169a0f1',
    nome: 'José Augusto',
    dataDeIncorporacao: '1992-10-04',
    cargo: 'delegado',
  },
  {
    id: '12345678-1234-5678-1234-567812345678',
    nome: 'Helena Souza',
    dataDeIncorporacao: '2010-03-15',
    cargo: 'inspetor',
  },
  {
    id: '23456789-2345-6789-2345-678923456789',
    nome: 'Carlos Oliveira',
    dataDeIncorporacao: '2015-07-20',
    cargo: 'delegado',
  },
  {
    id: '34567890-3456-7890-3456-789034567890',
    nome: 'Fernanda Lima',
    dataDeIncorporacao: '2018-01-10',
    cargo: 'inspetor',
  },
  {
    id: '45678901-4567-8901-4567-890145678901',
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
