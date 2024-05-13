import { IUserTransactionSentData } from "./transaction.interface";

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
    month: number;
    balance: number;
    expenses: number;
    investments: number;
    year: { dataValues: { year: number }};
    transactions_sent: IUserTransactionSentData[],
    transactions_received: IUserTransactionSentData[],
  }
}

export interface IMonths {
  jan: IUserHistorial['dataValues'];
  feb: IUserHistorial['dataValues'];
  mar: IUserHistorial['dataValues'];
  apr: IUserHistorial['dataValues'];
  may: IUserHistorial['dataValues'];
  jun: IUserHistorial['dataValues'];
  jul: IUserHistorial['dataValues'];
  aug: IUserHistorial['dataValues'];
  sep: IUserHistorial['dataValues'];
  oct: IUserHistorial['dataValues'];
  nov: IUserHistorial['dataValues'];
  dec: IUserHistorial['dataValues'];
}