// LIBRERIES
import { Router } from 'express'
import { IUser } from '../interfaces/user.interface'
import userServices from '../services/user.services'

const userRouter = Router()

userRouter.get('/', async (req, res) => {
  try {
    const userCreated = await userServices.createUser()
    res.json({
      userCreated,
    })
  } catch (error: any) {
    console.log(error.message)
  }
})

export default userRouter
