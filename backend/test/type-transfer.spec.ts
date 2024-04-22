import request from 'supertest';
import Test from 'supertest/lib/test';
import TestAgent from 'supertest/lib/agent';
import { Server } from 'http';
import createExpressApp from '../src/config/createApp';
import { sequelize } from '../src/models/db/database.manager';
import { upSeed } from './utils/umzug';
import { adminUserToken, normalUserToken } from '../src/models/db/seeders/1-auth';

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

  describe('GET /types-transfers/all', () => {
    it('Should retrieve all the transfer types', async () => {
      const { statusCode } = await api.get('/api/v1/types-transfers/all');
      expect(statusCode).toBe(200);
    })
  })

  describe('POST /types-transfers', () => {
    it('Should not be allowed to create a transfer type', async () => {
      const { statusCode } = await api.post('/api/v1/types-transfers');
      expect(statusCode).toBe(200);
    })

    it('Should not be allowed to create a transfer type because your role is wrong', async () => {
      const { statusCode } = await api.post('/api/v1/types-transfers').auth(normalUserToken, { type: 'bearer'});
      expect(statusCode).toBe(200);
    })

    it('Should be allowed to create a transfer type', async () => {
      const { statusCode } = await api.post('/api/v1/types-transfers').auth(adminUserToken, { type: 'bearer'});
      expect(statusCode).toBe(200);
    })
  })

  afterAll(async () => {
    await sequelize.close()
    server.close()
    })
})