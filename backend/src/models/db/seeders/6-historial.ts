import { IHistorial } from "../../../interfaces/historial.interface"; 
import { Historial } from "../entity/historial.entity";
import { bankAccount1, bankAccount2 } from "./3-bank-account";
import { anualHistorial1, anualHistorial2 } from "./5-anual-historial";

interface HistorialFixtutre extends IHistorial {}

export const historial1: HistorialFixtutre = {
  id: 1,
  anual_historial_id: anualHistorial1.id,
  month: 5,
  balance: bankAccount1.balance,
  expenses: bankAccount1.expenses,
  investments: bankAccount1.investments
}

export const historial2: HistorialFixtutre = {
  id: 2,
  anual_historial_id: anualHistorial2.id,
  month: 5,
  balance: bankAccount2.balance,
  expenses: bankAccount2.expenses,
  investments: bankAccount2.investments
}

const historialFixtures = [historial1, historial2];

export function up({context}: any) {
  return context.bulkInsert(Historial.getTableName(), historialFixtures);
}