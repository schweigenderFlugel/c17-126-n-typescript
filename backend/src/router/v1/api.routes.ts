import { Router } from 'express'
import userRouter from './user.routes'
import authRouter from './auth.routes'
import dbLoader from '../../common/db.router';

const router = Router()

router.use('/user', userRouter)
router.use('/auth', authRouter)
router.use('/loader', dbLoader)

export default router
