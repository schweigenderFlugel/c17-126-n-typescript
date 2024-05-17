import { IHistorial } from '../interfaces/historial.interface'; 
import historialDao from '../models/daos/historial.dao'; 
import { HistorialModel } from '../models/db/entity/historial.entity'; 
  
  export default class historialService {
    /**
     * Get all the historials with the given anual historial id.
     *
     * @param {number} anual_historial_id - The id of the anual historial.
     * @return {Promise<HistorialModel>} All the monthly historials.
     */
    static async getHistorials(
      anual_historial_id: number
    ): Promise<HistorialModel[] | null> {
      const historialsFound = await historialDao.getInstance().getHistorials(anual_historial_id);
      return historialsFound;
    }

    /**
     * Get the historial with the given id.
     *
     * @param {number} id - The id of the historial.
     * @return {Promise<HistorialModel>} The monthly historial.
     */
    static async getHistorial(
      id: number
    ): Promise<HistorialModel | null> {
      const historialFound = await historialDao.getInstance().getHistorial(id);
      return historialFound;
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
     * @param {IHistorial} historialPayload - The payload containing the updated historial information.
     * @return {Promise<HistorialModel | null>} The updated historial model or null if not found.
     */
    static async updateHistorial(
      id: number,
      historialPayload: Partial<IHistorial>
    ): Promise<HistorialModel | null> {
      const historialUpdated = await historialDao
        .getInstance()
        .updateHistorial(id, historialPayload)
      return historialUpdated
    }
  
    /**
     * Deletes a historial with the given ID.
     *
     * @param {number} id - The ID of the historial to be deleted.
     * @return {Promise<number>} The number of historials deleted.
     */
    static async deleteHistorial(id: number): Promise<number> {
      const historialDeleted = await historialDao
        .getInstance()
        .deleteHistorial(id)
      return historialDeleted
    }
  }
  