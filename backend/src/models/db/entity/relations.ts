import { Auth } from './auth.entity'
import { BankAccount } from './bank-account.entity'
import { Preferences } from './preference.entity'
import { RefreshToken } from './refresh-token.entity'
import { Role } from './role.entity'
import { Transaction } from './transaction'
import { TypeAccount } from './type-account.entity'
import { TypeTransfert } from './type-transfer.entity'
import { User } from './user.entity'

// RELATIONS FOR USER
User.belongsToMany(Role, {
  through: 'user_roles',
  foreignKey: {
    name: 'userId',
  },
  otherKey: {
    name: 'roleId',
  },
})

Role.belongsToMany(User, {
  through: 'user_roles',
  foreignKey: {
    name: 'roleId',
  },
  otherKey: {
    name: 'userId',
  },
})

User.belongsTo(Auth, {
  foreignKey: 'authId',
})

Auth.hasOne(User, {
  foreignKey: 'authId',
})

RefreshToken.belongsTo(Auth, { foreignKey: 'authId' })
Auth.hasOne(RefreshToken, { foreignKey: 'authId' })

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

User.hasMany(BankAccount, {
  foreignKey: 'user_id',
})

BankAccount.belongsTo(TypeAccount, {
  foreignKey: 'type_account_id',
})

TypeAccount.hasMany(BankAccount, {
  foreignKey: 'type_account_id',
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
TypeTransfert.hasMany(Transaction, {
  foreignKey: 'type_transfer_id',
})

Transaction.belongsTo(TypeTransfert, {
  foreignKey: 'type_transfer_id',
})
