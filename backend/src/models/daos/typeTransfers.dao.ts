import { ITypeTransfers } from '../../interfaces/typeTransfers.interface'
import {
  TypeTransfers,
  TypeTransfersModel,
} from '../db/entity/type-transfer.entity'
export default class typeTransfersDao {
  private static intance: typeTransfersDao | null = null

  private constructor() {}

  static getInstance(): typeTransfersDao {
    if (!this.intance) {
      this.intance = new typeTransfersDao()
    }

    return this.intance
  }

  /**
   * Creates a new TypeTransfersModel instance in the database based on the provided payload.
   *
   * @param {ITypeTransfers} typeTreansferPayload - The payload containing the data for the new TypeTransfersModel instance.
   * @return {Promise<TypeTransfersModel>} A Promise that resolves to the newly created TypeTransfersModel instance.
   */
  async createTypeTransfers(
    typeTreansferPayload: ITypeTransfers
  ): Promise<TypeTransfersModel> {
    const typeTransfertCreated: TypeTransfersModel =
      await TypeTransfers.create(typeTreansferPayload)
    return typeTransfertCreated
  }

  /**
   * Retrieves all TypeTransfersModel instances from the database.
   *
   * @return {Promise<TypeTransfersModel[]>} A promise that resolves to an array of TypeTransfersModel instances.
   */
  async getAllTypeTransfers(): Promise<TypeTransfersModel[]> {
    const typeTransfertFound: TypeTransfersModel[] =
      await TypeTransfers.findAll()
    return typeTransfertFound
  }

  /**
   * Retrieves a TypeTransfersModel by its ID.
   *
   * @param {number} id - The ID of the TypeTransfersModel to retrieve.
   * @return {Promise<TypeTransfersModel | null>} The TypeTransfersModel found, or null if not found.
   */
  async getTypeTransfersById(id: number): Promise<TypeTransfersModel | null> {
    const typeTransfertFound: TypeTransfersModel | null =
      await TypeTransfers.findByPk(id)
    return typeTransfertFound
  }

  /**
   * Retrieves a TypeTransfersModel by its name.
   *
   * @param {string} name - The name of the TypeTransfersModel to retrieve.
   * @return {Promise<TypeTransfersModel | null>} The TypeTransfersModel found, or null if not found.
   */
  async getTypeTransfersByName(
    name: string
  ): Promise<TypeTransfersModel | null> {
    const typeTransfertFound: TypeTransfersModel | null =
      await TypeTransfers.findOne({ where: { name } })
    return typeTransfertFound
  }

  /**
   * Updates a type transfer in the database.
   *
   * @param {number} id - The ID of the type transfer to update.
   * @param {ITypeTransfers} typeTransfertPayload - The payload containing the updated type transfer information.
   * @return {Promise<TypeTransfersModel | null>} A Promise resolving to the updated type transfer model or null if not found.
   */
  async updateTypeTransfers(
    id: number,
    typeTransfertPayload: ITypeTransfers
  ): Promise<TypeTransfersModel | null> {
    const typeTransfertUpdated = await TypeTransfers.update(
      typeTransfertPayload,
      { where: { id }, returning: true }
    )
    return typeTransfertUpdated[1][0]
  }

  /**
   * Deletes a type transfer by its ID.
   *
   * @param {number} id - The ID of the type transfer to be deleted.
   * @return {Promise<number>} The number of type transfers deleted.
   */
  async deleteTypeTransfers(id: number): Promise<number> {
    const typeTransfertDeleted = await TypeTransfers.destroy({ where: { id } })
    return typeTransfertDeleted
  }
}
