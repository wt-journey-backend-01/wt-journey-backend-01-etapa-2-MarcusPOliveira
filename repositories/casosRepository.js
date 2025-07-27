const casos = [
  {
    id: 'd3bb1c35-9c95-4af6-81b9-d52bbf6b9c3e',
    titulo: 'homicidio',
    descricao:
      'Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.',
    status: 'aberto',
    agente_id: 'f3429b63-168c-4f69-93dc-f1ea2f87a318',
  },
  {
    id: '7c8af287-7763-472e-b92a-bd19bb3aa416',
    titulo: 'roubo',
    descricao:
      'Roubo de veículo ocorrido às 15:20 do dia 12/08/2021 no centro da cidade.',
    status: 'aberto',
    agente_id: '839d3f71-6a65-43cf-9e4d-fb6b1ec4df57',
  },
  {
    id: 'd5a071f7-7ad9-4ef0-9247-c82cd450a405',
    titulo: 'furto',
    descricao:
      'Furto de residência registrado às 10:00 do dia 05/09/2022 no bairro Jardim.',
    status: 'solucionado',
    agente_id: 'e4c8f63c-7e13-4be5-b7f5-c7748b98e7b2',
  },
  {
    id: '4b48f8a5-4e16-44ab-bb26-47300c8ebea3',
    titulo: 'sequestro',
    descricao:
      'Sequestro relatado às 18:45 do dia 20/10/2023 na região sul da cidade.',
    status: 'aberto',
    agente_id: '1dc451a1-1c2c-4e2a-a774-63ae2e47ce8b',
  },
  {
    id: 'e3b0323e-bf99-4d10-9fd1-fccad503c5d2',
    titulo: 'assalto a banco',
    descricao:
      'Assalto a banco ocorrido às 14:30 do dia 15/11/2024 no centro financeiro.',
    status: 'solucionado',
    agente_id: 'c0a1cfe9-810f-4ac3-9757-4f1031d0cc72',
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
