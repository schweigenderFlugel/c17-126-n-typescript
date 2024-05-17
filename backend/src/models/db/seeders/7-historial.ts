import { IHistorial } from "../../../interfaces/historial.interface"; 
import { Historial } from "../entity/historial.entity";
import { bankAccount1, bankAccount2 } from "./5-bank-account";
import { anualHistorial1, anualHistorial2, anualHistorial3, anualHistorial4 } from "./6-anual-historial";

interface HistorialFixtutre extends IHistorial {}

const previousMonth = new Date().getMonth();
const twoMonthsAgo = new Date().getMonth() - 1;
const currentMonth = new Date().getMonth() + 1;

export const historial1: HistorialFixtutre = {
  id: 1,
  anual_historial_id: anualHistorial1.id,
  month: 11,
  balance: 1000,
  expenses: 500,
  investments: 750
}

export const historial2: HistorialFixtutre = {
  id: 2,
  anual_historial_id: anualHistorial1.id,
  month: 12,
  balance: 1200,
  expenses: 400,
  investments: 800
}

export const historial3: HistorialFixtutre = {
  id: 3,
  anual_historial_id: anualHistorial2.id,
  month: twoMonthsAgo,
  balance: 200,
  expenses: 1500,
  investments: 750
}

export const historial4: HistorialFixtutre = {
  id: 4,
  anual_historial_id: anualHistorial2.id,
  month: previousMonth,
  balance: 2000,
  expenses: 100,
  investments: 500
}

export const historial5: HistorialFixtutre = {
  id: 5,
  anual_historial_id: anualHistorial3.id,
  month: 11,
  balance: 1200,
  expenses: 600,
  investments: 450
}

export const historial6: HistorialFixtutre = {
  id: 6,
  anual_historial_id: anualHistorial3.id,
  month: 12,
  balance: 1250,
  expenses: 700,
  investments: 600
}

export const historial7: HistorialFixtutre = {
  id: 7,
  anual_historial_id: anualHistorial4.id,
  month: twoMonthsAgo,
  balance: 2000,
  expenses: 1500,
  investments: 200
}

export const historial8: HistorialFixtutre = {
  id: 8,
  anual_historial_id: anualHistorial4.id,
  month: previousMonth,
  balance: 1500,
  expenses: 850,
  investments: 675,
}

export const historial9: HistorialFixtutre = {
  id: 9,
  anual_historial_id: anualHistorial2.id,
  month: currentMonth,
  balance: bankAccount1.balance,
  expenses: bankAccount1.expenses,
  investments: bankAccount1.investments,
}

export const historial10: HistorialFixtutre = {
  id: 10,
  anual_historial_id: anualHistorial4.id,
  month: currentMonth,
  balance: bankAccount2.balance,
  expenses: bankAccount2.expenses,
  investments: bankAccount2.investments,
}

const historialFixtures = [
  historial1, 
  historial2, 
  historial3, 
  historial4, 
  historial5, 
  historial6, 
  historial7, 
  historial8,
  historial9,
  historial10,
];

export function up({context}: any) {
  return context.bulkInsert(Historial.getTableName(), historialFixtures);
}