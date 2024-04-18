import { ITypeAccount } from "../../../interfaces/type-account.interface";
import { TypeAccount } from "../entity/type-account.entity";

interface TypeAccountFixture extends Omit<ITypeAccount, 'id'> {}

const adminTypeAccount: TypeAccountFixture = {
  name: 'admin'
}

const normalTypeAccount: TypeAccountFixture = {
  name: 'admin'
}

const typeAccountFixtures = [adminTypeAccount, normalTypeAccount];

export function up({context}: any) {
    return context.bulkInsert(TypeAccount.getTableName(), typeAccountFixtures);
  }