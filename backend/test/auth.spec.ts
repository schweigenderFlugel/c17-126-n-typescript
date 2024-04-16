import request from 'supertest';
import Test from 'supertest/lib/test';
import TestAgent from 'supertest/lib/agent';
import { Server } from 'http';
import { decode } from 'jsonwebtoken';
import { signUpSchema } from '../src/middlewares/validators/auth.validator';
import createExpressApp from '../src/config/createApp';
import { sequelize } from '../src/models/db/database.manager';
import { Roles } from '../src/models/db/entity/auth.entity';
import { upSeed } from './utils/utils';

describe('testing auth route', () => {
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
      const inputData = {
        email: 'newuser',
        password: 'newuser1234'
      }
      const validationResult = signUpSchema.safeParse(inputData);
      expect(validationResult.success).toBe(false);
    })

    it('Should register an user succesfully', async () => {
      const inputData = {
        email: 'newuser@email.com',
        password: 'newuser1234'
      }
      const validationResult = signUpSchema.safeParse(inputData);
      expect(validationResult.success).toBe(true);
      const { statusCode } = await api.post('/api/v1/auth/signup').send(inputData)
      expect(statusCode).toBe(201);
    })

    it('Should not register an existing user', async () => {
      const inputData = {
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
    it('Should not login', async () => {
      const inputData = {
        email: 'newuser',
        password: 'newuser123'
      }
      const { statusCode } = await api.post('/api/v1/auth/login').send(inputData)
      expect(statusCode).toBe(201);
    })

    it('Should login and get an access token', async () => {
      const inputData = {
        email: 'newuser',
        password: 'newuser1234'
      }
      const { statusCode, body } = await api.post('/api/v1/auth/login').send(inputData);
      const token = decode(body.accessToken);
      expect(statusCode).toBe(201);
      expect(token).toMatchObject({ id: 1, role: Roles.NORMAL });
    })
  })

  afterAll(async () => {
    server.close()
    await sequelize.close()
  })
})