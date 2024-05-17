import request from 'supertest';
import Test from 'supertest/lib/test';
import TestAgent from 'supertest/lib/agent';
import { Server } from 'http';
import createExpressApp from '../src/config/createApp';
import { sequelize } from '../src/models/db/database.manager';
import { upSeed } from './utils/umzug';
import { adminUserToken,
  authWithoutUserToken, 
  normalUserToken, 
  tokenWithInvalidPayload 
} from '../src/models/db/seeders/1-auth';

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

  describe('POST /deposit', () => {
    it('Should not be allowed to make a deposit', async () => {
      const { statusCode } = await api.put('/api/v1/bank-account/deposit/3');
      expect(statusCode).toBe(401);
    })

    it('Should not be allowed to make a deposit because the payload form the token is invalid', async () => {
      const data = {
        amount: 10,
      }
      const { statusCode } = await api.put('/api/v1/bank-account/deposit/3')
        .auth(tokenWithInvalidPayload, { type: 'bearer' })
        .send(data);
      expect(statusCode).toBe(403);
    })

    it(`Should not be allowed to make a deposit because the bank account does not exist`, async () => {
      const data = {
        amount: 10,
      }
      const { statusCode } = await api.put('/api/v1/bank-account/deposit/3')
        .auth(authWithoutUserToken, { type: 'bearer' })
        .send(data);
      expect(statusCode).toBe(404);
    })

    it(`Should not be allowed to make a deposit because the id from the token and bank account don't match`, async () => {
      const data = {
        amount: 10,
      }
      const { statusCode } = await api.put('/api/v1/bank-account/deposit/2')
        .auth(adminUserToken, { type: 'bearer' })
        .send(data);
      expect(statusCode).toBe(409);
    })

    it('Should make a deposit', async () => {
      const data = {
        amount: 10,
      }
      const { statusCode } = await api.put('/api/v1/bank-account/deposit/2')
        .auth(normalUserToken, { type: 'bearer' })
        .send(data);
      expect(statusCode).toBe(200);
    })
  })

  afterAll(async () => {
    await sequelize.close()
    server.close()
  })
})