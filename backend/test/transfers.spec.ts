import request from 'supertest';
import Test from 'supertest/lib/test';
import TestAgent from 'supertest/lib/agent';
import { Server } from 'http';
import createExpressApp from '../src/config/createApp';
import { sequelize } from '../src/models/db/database.manager';
import { upSeed } from './utils/umzug';
import { adminUserToken, normalUserToken } from '../src/models/db/seeders/1-auth';
import { bankAccount1, bankAccount2 } from '../src/models/db/seeders/3-bank-account';
import { adminUser, normalUser } from '../src/models/db/seeders/2-user';
import { TYPETRANSFERS } from '../src/config/constants';

describe('Testing the auth route', () => {
  let app;
  let server: Server;
  let api: TestAgent<Test>;
  
  beforeAll(async() => {
    app = createExpressApp();
    server = app.listen(9000);
    api = request(app);
    await upSeed();
  })

  describe('POST /transfer', () => {
    it('Should not be allowed to create a transfer', async () => {
      const { statusCode } = await api.post('/api/v1/transfer');
      expect(statusCode).toBe(401);
    })

    it('Should not make a tranfer from an unexisting source account', async () => {
      const data = {
        source_account: 999,
        destination_alias: adminUser.alias,
        amount: 10,
        type: TYPETRANSFERS.CREDIT,
      }
      const { statusCode } = await api.post('/api/v1/transfer')
        .auth(normalUserToken, { type: 'bearer' })
        .send(data); 
      expect(statusCode).toBe(404); 
    })

    it('Should not make a tranfer because the token does not match with the user auth', async () => {
      const data = {
        source_account: bankAccount1.id,
        destination_alias: normalUser.alias,
        amount: 10,
        type: TYPETRANSFERS.CREDIT,
      }
      const { statusCode } = await api.post('/api/v1/transfer')
        .auth(normalUserToken, { type: 'bearer' })
        .send(data); 
      expect(statusCode).toBe(409); 
    })

    it('Should not make a tranfer from an unexisting destination account', async () => {
      const data = {
        source_account: bankAccount2.id,
        destination_alias: 'no.one',
        amount: 10,
        type: TYPETRANSFERS.CREDIT,
      }
      const { statusCode } = await api.post('/api/v1/transfer')
        .auth(normalUserToken, { type: 'bearer' })
        .send(data); 
      expect(statusCode).toBe(404); 
    })

    it('Should not make a tranfer because the source and destination account are the same', async () => {
      const data = {
        source_account: bankAccount2.id,
        destination_alias: normalUser.alias,
        amount: 10,
        type: TYPETRANSFERS.CREDIT,
      }
      const { statusCode } = await api.post('/api/v1/transfer')
        .auth(normalUserToken, { type: 'bearer' })
        .send(data); 
      expect(statusCode).toBe(400); 
    })

    it('Should not be allowed to create because there is not enough funds', async () => {
      const data = {
        source_account: bankAccount1.id,
        destination_alias: normalUser.alias,
        amount: 10,
        type: TYPETRANSFERS.CREDIT,
      }
      const { statusCode } = await api.post('/api/v1/transfer')
        .auth(adminUserToken, { type: 'bearer' })
        .send(data); 
        expect(statusCode).toBe(400); 
    })

    it('Should be allowed to create a transfer', async () => {
      const data = {
        source_account: bankAccount2.id,
        destination_alias: adminUser.alias,
        amount: 10,
        type: TYPETRANSFERS.CREDIT,
      }
      const { statusCode } = await api.post('/api/v1/transfer')
        .auth(normalUserToken, { type: 'bearer' })
        .send(data); 
        expect(statusCode).toBe(201); 
    })
  })

  afterAll(async () => {
    await sequelize.close()
    server.close()
  })
})