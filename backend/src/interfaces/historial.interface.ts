import { IAnualHistorial } from "./anualHistorial.interface";
import { ITransactionsResponse } from "./transaction.interface";

export interface IHistorial {
  id: `${string}-${string}-${string}-${string}-${string}-${string}-`;
  anual_historial_id: IAnualHistorial['id'];
  month: number;
  balance: number;
  expenses: number;
  investments: number;
}

export interface IHistorialDataValues {
  dataValues: {
    id: number;
    month: number;
    balance: number;
    expenses: number;
    investments: number;
    year: { dataValues: { year: number }};
  }
}

export interface IHistorialResponse {
  month: number;
  balance: number;
  expenses: number;
  investments: number;
  transactions: ITransactionsResponse,
}

export interface IMonthsResponse {
  jan: IHistorialResponse;
  feb: IHistorialResponse;
  mar: IHistorialResponse;
  apr: IHistorialResponse;
  may: IHistorialResponse;
  jun: IHistorialResponse;
  jul: IHistorialResponse;
  aug: IHistorialResponse;
  sep: IHistorialResponse;
  oct: IHistorialResponse;
  nov: IHistorialResponse;
  dec: IHistorialResponse;
}