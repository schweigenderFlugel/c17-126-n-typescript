import { IBankAccount } from "./bankAccount.interface";
import { IHistorialDataValues, IMonthsResponse } from "./historial.interface";

export interface IAnualHistorial {
  id: `${string}-${string}-${string}-${string}-${string}-${string}-`;
  bank_account: IBankAccount['id'];
  year: number;
}

export interface IAnualHistorialDataValues {
  dataValues: {
    year: number;
    months: IHistorialDataValues[]
  }
}

export interface IAnualHistorialResponse {
  year: number;
  month: Partial<IMonthsResponse>;
}