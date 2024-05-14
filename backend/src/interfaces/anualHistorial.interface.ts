import { IMonthsResponse, IUserHistorial } from "./historial.interface";

export interface IAnualHistorial {
  id: number;
  bank_account: number;
  year: number;
}

export interface IUserAnualHistorialData {
  dataValues: {
    year: number;
    months: IUserHistorial[]
  }
}

export interface IAnualHistorialDataResponse {
  year: number;
  month: Partial<IMonthsResponse>;
}