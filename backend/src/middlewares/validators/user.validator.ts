import { z } from 'zod'

const phoneRegex = new RegExp(
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
)

export const getUsersByAlias = z.object({
  alias: z.string().trim().min(3, 'It required at least three characters')
})

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
  alias: z.string().trim().optional(),
  address: z.string().trim().optional(),
  phone: z.string().trim().regex(phoneRegex, 'Invalid Number!').optional(),
  min_ammount_transfers: z.number().min(10, 'Minimum is required').optional(),
  max_ammount_transfers: z.number().max(999999, 'Maximum exceeded').optional(),
})
