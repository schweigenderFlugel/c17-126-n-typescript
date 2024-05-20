import { IAnualHistorial } from '../interfaces/anualHistorial.interface' 
import { IBankAccount } from '../interfaces/bankAccount.interface';
import anualHistorialDao from '../models/daos/anual-historial.dao' 
import { AnualHistorialModel } from '../models/db/entity/anual-historial.entity' 
  
  export default class anualHistorialService {
    /**
     * Get the historial with the given id.
     *
     * @param {IBankAccount['id']} id - The id of the historial.
     * @return {Promise<HistorialModel>} The monthly historial.
     */
    static async getAnualHistorialsByBankAccount(
      id: IBankAccount['id']
    ): Promise<AnualHistorialModel[] | null> {
      const anualHistorialCreated = await anualHistorialDao
        .getInstance()
        .getAnualHistorialByBankAccountId(id);
      return anualHistorialCreated;
    }

    /**
     * Creates the anual historial with the given bank account.
     *
     * @param {Omit<IAnualHistorial, 'id'>} anualHistorialPayload - The payload for creating the anual historial.
     * @return {Promise<AnualHistorialModel>} The created anual historial.
     */
    static async createAnualHistorial(
      anualHistorialPayload: Omit<IAnualHistorial, 'id'>
    ): Promise<AnualHistorialModel> {
      const anualHistorialCreated = await anualHistorialDao
        .getInstance()
        .createAnualHistorial(anualHistorialPayload as IAnualHistorial)
      return anualHistorialCreated;
    }

    /**
     * Updates the anual historial by its ID with the provided anual historial payload.
     *
     * @param {IAnualHistorial['id']} id - The ID of the anual historial to update.
     * @param {Partial<IAnualHistorial>} anualHistorialPayload - The payload containing the updated anual historial information.
     * @return {Promise<AnualHistorialModel | null>} The updated anual historial model or null if not found.
     */
    static async updateAnualHistorial(
      id: IAnualHistorial['id'],
      anualHistorialPayload: Partial<IAnualHistorial>
    ): Promise<AnualHistorialModel | null> {
      const anualHistorialUpdated = await anualHistorialDao
        .getInstance()
        .updateAnualHistorial(id, anualHistorialPayload)
      return anualHistorialUpdated
    }
  
    /**
     * Deletes a anual historial with the given ID.
     *
     * @param {IAnualHistorial['id']} id - The ID of the anual historial to be deleted.
     * @return {Promise<number>} The number of anual historials deleted.
     */
    static async deleteBankAccount(id: IAnualHistorial['id']): Promise<number> {
      const anualHistorialDeleted = await anualHistorialDao
        .getInstance()
        .deleteAnualHistorial(id)
      return anualHistorialDeleted
    }
  }
  