// LIBRERIES
import { Router } from 'express'
import { IUser } from '../../interfaces/user.interface'
import userService from '../../services/user.services'

const userRouter = Router()

userRouter.get('/')

export default userRouter
