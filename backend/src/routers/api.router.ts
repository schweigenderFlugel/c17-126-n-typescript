// LIBRERIES
import { Router } from 'express'
// ROUTES
import userRouter from './user.routes'

const router = Router()

router.use('/user', userRouter)

export default router
