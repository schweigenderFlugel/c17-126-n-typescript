import { Auth } from './auth.entity'
import { BankAccount } from './bank-account.entity'
import { Preferences } from './preference.entity'
import { Transaction } from './transaction.entity'
import { TypeTransfers } from './type-transfer.entity'
import { User } from './user.entity'

// RELATIONS FOR AUTH
User.belongsTo(Auth, {
  foreignKey: 'authId',
})

Auth.hasOne(User, {
  foreignKey: 'authId',
})

Preferences.belongsTo(User, {
  foreignKey: 'user_id',
})

User.hasOne(Preferences, {
  foreignKey: 'user_id',
})

// RELATIONS FOR BANK ACCOUNT
BankAccount.belongsTo(User, {
  foreignKey: 'user_id',
})

// RELATIONS FOR TRANSACTION
BankAccount.hasMany(Transaction, {
  foreignKey: 'source_account',
})

BankAccount.hasMany(Transaction, {
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
