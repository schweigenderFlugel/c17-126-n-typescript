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
import { 
  adminAuth,
  adminUserRefreshToken, 
  adminUserToken, 
  expiredRefreshToken, 
  normalUserRefreshToken,
  unexistingUserRefreshToken,
  normalUserToken,
  tokenWithInvalidPayload,
  unexistingAuthToken,
  authToLogoutRefreshToken,
  normalAuth,
  authToActivate,
} from '../src/models/db/seeders/1-auth';
import { ISign } from '../src/interfaces/auth.interface';
import { ERROR_MESSAGES } from '../src/config/constants';

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
      const inputData: Omit<ISign, 'id'> = {
        email: 'newuser',
        password: 'newuser1234'
      }
      const validationResult = signUpSchema.safeParse(inputData);
      expect(validationResult.success).toBe(false);
    })

    it('Should not register an existing user', async () => {
      const inputData: Omit<ISign, 'id'> = {
        email: adminAuth.email,
        password: 'admin12345'
      }
      const validationResult = signUpSchema.safeParse(inputData);
      expect(validationResult.success).toBe(true);
      const { statusCode } = await api.post('/api/v1/auth/signup').send(inputData)
      expect(statusCode).toBe(409);
    })

    it('Should register an user succesfully', async () => {
      const inputData: Omit<ISign, 'id'> = {
        email: 'newuser@email.com',
        password: 'newuser1234'
      }
      const validationResult = signUpSchema.safeParse(inputData);
      expect(validationResult.success).toBe(true);
      const { statusCode } = await api.post('/api/v1/auth/signup').send(inputData)
      expect(statusCode).toBe(201);
    })
  })

  describe('POST /login', () => {
    it('User should not exists', async () => {
      const inputData: Omit<ISign, 'id'> = {
        email: 'anon@email.com',
        password: 'newuser1234'
      }
      const { statusCode, body } = await api.post('/api/v1/auth/login').send(inputData)
      expect(statusCode).toBe(404);
      expect(body.error.message).toMatch(ERROR_MESSAGES.INVALID_CREDENTIALS);
      expect(body.error.details).toMatch('Auth not found');
    })

    it('Should not login', async () => {
      const inputData: Omit<ISign, 'id'> = {
        email: 'normal@email.com',
        password: 'newuser1234'
      }
      const { statusCode, body } = await api.post('/api/v1/auth/login').send(inputData)
      expect(statusCode).toBe(401);
      expect(body.error.message).toMatch(ERROR_MESSAGES.INVALID_CREDENTIALS);
      expect(body.error.details).toMatch('Must provide valid credentials');
    })

    it('Should not login with unactivated account', async () => {
      const inputData: Omit<ISign, 'id'> = {
        email: 'unactivated@email.com',
        password: 'unactivated12345'
      }
      const { statusCode, body } = await api.post('/api/v1/auth/login').send(inputData)
      expect(statusCode).toBe(403);
      expect(body.error.message).toMatch(ERROR_MESSAGES.NOT_ACTIVE);
      expect(body.error.details).toMatch('The account must be activ');
    })

    it('Should not login with the session open', async () => {
      const inputData: Omit<ISign, 'id'> = {
        email: 'normal@email.com',
        password: 'newuser12345'
      }
      const { statusCode, body } = await api.post('/api/v1/auth/login')
        .set('Cookie', `bankme=${normalUserRefreshToken}`)
        .send(inputData);
      expect(statusCode).toBe(400);
      expect(body.error.message).toMatch(ERROR_MESSAGES.SESSION_OPEN);
      expect(body.error.details).toMatch('Cookie is still existing');
    })

    it('Should block the auth', async () => {
      const inputData: Omit<ISign, 'id'> = {
        email: 'toblock@email.com',
        password: 'toblock1234'
      }
      const { statusCode, body } = await api.post('/api/v1/auth/login').send(inputData)
      expect(statusCode).toBe(401);
      expect(body.error.message).toMatch(ERROR_MESSAGES.AUTH_BLOCKED);
      expect(body.error.details).toMatch('Number of attempts exceeded');
    })

    it('Should login and get an access and a refresh token from the normal user', async () => {
      const inputData: Omit<ISign, 'id'> = {
        email: 'normal@email.com',
        password: 'normal12345'
      }
      const { statusCode, body, header } = await api.post('/api/v1/auth/login').send(inputData);
      const token = decode(body.accessToken);
      expect(statusCode).toBe(200);
      expect(token).toMatchObject({ id: normalAuth.id, role: Roles.NORMAL });
      expect(header['set-cookie']).toBeDefined();
    })

    it('Should login and get an access and a refresh token from the admin user', async () => {
      const inputData: Omit<ISign, 'id'> = {
        email: 'admin@email.com',
        password: 'admin12345'
      }
      const { statusCode, body, header } = await api.post('/api/v1/auth/login').send(inputData);
      const token = decode(body.accessToken);
      expect(statusCode).toBe(200);
      expect(token).toMatchObject({ id: adminAuth.id, role: Roles.ADMIN });
      expect(header['set-cookie']).toBeDefined();
    })
  })

  describe('POST /activate', () => {
    it('Should not activate an unexisting account', async () => {
      const payload = {
        email: 'anonuser@email.com',
        activationCode: 'KVTW-GKTZ-82GQ-T6QR',
      }
      const { statusCode } = await api.post('/api/v1/auth/activate').send(payload);
      expect(statusCode).toBe(404);
    });

    it('Should not activate an already active account', async () => {
      const payload = {
        email: 'normal@email.com',
        activationCode: 'KVTW-GKTZ-82GQ-T6QR',
      }
      const { statusCode } = await api.post('/api/v1/auth/activate').send(payload);
      expect(statusCode).toBe(406);
    });

    it('Should not activate with invalid activation code', async () => {
      const payload = {
        email: 'toactivate@email.com',
        activationCode: 'KVTW-GKTZ-82GQ-T6QR',
      }
      const { statusCode } = await api.post('/api/v1/auth/activate').send(payload);
      expect(statusCode).toBe(403);
    });

    it('Should activate the account', async () => {
      const payload = {
        email: 'toactivate@email.com',
        activationCode: 'LPNB-Z4Z5-FPTK-1LTS',
      }
      const { statusCode, body, header } = await api.post('/api/v1/auth/activate').send(payload);
      expect(statusCode).toBe(200);
      const token = decode(body.accessToken);
      expect(statusCode).toBe(200);
      expect(token).toMatchObject({ id: authToActivate.id, role: Roles.NORMAL });
      expect(header['set-cookie']).toBeDefined();
    });
  })

  describe('POST /forgot-password', () => {
    it('User should not exists', async () => {
      const inputData ={
        email: 'anon@email.com',
      }
      const { statusCode } = await api.post('/api/v1/auth/forgot-password').send(inputData)
      expect(statusCode).toBe(404);
    })

    it('Should get a link to recover password', async () => {
      const inputData ={
        email: 'admin@email.com',
      }
      const { statusCode, body } = await api.post('/api/v1/auth/forgot-password').send(inputData)
      expect(statusCode).toBe(200);
      expect(body.link).toBeDefined();
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

    it(`Should not refresh the session because the auth id from payload doesn't exist`, async () => {
      const { statusCode } = await api.get('/api/v1/auth/refresh').set('Cookie', `bankme=${unexistingUserRefreshToken}`);
      expect(statusCode).toBe(404);
    })

    it('Should refresh the session as admin user', async () => {
      const { statusCode, body } = await api.get('/api/v1/auth/refresh').set('Cookie', `bankme=${adminUserRefreshToken}`);
      const token = decode(body.accessToken);
      expect(statusCode).toBe(200);
      expect(token).toMatchObject({ id: adminAuth.id, role: Roles.ADMIN });
    })

    it('Should refresh the session as normal user', async () => {
      const { statusCode, body } = await api.get('/api/v1/auth/refresh').set('Cookie', `bankme=${normalUserRefreshToken}`);
      const token = decode(body.accessToken);
      expect(statusCode).toBe(200);
      expect(token).toMatchObject({ id: normalAuth.id, role: Roles.NORMAL });
    })
  })

  describe('GET /logout', () => {
    it('Should not logout because there is not any cookie', async () => {
      const { statusCode } = await api.get('/api/v1/auth/logout')
      expect(statusCode).toBe(404);
    })

    it('Should logout', async () => {
      const logoutResponse = await api.get('/api/v1/auth/logout').set('Cookie', `bankme=${authToLogoutRefreshToken}`);
      expect(logoutResponse.statusCode).toBe(200)

      const { statusCode, header } = await api.get('/api/v1/auth/refresh');
      expect(statusCode).toBe(404);
      expect(header['set-cookie']).toBeUndefined();
    })
  })

  describe('PUT /change-password', () => {
    it('Should not be allowed to change the password', async () => {
      const { statusCode } = await api.put('/api/v1/auth/change-password/4');
      expect(statusCode).toBe(401);
    })

    it('Should not change the password because the token contains invalid payload', async () => {
      const newData = {
        currentPassword: 'anonuser1234',
        newPassword: 'anonuser12345',
      }
      const { statusCode } = await api.put('/api/v1/auth/change-password/4')
        .auth(tokenWithInvalidPayload, { type: 'bearer'})
        .send(newData);
      expect(statusCode).toBe(403);
    })

    it('Should not change the password of unexisting user', async () => {
      const newData = {
        currentPassword: 'anonuser12345',
        newPassword: 'anonuser12345',
      }
      const { statusCode } = await api.put('/api/v1/auth/change-password/cbc5ddfd-8487-451a-be80-9f3ba46245a0')
        .auth(unexistingAuthToken, { type: 'bearer' })
        .send(newData);
      expect(statusCode).toBe(404);
    })

    it(`Should not allowed to change password because the id and id from the token payload don't match`, async () => {
      const newData = {
        currentPassword: 'anonuser1234',
        newPassword: 'anonuser12345',
      }
      const { statusCode } = await api.put(`/api/v1/auth/change-password/${adminAuth.id}`)
        .auth(normalUserToken, { type: 'bearer' })
        .send(newData);
      expect(statusCode).toBe(409);
    })

    it(`Should not allowed to change password because your current password is invalid`, async () => {
      const newData = {
        currentPassword: 'admin1234',
        newPassword: 'admin1234',
      }
      const { statusCode } = await api.put(`/api/v1/auth/change-password/${adminAuth.id}`)
        .auth(adminUserToken, { type: 'bearer'})
        .send(newData);
      expect(statusCode).toBe(401);
    })

    it(`Should not allowed to change password because the passwords are the same`, async () => {
      const newData = {
        currentPassword: 'admin12345',
        newPassword: 'admin12345',
      }
      const { statusCode } = await api.put(`/api/v1/auth/change-password/${adminAuth.id}`)
        .auth(adminUserToken, { type: 'bearer'})
        .send(newData);
      expect(statusCode).toBe(406);
    })

    it(`Should change the password`, async () => {
      const newData = {
        currentPassword: 'admin12345',
        newPassword: 'newadmin12345',
      }
      const { statusCode } = await api.put(`/api/v1/auth/change-password/${adminAuth.id}`)
        .auth(adminUserToken, { type: 'bearer' })
        .send(newData);
      expect(statusCode).toBe(201);
    })
  })

  afterAll(async () => {
    await sequelize.close()
    server.close()
  })
})