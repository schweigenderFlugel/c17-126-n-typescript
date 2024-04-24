import { Auth } from './auth.entity'
import { BankAccount } from './bank-account.entity'
import { Preferences } from './preference.entity'
import { Transaction } from './transaction.entity'
import { TypeTransfers } from './type-transfer.entity'
import { User } from './user.entity'

// RELATIONS FOR AUTH
User.belongsTo(Auth, {
  as: 'auth',
})

Auth.hasOne(User, {
  as: 'user',
  foreignKey: 'authId',
})

Preferences.belongsTo(User, {
  as: 'user',
})

User.hasOne(Preferences, {
  as: 'preferences',
  foreignKey: 'userId',
})

// RELATIONS FOR BANK ACCOUNT
BankAccount.belongsTo(User, {
  as: 'user',
})

User.hasOne(BankAccount, {
  as: 'bank_account',
  foreignKey: 'userId',
})

// RELATIONS FOR TRANSACTION
BankAccount.hasMany(Transaction, {
  as: 'transactions_sent',
  foreignKey: 'source_account',
})

BankAccount.hasMany(Transaction, {
  as: 'transactions_received',
  foreignKey: 'destination_account',
})

Transaction.belongsTo(BankAccount, {
  foreignKey: 'source_account',
})

Transaction.belongsTo(BankAccount, {
  foreignKey: 'destination_account',
})

// RELATIONS FOR TYPE TRANSFER
TypeTransfers.hasMany(Transaction, {
  foreignKey: 'type_transfer_id',
})

Transaction.belongsTo(TypeTransfers, {
  foreignKey: 'type_transfer_id',
})
