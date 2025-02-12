import { z } from 'zod'

const phoneRegex = new RegExp(
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
)

export const userCreate = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  lastname: z.string().trim().min(1, 'Lastname is required'),
  accountType: z.enum(['personal', 'enterprise']),
  alias: z.string().trim(),
  address: z.string().trim().optional(),
  phone: z.string().trim().regex(phoneRegex, 'Invalid Number!').optional(),
})

export const userUpdate = z.object({
  name: z.string().trim().min(1, 'Name is required').optional(),
  lastname: z.string().trim().min(1, 'Lastname is required').optional(),
  accountType: z.enum(['personal', 'enterprise']).optional(),
  alias: z.string().trim().optional(),
  address: z.string().trim().optional(),
  phone: z.string().trim().regex(phoneRegex, 'Invalid Number!').optional(),
})
