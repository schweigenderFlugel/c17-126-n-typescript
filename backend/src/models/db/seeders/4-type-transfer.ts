import { TYPETRANSFERS } from "../../../config/constants";
import { ITypeTransfers } from "../../../interfaces/typeTransfers.interface";
import { TypeTransfers } from "../entity/type-transfer.entity";

export const typeTransfer1: ITypeTransfers = {
  id: 1,
  name: TYPETRANSFERS.CREDIT,
  description: 'credit',
}

export const typeTransfer2: ITypeTransfers = {
  id: 2,
  name: TYPETRANSFERS.DEBIT,
  description: 'debit',
}

export const typeTransfer3: ITypeTransfers = {
  id: 3,
  name: TYPETRANSFERS.DEFERRED,
  description: 'deferred',
}

export const typeTransfer4: ITypeTransfers = {
  id: 4,
  name: TYPETRANSFERS.INMEDIATE,
  description: 'inmmediate',
}

const typeTransferFixtures = [typeTransfer1, typeTransfer2, typeTransfer3, typeTransfer4];

export function up({context}: any) {
  return context.bulkInsert(TypeTransfers.getTableName(), typeTransferFixtures);
}