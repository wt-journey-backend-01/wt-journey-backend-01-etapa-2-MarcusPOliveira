const casos = [
  {
    id: 'f5fb2ad5-22a8-4cb4-90f2-8733517a0d46',
    titulo: 'homicidio',
    descricao:
      'Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.',
    status: 'aberto',
    agente_id: '401bccf5-cf9e-489d-8412-446cd169a0f1',
  },
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    titulo: 'roubo',
    descricao:
      'Roubo de veículo ocorrido às 15:20 do dia 12/08/2021 no centro da cidade.',
    status: 'em andamento',
    agente_id: '12345678-1234-5678-1234-567812345678',
  },
  {
    id: 'b2c3d4e5-f6a7-8901-bcde-f23456789012',
    titulo: 'furto',
    descricao:
      'Furto de residência registrado às 10:00 do dia 05/09/2022 no bairro Jardim.',
    status: 'resolvido',
    agente_id: '23456789-2345-6789-2345-678923456789',
  },
  {
    id: 'c3d4e5f6-a7b8-9012-cdef-g34567890123',
    titulo: 'sequestro',
    descricao:
      'Sequestro relatado às 18:45 do dia 20/10/2023 na região sul da cidade.',
    status: 'aberto',
    agente_id: '34567890-3456-7890-3456-789034567890',
  },
  {
    id: 'd4e5f6a7-b8c9-0123-defg-h45678901234',
    titulo: 'assalto a banco',
    descricao:
      'Assalto a banco ocorrido às 14:30 do dia 15/11/2024 no centro financeiro.',
    status: 'em andamento',
    agente_id: '45678901-4567-8901-4567-890145678901',
  },
]

function findAll() {
  return casos
}
module.exports = {
  findAll,
}
