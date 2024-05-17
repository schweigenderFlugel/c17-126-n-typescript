import { IUserTransactionsResponse } from "./transaction.interface";

export interface IHistorial {
  id: number;
  anual_historial_id: number;
  month: number;
  balance: number;
  expenses: number;
  investments: number;
}

export interface IUserHistorial {
  dataValues: {
    id: number;
    month: number;
    balance: number;
    expenses: number;
    investments: number;
    year: { dataValues: { year: number }};
  }
}

export interface IUserHistorialResponse {
  month: number;
  balance: number;
  expenses: number;
  investments: number;
  transactions: IUserTransactionsResponse,
}

export interface IMonthsResponse {
  jan: IUserHistorialResponse;
  feb: IUserHistorialResponse;
  mar: IUserHistorialResponse;
  apr: IUserHistorialResponse;
  may: IUserHistorialResponse;
  jun: IUserHistorialResponse;
  jul: IUserHistorialResponse;
  aug: IUserHistorialResponse;
  sep: IUserHistorialResponse;
  oct: IUserHistorialResponse;
  nov: IUserHistorialResponse;
  dec: IUserHistorialResponse;
}