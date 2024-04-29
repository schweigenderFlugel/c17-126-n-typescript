import { z } from 'zod'

export const depositMoney = z.object({
  amount: z.number().min(10, 'Amount is required'),
})
