import { Server } from 'http';
import TestAgent from 'supertest/lib/agent';
import Test from 'supertest/lib/test';
import request from 'supertest';
import createExpressApp from '../src/config/createApp';
import { upSeed } from './utils/umzug';
import { sequelize } from '../src/models/db/database.manager';
import { normalUserToken } from '../src/models/db/seeders/auth';


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

  describe('POST /', () => {
    it('Should not create user without login', async () => {
      const { statusCode } = await api.post('/api/v1/user');
      expect(statusCode).toBe(401);
    })

    it('Should not create user without login', async () => {
      const { statusCode } = await api.post('/api/v1/user').auth(normalUserToken, { type: 'bearer' });
      expect(statusCode).toBe(401);
    })
  })

  afterAll(async () => {
    await sequelize.close();
    server.close()
  })
})