import { IHistorial } from '../interfaces/historial.interface'; 
import historialDao from '../models/daos/historial.dao'; 
import { HistorialModel } from '../models/db/entity/historial.entity'; 
  
  export default class historialService {
    /**
     * Get the historial with the given id.
     *
     * @param {number} id - The id of the historial.
     * @return {Promise<HistorialModel>} The monthly historial.
     */
    static async getHistorials(
      anualHistorial: number
    ): Promise<HistorialModel[] | null> {
      const anualHistorialCreated = await historialDao.getInstance().getHistorials(anualHistorial);
      return anualHistorialCreated;
    }

    /**
     * Creates the historial with the given bank account.
     *
     * @param {IHistorial} historialPayload - The payload for creating the historial.
     * @return {Promise<AnualHistorialModel>} The created historial.
     */
    static async createHistorial(
      historialPayload: Omit<IHistorial, 'id'>
    ): Promise<HistorialModel> {
      const anualHistorialCreated = await historialDao
        .getInstance()
        .createHistorial(historialPayload as IHistorial)
      return anualHistorialCreated;
    }

    /**
     * Updates the historial by its ID with the provided historial payload.
     *
     * @param {number} id - The ID of the historial to update.
     * @param {IHistorial} bankAccountPayload - The payload containing the updated historial information.
     * @return {Promise<HistorialModel | null>} The updated historial model or null if not found.
     */
    static async updateHistorial(
      id: number,
      bankAccountPayload: Partial<IHistorial>
    ): Promise<HistorialModel | null> {
      const bankAccountUpdated = await historialDao
        .getInstance()
        .updateHistorial(id, bankAccountPayload)
      return bankAccountUpdated
    }
  
    /**
     * Deletes a historial with the given ID.
     *
     * @param {number} id - The ID of the historial to be deleted.
     * @return {Promise<number>} The number of historials deleted.
     */
    static async deleteHistorial(id: number): Promise<number> {
      const anualHistorialDeleted = await historialDao
        .getInstance()
        .deleteHistorial(id)
      return anualHistorialDeleted
    }
  }
  