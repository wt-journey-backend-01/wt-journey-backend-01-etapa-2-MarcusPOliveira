const { z } = require('zod')

const agenteSchema = z.object({
  id: z.uuid(),
  nome: z.string().min(1),
  dataDeIncorporacao: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Data de incorporação deve estar no formato AAAA-MM-DD',
  }),
  cargo: z.string().min(1),
})

const casoSchema = z.object({
  id: z.string().uuid("Campo 'id' deve ser um UUID válido"),
  titulo: z.string().min(1, "Campo 'titulo' é obrigatório"),
  descricao: z.string().min(1, "Campo 'descricao' é obrigatório"),
  status: z.enum(
    ['aberto', 'solucionado'],
    "Status deve ser 'aberto' ou 'solucionado'"
  ),
  agente_id: z.string().uuid("Campo 'agente_id' deve ser um UUID válido"),
})

module.exports = { agenteSchema, casoSchema }
