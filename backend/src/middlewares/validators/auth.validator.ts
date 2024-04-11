import { z } from 'zod'

export const signUpSchema = z.object({
  username: z.string().min(3, 'Username is required.').trim(),
  password: z
    .string()
    .min(1, 'Password is required.')
    .min(8, 'Password to short')
    .trim(),
})
