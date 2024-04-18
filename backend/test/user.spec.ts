import { Server } from 'http';
import TestAgent from 'supertest/lib/agent';
import Test from 'supertest/lib/test';
import request from 'supertest';
import createExpressApp from '../src/config/createApp';
import { upSeed } from './utils/umzug';
import { sequelize } from '../src/models/db/database.manager';
import { adminUserToken, anonUserToken, nonUserRefreshToken, nonUserToken, normalUserToken } from '../src/models/db/seeders/auth';
import { ICreateUser } from '../src/interfaces/user.interface';
import { ITokenPayload } from '../src/interfaces/token.interface';
import { decode } from 'jsonwebtoken';


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

    it('Should not create an already existing user', async () => {
      const payload= {
        name: 'admin',
        lastname: 'admin',
      }
      const { statusCode } = await api.post('/api/v1/user')
        .auth(adminUserToken, { type: 'bearer' })
        .send(payload);
      expect(statusCode).toBe(409);
    })

    it('Should not retrieve any account type', async () => {
      const payload = {
        name: 'anonuser',
        lastname: 'anonuser',
        accountType: 4
      }
      const { statusCode } = await api.post('/api/v1/user')
        .auth(anonUserToken, { type: 'bearer' })
        .send(payload);
      expect(statusCode).toBe(404);
    })

    it('Should not retrieve any account type', async () => {
      const decoded = decode(nonUserToken) as ITokenPayload;
      const payload = {
        name: 'nonuser',
        lastname: 'nonuser',
        alias: 'nonuser',
        address: 'fake street 123',
        phone: "(000)-000-0000",
        authId: decoded.id,
        accountType: 3,
      }
      const { statusCode } = await api.post('/api/v1/user')
        .auth(nonUserToken, { type: 'bearer' })
        .send(payload);
      expect(statusCode).toBe(404);
    })
  })

  afterAll(async () => {
    await sequelize.close();
    server.close()
  })
})