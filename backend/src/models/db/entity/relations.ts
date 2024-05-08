import { Auth } from './auth.entity'
import { BankAccount } from './bank-account.entity'
import { Historial } from './historial.entity'
import { AnualHistorial } from './monthly-historial.entity'
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

// RELATIONS FOR HISTORIAL
BankAccount.hasMany(AnualHistorial, {
  as: 'anual_historial',
  foreignKey: 'bank_account'
})

AnualHistorial.belongsTo(BankAccount, {
  as: 'bank_account',
});

AnualHistorial.hasOne(Historial, {
  as: 'jan',
  foreignKey: 'jan'
});

AnualHistorial.hasOne(Historial, {
  as: 'feb',
  foreignKey: 'feb'
})

AnualHistorial.hasOne(Historial, {
  as: 'mar',
  foreignKey: 'mar'
})

AnualHistorial.hasOne(Historial, {
  as: 'apr',
  foreignKey: 'apr'
})

AnualHistorial.hasOne(Historial, {
  as: 'may',
  foreignKey: 'may'
})

AnualHistorial.hasOne(Historial, {
  as: 'jun',
  foreignKey: 'jun'
})

AnualHistorial.hasOne(Historial, {
  as: 'jul',
  foreignKey: 'jul'
})

AnualHistorial.hasOne(Historial, {
  as: 'aug',
  foreignKey: 'aug'
})

AnualHistorial.hasOne(Historial, {
  as: 'sep',
  foreignKey: 'sep'
})

AnualHistorial.hasOne(Historial, {
  as: 'oct',
  foreignKey: 'oct'
})

AnualHistorial.hasOne(Historial, {
  as: 'nov',
  foreignKey: 'nov'
})

AnualHistorial.hasOne(Historial, {
  as: 'dec',
  foreignKey: 'dec'
})