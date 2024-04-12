import request from 'supertest';
import Test from 'supertest/lib/test';
import TestAgent from 'supertest/lib/agent';
import { signUpSchema } from '../src/middlewares/validators/auth.validator';
import createExpressApp from '../src/config/createApp';
import { Server, IncomingMessage, ServerResponse } from 'http';

describe('testing auth route', () => {
  let app;
  let server: Server;
  let api: TestAgent<Test>;

  beforeAll(async() => {
    app = createExpressApp()
    server = app.listen(9000)
    api = request(app);
  })

  describe('POST /signup', () => {
    it('Should reguster an user succesfully', async () => {
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
      const { statusCode } = await api.post('auth/signup').send(inputData)
      expect(statusCode).toBe(201);
    })
  })

  afterAll(() => {
    server.close()
  })
})