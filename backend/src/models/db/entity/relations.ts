import { Auth } from './auth.entity'
import { BankAccount } from './bank-account.entity'
import { Preferences } from './preference.entity'
import { Transaction } from './transaction.entity'
import { User } from './user.entity'

// RELATIONS FOR AUTH
User.belongsTo(Auth)

User.hasOne(Preferences, {
  foreignKey: 'userId',
})

Preferences.belongsTo(User)

// RELATIONS FOR BANK ACCOUNT
BankAccount.belongsTo(User)

User.hasOne(BankAccount, {
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
  as: 'from',
  foreignKey: 'source_account'
})

Transaction.belongsTo(BankAccount, {
  as: 'to',
  foreignKey: 'destination_account',
})