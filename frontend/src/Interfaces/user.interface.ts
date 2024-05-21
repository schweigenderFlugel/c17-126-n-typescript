import { ITransactions } from "./transactions.interface";

export interface IUser {
  id: string;
  name: string;
  lastname: string;
  avatar: string | null;
  accountType: string;
  alias: string;
  address: string;
  phone: string;
  auth: IAuth;
  preference: IPreference;
  bank_account: IBankAccount;
}

export interface IUserRelated {
  user: {
    name: string;
    lastname: string;
  }
}

export interface IAuth {
  id: string;
  email: string;
}

export interface IPreference {
  min_ammount_transfers: number;
  max_ammount_transfers: number;
}

export interface IBankAccount {
  id: string;
  number_account: string;
  balance: number;
  expenses: number;
  investments: number;
  anual_historial: IAnualHistorial[];
}

export interface IAnualHistorial {
  id: number;
  year: number;
  month: IMonths;
}

export interface IMonths {
  jan: IHistorial | null;
  feb: IHistorial | null;
  mar: IHistorial | null;
  apr: IHistorial | null;
  may: IHistorial | null;
  jun: IHistorial | null;
  jul: IHistorial | null;
  aug: IHistorial | null;
  sep: IHistorial | null;
  oct: IHistorial | null;
  nov: IHistorial | null;
  dec: IHistorial | null;
}

export interface IChartData {
  date: string;
  Gastos: IHistorial['expenses'];
  Balance: IHistorial['balance'];
}

export interface IHistorial {
  balance: number;
  expenses: number;
  investments: number;
  transactions: ITransactions;
}

