import { z } from 'zod'

export const createTypeAccount = z.object({
  name: z.string().trim().min(1, 'Name is required'),
})
