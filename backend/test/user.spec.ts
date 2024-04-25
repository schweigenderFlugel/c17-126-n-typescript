import { Server } from 'http';
import TestAgent from 'supertest/lib/agent';
import Test from 'supertest/lib/test';
import request from 'supertest';
import createExpressApp from '../src/config/createApp';
import { upSeed } from './utils/umzug';
import { sequelize } from '../src/models/db/database.manager';
import { adminAuth, adminUserToken, anonUserToken, nonUserToken, normalAuth, normalUserToken, tokenWithInvalidPayload } from '../src/models/db/seeders/1-auth';
import { adminUser, normalUser } from '../src/models/db/seeders/2-user';
import { preference1, preference2 } from '../src/models/db/seeders/4-preferences';
import { bankAccount1, bankAccount2 } from '../src/models/db/seeders/3-bank-account';

describe('Testing the user route', () => {
  let app;
  let server: Server;
  let api: TestAgent<Test>;

  beforeAll(async () => {
    app = createExpressApp();
    server = app.listen();
    api = request(app);
    await upSeed();
  })

  describe('GET /', () => {
    it('Should not access to the user', async () => {
      const { statusCode } = await api.get('/api/v1/user');
      expect(statusCode).toBe(401);
    })

    it('Should not get unexisting user', async () => {
      const { statusCode } = await api.get('/api/v1/user').auth(anonUserToken, { type: 'bearer' });
      expect(statusCode).toBe(404);
    })

    it('Should get the admin user', async () => {
      const { statusCode, body } = await api.get('/api/v1/user').auth(adminUserToken, { type: 'bearer' });
      expect(statusCode).toBe(200);
      expect(body.name).toMatch(adminUser.name);
      expect(body.lastname).toMatch(adminUser.lastname);
      expect(body.alias).toMatch(adminUser.alias);
      expect(body.address).toMatch(adminUser.address);
      expect(body.phone).toMatch(adminUser.phone);
      expect(body.auth.email).toMatch(adminAuth.email);
      expect(body.preference.min_ammount_transfers).toEqual(preference1.min_ammount_transfers);
      expect(body.preference.max_ammount_transfers).toEqual(preference1.max_ammount_transfers);
      expect(body.bank_account.number_account).toMatch(bankAccount1.number_account);
      expect(body.bank_account.balance).toEqual(bankAccount1.balance);
    })

    it.only('Should get the normal user', async () => {
      const { statusCode, body } = await api.get('/api/v1/user').auth(normalUserToken, { type: 'bearer' });
      expect(statusCode).toBe(200);
      expect(body.name).toMatch(normalUser.name);
      expect(body.lastname).toMatch(normalUser.lastname);
      expect(body.alias).toMatch(normalUser.alias);
      expect(body.address).toMatch(normalUser.address);
      expect(body.phone).toMatch(normalUser.phone);
      expect(body.auth.email).toMatch(normalAuth.email);
      expect(body.preference.min_ammount_transfers).toEqual(preference2.min_ammount_transfers);
      expect(body.preference.max_ammount_transfers).toEqual(preference2.max_ammount_transfers);
      expect(body.bank_account.number_account).toMatch(bankAccount2.number_account);
      expect(body.bank_account.balance).toEqual(bankAccount2.balance);
      expect(body.bank_account.transactions_sent).toBeInstanceOf(Array);
      expect(body.bank_account.transactions_received).toBeInstanceOf(Array);
      body.bank_account.transactions_received.forEach((transaction: any) => {
        expect(transaction.bank_account.user.name).toMatch(normalUser.name)
        expect(transaction.bank_account.user.lastname).toMatch(normalUser.lastname)
      });
      body.bank_account.transactions_sent.forEach((transaction: any) => {
        expect(transaction.bank_account.user.name).toMatch(adminUser.name)
      });
    })
  })

  describe('GET /all', () => {
    it('Should not access to the list of users', async () => {
      const { statusCode } = await api.get('/api/v1/user/all');
      expect(statusCode).toBe(401);
    })

    it('Should not access to the list of users because your role is wrong', async () => {
      const { statusCode } = await api.get('/api/v1/user/all').auth(normalUserToken, { type: 'bearer' });
      expect(statusCode).toBe(401);
    })

    it('Should access to the list of users', async () => {
      const { statusCode } = await api.get('/api/v1/user/all').auth(adminUserToken, { type: 'bearer' });
      expect(statusCode).toBe(200);
    })
  })

  describe('POST /', () => {
    it('Should not create user without login', async () => {
      const { statusCode } = await api.post('/api/v1/user');
      expect(statusCode).toBe(401);
    })

    it('Should not create user without any data', async () => {
      const { statusCode } = await api.post('/api/v1/user').auth(tokenWithInvalidPayload, { type: 'bearer' })
      expect(statusCode).toBe(400);
    })

    it('Should not create user by using a token with invalid payload', async () => {
      const data = {
        name: 'wrong',
        lastname: 'wrong',
        accountType: 'personal',
        alias: 'wrong',
      }
      const { statusCode } = await api.post('/api/v1/user')
        .auth(tokenWithInvalidPayload, { type: 'bearer' })
        .send(data);
      expect(statusCode).toBe(403);
    })

    it('Should not create an already existing user', async () => {
      const data = {
        name: 'admin',
        lastname: 'admin',
        accountType: 'personal',
        alias: 'admin',
      }
      const { statusCode } = await api.post('/api/v1/user')
        .auth(adminUserToken, { type: 'bearer' })
        .send(data);
      expect(statusCode).toBe(409);
    })

    it('Should create a new bank account', async () => {
      const payload = {
        name: 'nonuser',
        lastname: 'nonuser',
        accountType: 'personal',
        alias: 'nonuser',
        address: 'fake street 123',
        phone: "(000)-000-0000",
      }
      const { statusCode } = await api.post('/api/v1/user')
        .auth(nonUserToken, { type: 'bearer' })
        .send(payload);
      expect(statusCode).toBe(200);
    })
  })

  describe('PUT /', () => {
    it('Should not update user without login', async () => {
      const { statusCode } = await api.put('/api/v1/user/999');
      expect(statusCode).toBe(401);
    })

    it('Should not update an unexisting user', async () => {
      const { statusCode } = await api.put('/api/v1/user/999')
        .auth(normalUserToken, { type: 'bearer' });
      expect(statusCode).toBe(404);
    })

    it('Should not update an user with invalid data from the access token', async () => {
      const { statusCode } = await api.put(`/api/v1/user/${normalUser.id}`)
        .auth(tokenWithInvalidPayload, { type: 'bearer' });
      expect(statusCode).toBe(403);
    })

    it(`Should not update because the auth ids don't match`, async () => {
      const { statusCode } = await api.put(`/api/v1/user/${normalUser.id}`)
        .auth(adminUserToken, { type: 'bearer' });
      expect(statusCode).toBe(409);
    })

    it('Should not update the user with invalid data', async () => {
      const payload = {
        name: '',
        lastname: '',
        alias: '',
        address: 'fake street 123',
        phone: "555-2596",
        min_ammount_transfers: 9,
        max_ammount_transfers: 100000000
      }
      const { statusCode } = await api.put(`/api/v1/user/${normalUser.id}`)
        .auth(normalUserToken, { type: 'bearer' })
        .send(payload);
      expect(statusCode).toBe(400);
    })

    it('Should update the user', async () => {
      const payload = {
        name: 'Carlitos',
        lastname: 'Díaz',
        alias: 'carlito.diaz',
        address: 'fake street 123',
        phone: "(261)-555-2596",
        min_ammount_transfers: 12,
        max_ammount_transfers: 1000
      }
      const { statusCode } = await api.put(`/api/v1/user/${normalUser.id}`)
        .auth(normalUserToken, { type: 'bearer' })
        .send(payload);
      expect(statusCode).toBe(201);
    })
  })

  afterAll(async () => {
    await sequelize.close();
    server.close()
  })
})