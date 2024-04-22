import { TYPETRANSFERS } from '../config/constants'
import { ITypeTransfers } from '../interfaces/typeTransfers.interface'
import typeTransfersDao from '../models/daos/typeTransfers.dao'

export default class typeTransfersService {
  /**
   * Creates a new TypeTransfers instance in the database based on the provided payload.
   *
   * @param {ITypeTransfers} typeTransfersPayload - The payload containing the data for the new TypeTransfers instance.
   * @return {Promise<ITypeTransfers>} A Promise that resolves to the newly created TypeTransfers instance.
   */
  static async createTypeTransfers(
    typeTransfersPayload: Omit<ITypeTransfers, 'id'>
  ): Promise<ITypeTransfers> {
    const typeTransfersCreated = await typeTransfersDao
      .getInstance()
      .createTypeTransfers(typeTransfersPayload)
    return typeTransfersCreated
  }

  /**
   * Retrieves all type transfers from the database.
   *
   * @return {Promise<ITypeTransfers[]>} An array of type transfers
   */
  static async getAllTypeTransfers(): Promise<ITypeTransfers[]> {
    const transfersTypesFound = await typeTransfersDao
      .getInstance()
      .getAllTypeTransfers()
    return transfersTypesFound
  }

  /**
   * Retrieves a TypeTransfersModel by its ID.
   *
   * @param {number} id - The ID of the TypeTransfersModel to retrieve.
   * @return {Promise<ITypeTransfers | null>} The TypeTransfersModel found, or null if not found.
   */
  static async getTypeTransfersById(
    id: number
  ): Promise<ITypeTransfers | null> {
    const typeTransfersFound = await typeTransfersDao
      .getInstance()
      .getTypeTransfersById(id)
    return typeTransfersFound
  }

  /**
   * Retrieves a TypeTransfersModel by its name.
   *
   * @param {TYPETRANSFERS} name - The name of the TypeTransfersModel to retrieve.
   * @return {Promise<ITypeTransfers | null>} The TypeTransfersModel found, or null if not found.
   */
  static async getTypeTransfersByName(
    name: TYPETRANSFERS
  ): Promise<ITypeTransfers | null> {
    const typeTransfersFound = await typeTransfersDao
      .getInstance()
      .getTypeTransfersByName(name)
    return typeTransfersFound
  }

  /**
   * Updates a type transfer in the database.
   *
   * @param {number} id - The ID of the type transfer to update.
   * @param {ITypeTransfers} typeTransfersPayload - The payload containing the updated type transfer information.
   * @return {Promise<ITypeTransfers | null>} A Promise resolving to the updated type transfer model or null if not found.
   */
  static async updateTypeTransfers(
    id: number,
    typeTransfersPayload: ITypeTransfers
  ): Promise<ITypeTransfers | null> {
    const typeTransfersUpdated = await typeTransfersDao
      .getInstance()
      .updateTypeTransfers(id, typeTransfersPayload)
    return typeTransfersUpdated
  }

  /**
   * Deletes a type transfer by its ID.
   *
   * @param {number} id - The ID of the type transfer to be deleted.
   * @return {Promise<number>} The number of type transfers deleted.
   */
  static async deleteTypeTransfers(id: number): Promise<number> {
    const typeTransfersDeleted = await typeTransfersDao
      .getInstance()
      .deleteTypeTransfers(id)
    return typeTransfersDeleted
  }
}
