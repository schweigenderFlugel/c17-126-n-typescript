import { IAnualHistorial } from '../../interfaces/anualHistorial.interface' 
import { IBankAccount } from '../../interfaces/bankAccount.interface'
import { AnualHistorial } from '../db/entity/anual-historial.entity' 
import { AnualHistorialModel } from '../db/entity/anual-historial.entity' 

export default class anualHistorialDao {
  private static intance: anualHistorialDao | null = null

  private constructor() {}

  static getInstance(): anualHistorialDao {
    if (!this.intance) {
      this.intance = new anualHistorialDao()
    }

    return this.intance
  }

  /**
   * Get a anual historial.
   *
   * @param {IHistorial} bank_account - The ID of bank account to retrieve the anual historial.
   * @return {Promise<HistorialModel>} The created anual historial.
   */
  async getAnualHistorialByBankAccountId(bank_account: IBankAccount['id']): Promise<AnualHistorialModel[] | null> {
    const bankAccountCreated: AnualHistorialModel[] | null = await AnualHistorial.findAll({
        where: { bank_account: bank_account }
    })
    return bankAccountCreated
  }

  /**
   * Creates a anual historial.
   *
   * @param {IHistorial} historialPayload - The payload for creating the anualhistorial.
   * @return {Promise<HistorialModel>} The created anual historial.
   */
  async createAnualHistorial(
    historialPayload: IAnualHistorial
  ): Promise<AnualHistorialModel> {
    const bankAccountCreated: AnualHistorialModel = await AnualHistorial.create(historialPayload)
    return bankAccountCreated
  }

  /**
   * Asynchronously updates the anual historial
   *
   * @param {number} bank_account - The bank account id to update historial.
   * @return {Promise<HistorialModel | null>} The updated historial model or null if not found.
   */
  async updateAnualHistorial(
    id: IAnualHistorial['id'],
    historialPayload: Partial<IAnualHistorial>
  ): Promise<AnualHistorialModel | null> {
    const historialUpdated = await AnualHistorial.update(historialPayload, {
      where: { id: id },
      returning: true,
    })
    return historialUpdated[1][0]
  }

  /**
   * Delete a anual historial by their ID.
   *
   * @param {number} id - The ID of the anual historial to be deleted
   * @return {Promise<number>} The number of anual historials deleted
   */
  async deleteAnualHistorial(id: IAnualHistorial['id']): Promise<number> {
    const anualHistorialDeleted = await AnualHistorial.destroy({
      where: { id },
    })
    return anualHistorialDeleted
  }
}
