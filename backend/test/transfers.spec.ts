import request from 'supertest';
import Test from 'supertest/lib/test';
import TestAgent from 'supertest/lib/agent';
import { Server } from 'http';
import createExpressApp from '../src/config/createApp';
import { sequelize } from '../src/models/db/database.manager';
import { upSeed } from './utils/umzug';
import { adminUserToken, normalUserToken } from '../src/models/db/seeders/1-auth';
import { bankAccount1, bankAccount2 } from '../src/models/db/seeders/3-bank-account';
import { typeTransfer1 } from '../src/models/db/seeders/4-type-transfer';

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

    it('Should not be allowed to create a transfer being an admin user', async () => {
      const data = {
        source_account: bankAccount1.id,
        destination_account: bankAccount2.id,
        amount: 10,
        type: typeTransfer1.name,
      }
      const { statusCode } = await api.post('/api/v1/transfer')
        .auth(adminUserToken, { type: 'bearer' })
        .send(data);
      expect(statusCode).toBe(401);
    })

    it('Should not make a tranfer from an unexisting source account', async () => {
        const data = {
          source_account: 999,
          destination_account: bankAccount1.id,
          amount: 10,
          type: typeTransfer1.name,
        }
        const { statusCode } = await api.post('/api/v1/transfer')
          .auth(normalUserToken, { type: 'bearer' })
          .send(data); 
          expect(statusCode).toBe(404); 
      })

      it('Should not make a tranfer from an unexisting destination account', async () => {
        const data = {
          source_account: bankAccount1.id,
          destination_account: 998,
          amount: 10,
          type: typeTransfer1.name,
        }
        const { statusCode } = await api.post('/api/v1/transfer')
          .auth(normalUserToken, { type: 'bearer' })
          .send(data); 
          expect(statusCode).toBe(404); 
      })

      it('Should not be allowed to create because there is not enough funds', async () => {
        const data = {
          source_account: bankAccount1.id,
          destination_account: bankAccount2.id,
          amount: 10,
          type: typeTransfer1.name,
        }
        const { statusCode } = await api.post('/api/v1/transfer')
          .auth(normalUserToken, { type: 'bearer' })
          .send(data); 
          expect(statusCode).toBe(401); 
      })

    it('Should be allowed to create a transfer', async () => {
      const data = {
        source_account: bankAccount2.id,
        destination_account: bankAccount1.id,
        amount: 10,
        type: typeTransfer1.name,
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