import { z } from 'zod'

const phoneRegex = new RegExp(
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
)

export const userCreate = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  lastname: z.string().trim().min(1, 'Lastname is required'),
  alias: z.string().trim().optional(),
  address: z.string().trim().optional(),
  phone: z.string().trim().regex(phoneRegex, 'Invalid Number!').optional(),
  accountType: z.number().nonnegative().positive().default(1),
})
