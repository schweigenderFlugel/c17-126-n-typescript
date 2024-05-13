import { IMonths, IUserHistorial } from "./historial.interface";

export interface IAnualHistorial {
  id: number;
  bank_account: number;
  year: number;
}

export interface IUserAnualHistorial {
  dataValues: {
    year: number;
    months: IUserHistorial[]
  }
}

export interface IAnualHistorialResponse {
  year: number;
  month: Partial<IMonths>;
}