import { Router } from 'express'
import userRouter from './user.routes'
import authRouter from './auth.routes'

const router = Router()

router.use('/users', userRouter)

router.use('/auths', authRouter)

export default router
