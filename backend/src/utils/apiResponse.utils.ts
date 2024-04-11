import { Model } from 'sequelize'

const apiSuccessResponse = (payload: Model<any> | null): object => {
  return {
    success: true,
    payload,
  }
}

export default apiSuccessResponse
