import { IAnualHistorial } from "../../../interfaces/anualHistorial.interface";
import { AnualHistorial } from "../entity/anual-historial.entity";
import { bankAccount1, bankAccount2 } from "./5-bank-account";

interface AnualHistorialFixtutre extends IAnualHistorial {}

const currentYear = new Date().getFullYear();
const previousYear = new Date().getFullYear() - 1;

export const anualHistorial1: AnualHistorialFixtutre = {
  id: 1,
  bank_account: bankAccount1.id,
  year: previousYear,
}

export const anualHistorial2: AnualHistorialFixtutre = {
  id: 2,
  bank_account: bankAccount1.id,
  year: currentYear,
}

export const anualHistorial3: AnualHistorialFixtutre = {
  id: 3,
  bank_account: bankAccount2.id,
  year: previousYear,
}

export const anualHistorial4: AnualHistorialFixtutre = {
  id: 4,
  bank_account: bankAccount2.id,
  year: currentYear,
}


const anualHistorialFixtures = [anualHistorial1, anualHistorial2, anualHistorial3, anualHistorial4];

export function up({context}: any) {
  return context.bulkInsert(AnualHistorial.getTableName(), anualHistorialFixtures);
}