import request from 'supertest';
import Test from 'supertest/lib/test';
import TestAgent from 'supertest/lib/agent';
import { Server } from 'http';
import { decode } from 'jsonwebtoken';
import { signUpSchema } from '../src/middlewares/validators/auth.validator';
import createExpressApp from '../src/config/createApp';
import { sequelize } from '../src/models/db/database.manager';
import { Roles } from '../src/models/db/entity/auth.entity';
import { upSeed } from './utils/umzug';
import { adminUserRefreshToken, expiredRefreshToken, normalUserRefreshToken } from '../src/models/db/seeders/1-auth';
import { ISign } from '../src/interfaces/auth.interface';

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

  describe('POST /signup', () => {
    it('Should not register an user with invalid data', async () => {
      const inputData: ISign = {
        email: 'newuser',
        password: 'newuser1234'
      }
      const validationResult = signUpSchema.safeParse(inputData);
      expect(validationResult.success).toBe(false);
    })

    it('Should register an user succesfully', async () => {
      const inputData: ISign = {
        email: 'newuser@email.com',
        password: 'newuser1234'
      }
      const validationResult = signUpSchema.safeParse(inputData);
      expect(validationResult.success).toBe(true);
      const { statusCode } = await api.post('/api/v1/auth/signup').send(inputData)
      expect(statusCode).toBe(201);
    })

    it('Should not register an existing user', async () => {
      const inputData: ISign = {
        email: 'newuser@email.com',
        password: 'newuser1234'
      }
      const validationResult = signUpSchema.safeParse(inputData);
      expect(validationResult.success).toBe(true);
      const { statusCode } = await api.post('/api/v1/auth/signup').send(inputData)
      expect(statusCode).toBe(409);
    })
  })

  describe('POST /login', () => {
    it('User should not exists', async () => {
      const inputData: ISign = {
        email: 'anon@email.com',
        password: 'newuser1234'
      }
      const { statusCode } = await api.post('/api/v1/auth/login').send(inputData)
      expect(statusCode).toBe(404);
    })

    it('Should not login', async () => {
      const inputData: ISign = {
        email: 'normal@email.com',
        password: 'newuser1234'
      }
      const { statusCode } = await api.post('/api/v1/auth/login').send(inputData)
      expect(statusCode).toBe(401);
    })

    it('Should not login with the session open', async () => {
      const { statusCode } = await api.post('/api/v1/auth/login')
        .set('Cookie', `bankme=${normalUserRefreshToken}`);
      expect(statusCode).toBe(400);
    })

    it('Should login and get an access and a refresh token from the admin user', async () => {
      const inputData: ISign = {
        email: 'normal@email.com',
        password: 'normal12345'
      }
      const { statusCode, body, header } = await api.post('/api/v1/auth/login').send(inputData);
      const token = decode(body.accessToken);
      expect(statusCode).toBe(200);
      expect(token).toMatchObject({ id: 2, role: Roles.NORMAL });
      expect(header['set-cookie']).toBeDefined();
    })

    it('Should login and get an access and a refresh token from the normal user', async () => {
      const inputData: ISign = {
        email: 'admin@email.com',
        password: 'admin12345'
      }
      const { statusCode, body, header } = await api.post('/api/v1/auth/login').send(inputData);
      const token = decode(body.accessToken);
      expect(statusCode).toBe(200);
      expect(token).toMatchObject({ id: 1, role: Roles.ADMIN });
      expect(header['set-cookie']).toBeDefined();
    })
  })

  describe('GET /refresh', () => {
    it('Should not refresh the session because there is not any cookie', async () => {
      const { statusCode } = await api.get('/api/v1/auth/refresh')
      expect(statusCode).toBe(404);
    })

    it('Should not refresh the session because the refresh token is expired', async () => {
      const { statusCode } = await api.get('/api/v1/auth/refresh').set('Cookie', `bankme=${expiredRefreshToken}`);
      expect(statusCode).toBe(403);
    })

    it('Should refresh the session as admin user', async () => {
      const { statusCode, body } = await api.get('/api/v1/auth/refresh').set('Cookie', `bankme=${adminUserRefreshToken}`);
      const token = decode(body.accessToken);
      expect(statusCode).toBe(200);
      expect(token).toMatchObject({ id: 1, role: Roles.ADMIN });
    })

    it('Should refresh the session as normal user', async () => {
      const { statusCode, body } = await api.get('/api/v1/auth/refresh').set('Cookie', `bankme=${normalUserRefreshToken}`);
      const token = decode(body.accessToken);
      expect(statusCode).toBe(200);
      expect(token).toMatchObject({ id: 2, role: Roles.NORMAL });
    })
  })

  describe('GET /logout', () => {
    it('Should not logout because there is not any cookie', async () => {
      const { statusCode } = await api.get('/api/v1/auth/refresh')
      expect(statusCode).toBe(404);
    })

    it('Should logout', async () => {
      const { statusCode, header } = await api.get('/api/v1/auth/refresh').set('Cookie', `bankme=${adminUserRefreshToken}`);
      expect(statusCode).toBe(200);
      expect(header['set-cookie']).toBeUndefined();
    })
  })

  afterAll(async () => {
    await sequelize.close()
    server.close()
  })
})