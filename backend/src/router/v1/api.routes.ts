import { Router } from 'express'
import userRouter from './user.routes'
import authRouter from './auth.routes'
import typesAccountsRouter from './typeAccounts.routes'
import typesTransfersRouter from './typeTransfers.routes'

const router = Router()

router.use('/user', userRouter)
router.use('/auth', authRouter)
router.use('/types-account', typesAccountsRouter)
router.use('/types-transfers', typesTransfersRouter)

export default router
