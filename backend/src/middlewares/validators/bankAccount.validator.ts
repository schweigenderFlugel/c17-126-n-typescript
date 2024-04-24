import { z } from 'zod'

export const depositMoney = z.object({
  accountId: z.number().positive().int(),
  amount: z.number().min(10, 'Amount is required'),
})
