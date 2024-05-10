import { IAnualHistorial } from "../../../interfaces/anualHistorial.interface";
import { AnualHistorial } from "../entity/anual-historial.entity";
import { bankAccount1, bankAccount2 } from "./3-bank-account";

interface AnualHistorialFixtutre extends IAnualHistorial {}

export const anualHistorial1: AnualHistorialFixtutre = {
  id: 1,
  bank_account: bankAccount1.id,
  year: new Date().getFullYear(),
}

export const anualHistorial2: AnualHistorialFixtutre = {
  id: 2,
  bank_account: bankAccount2.id,
  year: new Date().getFullYear(),
}

const anualHistorialFixtures = [anualHistorial1, anualHistorial2];

export function up({context}: any) {
  return context.bulkInsert(AnualHistorial.getTableName(), anualHistorialFixtures);
}