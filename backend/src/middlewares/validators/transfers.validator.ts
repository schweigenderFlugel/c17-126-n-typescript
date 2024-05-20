import { z } from 'zod'
import { TYPETRANSFERS } from '../../config/constants'

export const createTransfer = z.object({
  source_account: z.string().trim(),
  destination_alias: z
    .string()
    .trim()
    .min(1, 'Destination account is required'),
  amount: z.number().min(10, 'Amount is required'),
  type: z.nativeEnum(TYPETRANSFERS),
})