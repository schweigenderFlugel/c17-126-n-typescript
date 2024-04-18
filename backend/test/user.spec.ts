import { Server } from 'http';
import TestAgent from 'supertest/lib/agent';
import Test from 'supertest/lib/test';
import request from 'supertest';
import createExpressApp from '../src/config/createApp';
import { upSeed } from './utils/umzug';
import { sequelize } from '../src/models/db/database.manager';
import { adminUserToken, anonUserToken, nonUserToken, normalUserToken } from '../src/models/db/seeders/auth';
import { ITokenPayload } from '../src/interfaces/token.interface';
import { decode } from 'jsonwebtoken';
import { adminUser, normalUser } from '../src/models/db/seeders/user';


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
      expect(statusCode).toBe(401);
    })

    it('Should get the admin user', async () => {
      const { statusCode, body } = await api.get('/api/v1/user').auth(adminUserToken, { type: 'bearer' });
      expect(statusCode).toBe(200);
      expect(body.name).toMatch(adminUser.name);
      expect(body.lastname).toMatch(adminUser.lastname);
      expect(body.alias).toMatch(adminUser.alias);
      expect(body.address).toMatch(adminUser.address);
      expect(body.phone).toMatch(adminUser.phone);
    })

    it('Should get the normal user', async () => {
      const decoded = decode(normalUserToken) as ITokenPayload;
      console.log(decoded.id)
      const { statusCode, body } = await api.get('/api/v1/user').auth(normalUserToken, { type: 'bearer' });
      expect(statusCode).toBe(200);
      expect(body.name).toMatch(normalUser.name);
      expect(body.lastname).toMatch(normalUser.lastname);
      expect(body.alias).toMatch(normalUser.alias);
      expect(body.address).toMatch(normalUser.address);
      expect(body.phone).toMatch(normalUser.phone);
    })
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

    it('Should create a new bank account', async () => {
      const decoded = decode(nonUserToken) as ITokenPayload;
      const payload = {
        name: 'nonuser',
        lastname: 'nonuser',
        alias: 'nonuser',
        address: 'fake street 123',
        phone: "(000)-000-0000",
        accountType: 3,
      }
      const { statusCode } = await api.post('/api/v1/user')
        .auth(nonUserToken, { type: 'bearer' })
        .send(payload);
      expect(statusCode).toBe(200);
    })
  })

  afterAll(async () => {
    await sequelize.close();
    server.close()
  })
})