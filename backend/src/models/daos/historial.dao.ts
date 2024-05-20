import { IAnualHistorial } from '../../interfaces/anualHistorial.interface'
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
   * Get all monthly historials from anual historial.
   *
   * @param {IAnualHistorial['id']} anual_historial_id The id of the anual historial.
   * @return {Promise<HistorialModel>} All the monthly historials.
   */
  async getHistorials(
    anual_historial_id: IAnualHistorial['id']
  ): Promise<HistorialModel[] | null> {
    const historialsFound: HistorialModel[] | null = await Historial.findAll({
      where: { anual_historial_id: anual_historial_id }
    })
    return historialsFound;
  }

  /**
   * Get a monthly historial.
   *
   * @param {number} id The id of the historial.
   * @return {Promise<HistorialModel>} The monthly historial.
   */
  async getHistorial(
    id: IHistorial['id']
  ): Promise<HistorialModel | null> {
    const historialFound: HistorialModel | null = await Historial.findOne({
      where: { id: id }
    })
    return historialFound;
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
   * @param {IHistorial['id']} id - The historial id to update historial.
   * @return {Promise<HistorialModel | null>} The updated historial model or null if not found.
   */
  async updateHistorial(
    id: IHistorial['id'],
    historialPayload: Partial<IHistorial>
  ): Promise<HistorialModel | null> {
    const historialUpdated = await Historial.update(historialPayload, {
      where: { id: id },
      returning: true,
    })
    return historialUpdated[1][0]
  }

  /**
   * Delete a historial by their ID.
   *
   * @param {IHistorial['id']} id - The ID of the historial to be deleted
   * @return {Promise<number>} The number of historials deleted
   */
  async deleteHistorial(id: IHistorial['id']): Promise<number> {
    const historialDeleted = await Historial.destroy({
      where: { id },
    })
    return historialDeleted
  }
}
