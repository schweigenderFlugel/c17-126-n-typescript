import { Router } from 'express'
import userRouter from './user.routes'
import authRouter from './auth.routes'
import typesAccountsRouter from './typeAccounts.routes'

const router = Router()

router.use('/user', userRouter)
router.use('/auths', authRouter)
router.use('/types-account', typesAccountsRouter)

export default router
