import { z } from 'zod'
import { TYPETRANSFERS } from '../../config/constants'

export const createTypeTransfer = z.object({
  name: z.nativeEnum(TYPETRANSFERS),
  description: z.string().trim().optional(),
})
