import { z } from 'zod'

export const signUpSchema = z.object({
  email: z
    .string()
    .trim()
    .email('it should be a valid email')
    .min(1, 'Email is required'),
  password: z
    .string()
    .min(1, 'Password is required.')
    .min(8, 'Password to short')
    .trim(),
})

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email('it should be a valid email')
    .min(1, 'Email is required'),
  password: z
    .string()
    .min(1, 'Password is required.')
    .min(8, 'Password to short')
    .trim(),
})
