export interface IBankAccount {
  id: number;
  user_id: number;
  number_account: string;
  balance: number;
}

export interface IGenerateBankAccount extends Omit<IBankAccount, 'id'> {}