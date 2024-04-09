import { Router } from 'express'
import authService from '../../services/auth.services'

const authRouter = Router()

authRouter.post('/', async (req, res) => {
  try {
    const authCreated = await authService.createAuth()
    res.json({
      authCreated,
    })
  } catch (error: any) {
    console.log(error.message)
  }
})

export default authRouter
