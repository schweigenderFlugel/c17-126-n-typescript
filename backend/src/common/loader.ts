import TestAgent from 'supertest/lib/agent';
import { authFixtures } from './fixtures/auth.fixtures';
import { Auth } from '../models/db';

export const loadFixtures = async (api: TestAgent) => {
  await api.post('/loader').send({ fixtures: authFixtures, tableName: Auth.tableName });
}