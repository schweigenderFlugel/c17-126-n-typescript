import { z } from 'zod'

export const createTransfer = z.object({
  source_account: z.number().positive().int(),
  destination_account: z
    .string()
    .trim()
    .min(1, 'Destination account is required'),
  amount: z.number().min(10, 'Amount is required'),
  type: z.string().trim().min(1, 'Type is required'),
})
