import { z } from 'zod'

export const signUpSchema = z.object({
  email: z
    .string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/, "it should be a valid email")
    .trim(),
  password: z
    .string()
    .min(1, 'Password is required.')
    .min(8, 'Password to short')
    .trim(),
})
