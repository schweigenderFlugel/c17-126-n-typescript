import { Auth } from './auth.entity'
import { BankAccount } from './bank-account.entity'
import { Historial } from './historial.entity'
import { AnualHistorial } from './anual-historial.entity'
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

// RELATIONS FOR HISTORIAL
BankAccount.hasMany(AnualHistorial, {
  as: 'anual_historial',
  foreignKey: 'bank_account'
})

AnualHistorial.hasMany(Historial, {
  as: 'months',
  foreignKey: 'anual_historial_id',
})

// RELATIONS FOR TRANSACTION
Historial.hasMany(Transaction, {
  as: 'transactions_sent',
  foreignKey: 'source_account',
})

Historial.hasMany(Transaction, {
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