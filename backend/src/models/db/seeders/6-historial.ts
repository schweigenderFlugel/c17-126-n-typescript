import { IHistorial } from "../../../interfaces/historial.interface"; 
import { Historial } from "../entity/historial.entity";
import { bankAccount1, bankAccount2 } from "./3-bank-account";
import { anualHistorial1, anualHistorial2, anualHistorial3, anualHistorial4 } from "./5-anual-historial";

interface HistorialFixtutre extends IHistorial {}

export const historial1: HistorialFixtutre = {
  id: 1,
  anual_historial_id: anualHistorial1.id,
  month: 11,
  balance: bankAccount1.balance,
  expenses: bankAccount1.expenses,
  investments: bankAccount1.investments
}

export const historial2: HistorialFixtutre = {
  id: 2,
  anual_historial_id: anualHistorial1.id,
  month: 12,
  balance: bankAccount1.balance,
  expenses: bankAccount1.expenses,
  investments: bankAccount1.investments
}

export const historial3: HistorialFixtutre = {
  id: 3,
  anual_historial_id: anualHistorial2.id,
  month: 1,
  balance: bankAccount1.balance,
  expenses: bankAccount1.expenses,
  investments: bankAccount1.investments
}

export const historial4: HistorialFixtutre = {
  id: 4,
  anual_historial_id: anualHistorial2.id,
  month: 2,
  balance: bankAccount1.balance,
  expenses: bankAccount1.expenses,
  investments: bankAccount1.investments
}

export const historial5: HistorialFixtutre = {
  id: 5,
  anual_historial_id: anualHistorial3.id,
  month: 11,
  balance: bankAccount2.balance,
  expenses: bankAccount2.expenses,
  investments: bankAccount2.investments
}

export const historial6: HistorialFixtutre = {
  id: 6,
  anual_historial_id: anualHistorial3.id,
  month: 12,
  balance: bankAccount2.balance,
  expenses: bankAccount2.expenses,
  investments: bankAccount2.investments
}

export const historial7: HistorialFixtutre = {
  id: 7,
  anual_historial_id: anualHistorial4.id,
  month: 1,
  balance: bankAccount2.balance,
  expenses: bankAccount2.expenses,
  investments: bankAccount2.investments
}

export const historial8: HistorialFixtutre = {
  id: 8,
  anual_historial_id: anualHistorial4.id,
  month: 6,
  balance: bankAccount2.balance,
  expenses: bankAccount2.expenses,
  investments: bankAccount2.investments
}



const historialFixtures = [historial1, historial2, historial3, historial4, historial5, historial6];

export function up({context}: any) {
  return context.bulkInsert(Historial.getTableName(), historialFixtures);
}