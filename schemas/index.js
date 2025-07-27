const { z } = require('zod')

const agenteSchema = z.object({
  id: z.string().uuid(),
  nome: z.string().min(1),
  dataDeIncorporacao: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Data de incorporação deve estar no formato AAAA-MM-DD',
  }),
  cargo: z.string().min(1),
})

module.exports = { agenteSchema }
