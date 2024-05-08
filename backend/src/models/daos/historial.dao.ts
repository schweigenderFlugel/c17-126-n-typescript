import { IHistorial } from '../../interfaces/historial.interface'
import { Historial } from '../db/entity/historial.entity'
import { HistorialModel } from '../db/entity/historial.entity'

export default class historialDao {
  private static intance: historialDao | null = null

  private constructor() {}

  static getInstance(): historialDao {
    if (!this.intance) {
      this.intance = new historialDao()
    }

    return this.intance
  }

  /**
   * Creates a monthly historial.
   *
   * @param {IHistorial} historialPayload - The payload for creating the historial.
   * @return {Promise<HistorialModel>} The created monthly historial.
   */
  async createHistorial(
    historialPayload: IHistorial
  ): Promise<HistorialModel> {
    const bankAccountCreated: HistorialModel = await Historial.create(historialPayload)
    return bankAccountCreated
  }

  /**
   * Asynchronously updates the monthly historial
   *
   * @param {number} bank_account - The bank account id to update historial.
   * @return {Promise<HistorialModel | null>} The updated historial model or null if not found.
   */
  async updateHistorial(
    bank_account: number,
    historialPayload: Partial<IHistorial>
  ): Promise<HistorialModel | null> {
    const historialUpdated = await Historial.update(historialPayload, {
      where: { bank_account: bank_account },
      returning: true,
    })
    return historialUpdated[1][0]
  }
}
