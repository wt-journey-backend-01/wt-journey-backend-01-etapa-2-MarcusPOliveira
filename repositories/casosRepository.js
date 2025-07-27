const casos = [
  {
    id: 'd3bb1c35-9c95-4af6-81b9-d52bbf6b9c3e',
    titulo: 'homicidio',
    descricao:
      'Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.',
    status: 'aberto',
    agente_id: '401bccf5-cf9e-489d-8412-446cd169a0f1',
  },
  {
    id: '7c8af287-7763-472e-b92a-bd19bb3aa416',
    titulo: 'roubo',
    descricao:
      'Roubo de veículo ocorrido às 15:20 do dia 12/08/2021 no centro da cidade.',
    status: 'aberto',
    agente_id: 'a52fa070-3704-4d9d-aef5-d31d9b963419',
  },
  {
    id: 'd5a071f7-7ad9-4ef0-9247-c82cd450a405',
    titulo: 'furto',
    descricao:
      'Furto de residência registrado às 10:00 do dia 05/09/2022 no bairro Jardim.',
    status: 'solucionado',
    agente_id: '6b6aa5f6-d13e-4e1d-8711-9d173b7cc5a9',
  },
  {
    id: '4b48f8a5-4e16-44ab-bb26-47300c8ebea3',
    titulo: 'sequestro',
    descricao:
      'Sequestro relatado às 18:45 do dia 20/10/2023 na região sul da cidade.',
    status: 'aberto',
    agente_id: '35458b61-72e5-463b-a181-e10b3f0f858e',
  },
  {
    id: 'e3b0323e-bf99-4d10-9fd1-fccad503c5d2',
    titulo: 'assalto a banco',
    descricao:
      'Assalto a banco ocorrido às 14:30 do dia 15/11/2024 no centro financeiro.',
    status: 'solucionado',
    agente_id: 'c8b71c9e-0f7e-48a2-a8c3-6d9693e64f3f',
  },
]

const findAll = () => {
  return casos
}

const findById = (id) => {
  return casos.find((caso) => caso.id === id)
}

const findByAgenteId = (agenteId) => {
  return casos.filter((caso) => caso.agente_id === agenteId)
}

const findByStatus = (status) => {
  return casos.filter((caso) => caso.status === status)
}

const searchByQuery = (q) => {
  return casos.filter(
    (caso) =>
      caso.titulo.toLowerCase().includes(q.toLowerCase()) ||
      caso.descricao.toLowerCase().includes(q.toLowerCase())
  )
}

const create = (caso) => {
  casos.push(caso)
  return caso
}

const update = (id, updated) => {
  const index = casos.findIndex((caso) => caso.id === id)
  if (index === -1) return null
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
  findByAgenteId,
  findByStatus,
  searchByQuery,
  create,
  update,
  patch,
  remove,
}
