import { Server } from 'http';
import TestAgent from 'supertest/lib/agent';
import Test from 'supertest/lib/test';
import request from 'supertest';
import createExpressApp from '../src/config/createApp';
import { upSeed } from './utils/umzug';
import { sequelize } from '../src/models/db/database.manager';
import { 
  adminAuth, 
  adminUserToken,
  normalUserToken,
  authWithoutUserToken, 
  anonUserToken, 
  normalAuth, 
  tokenWithInvalidPayload 
} from '../src/models/db/seeders/1-auth';
import { adminUser, normalUser } from '../src/models/db/seeders/3-user';
import { preference1, preference2 } from '../src/models/db/seeders/4-preferences';
import { bankAccount1, bankAccount2 } from '../src/models/db/seeders/5-bank-account';
import { 
  anualHistorial1,
  anualHistorial2,
  anualHistorial3,
  anualHistorial4 
} from '../src/models/db/seeders/6-anual-historial';
import { 
  historial1, 
  historial2, 
  historial3,
  historial4, 
  historial5, 
  historial6, 
  historial7, 
  historial8 
} from '../src/models/db/seeders/7-historial';
import { 
  transaction1, 
  transaction2, 
  transaction3, 
  transaction4, 
  transaction5, 
  transaction6, 
  transaction7, 
  transaction8 
} from '../src/models/db/seeders/8-transaction';
import { IUserCreatedData, IUserResponse } from '../src/interfaces/user.interface';
import { IMonthsResponse } from '../src/interfaces/historial.interface';

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
      expect(statusCode).toBe(404);
    })

    it('Should get the admin user', async () => {
      const { statusCode, body }: { statusCode: any, body: IUserResponse } = 
        await api.get('/api/v1/user').auth(adminUserToken, { type: 'bearer' });
      expect(statusCode).toBe(200);
      
      const previousMonth = new Date().getMonth();
      const twoMonthsAgo = new Date().getMonth() - 1;
      const currentMonth = new Date().getMonth() + 1;
      const month: Partial<IMonthsResponse> = {};
      month.jan = currentMonth || previousMonth || twoMonthsAgo === 1 ? body.bank_account.anual_historial[1]?.month.jan : undefined
      month.feb = currentMonth || previousMonth || twoMonthsAgo === 2 ? body.bank_account.anual_historial[1]?.month.feb : undefined
      month.mar = currentMonth || previousMonth || twoMonthsAgo === 3 ? body.bank_account.anual_historial[1]?.month.mar : undefined
      month.apr = currentMonth || previousMonth || twoMonthsAgo === 4 ? body.bank_account.anual_historial[1]?.month.apr : undefined
      month.may = currentMonth || previousMonth || twoMonthsAgo === 5 ? body.bank_account.anual_historial[1]?.month.may : undefined
      month.jun = currentMonth || previousMonth || twoMonthsAgo === 6 ? body.bank_account.anual_historial[1]?.month.jun : undefined
      month.jul = currentMonth || previousMonth || twoMonthsAgo === 7 ? body.bank_account.anual_historial[1]?.month.jul : undefined
      month.aug = currentMonth || previousMonth || twoMonthsAgo === 8 ? body.bank_account.anual_historial[1]?.month.aug : undefined
      month.sep = currentMonth || previousMonth || twoMonthsAgo === 9 ? body.bank_account.anual_historial[1]?.month.sep : undefined
      month.oct = currentMonth || previousMonth || twoMonthsAgo === 10 ? body.bank_account.anual_historial[1]?.month.oct : undefined
      month.nov = currentMonth || previousMonth || twoMonthsAgo === 11 ? body.bank_account.anual_historial[1]?.month.nov : undefined
      month.dec = currentMonth || previousMonth || twoMonthsAgo === 12 ? body.bank_account.anual_historial[1]?.month.dec : undefined
      const monthHistorials = Object.values(month);
      const monthHistorialsFound = monthHistorials.filter(historial => historial != undefined);

      // USER DATA
      expect(body.id).toEqual(adminUser.id);
      expect(body.name).toMatch(adminUser.name);
      expect(body.lastname).toMatch(adminUser.lastname);
      expect(body.accountType).toMatch(adminUser.account_type);
      expect(body.avatar).toMatch(adminUser.avatar);
      expect(body.alias).toMatch(adminUser.alias);
      expect(body.address).toMatch(adminUser.address);
      expect(body.phone).toMatch(adminUser.phone);
      expect(body.auth.id).toEqual(adminAuth.id);
      expect(body.auth.email).toMatch(adminAuth.email);
      expect(body.preferences.min_ammount_transfers).toEqual(preference1.min_ammount_transfers);
      expect(body.preferences.max_ammount_transfers).toEqual(preference1.max_ammount_transfers);
      expect(body.bank_account.number_account).toMatch(bankAccount1.number_account);
      expect(body.bank_account.balance).toEqual(bankAccount1.balance);
      expect(body.bank_account.expenses).toEqual(bankAccount1.expenses);
      expect(body.bank_account.investments).toEqual(bankAccount1.investments);

      // ANUAL HISTORIALS
      expect(body.bank_account.anual_historial).toBeInstanceOf(Array);
      expect(body.bank_account.anual_historial[0]?.year).toEqual(anualHistorial1.year);
      expect(body.bank_account.anual_historial[1]?.year).toEqual(anualHistorial2.year);

      // EXPECTED MONTHS TO BE DEFINED
      expect(body.bank_account.anual_historial[0]?.month.nov).toBeDefined();
      expect(body.bank_account.anual_historial[0]?.month.dec).toBeDefined();

      // NOVEMBER OF THE PREVIOUS YEAR
      expect(body.bank_account.anual_historial[0]?.month.nov?.balance).toEqual(historial1.balance);
      expect(body.bank_account.anual_historial[0]?.month.nov?.expenses).toEqual(historial1.expenses);
      expect(body.bank_account.anual_historial[0]?.month.nov?.investments).toEqual(historial1.investments);

      // DECEMBER OF THE PREVIOUS YEAR
      expect(body.bank_account.anual_historial[0]?.month.dec?.balance).toEqual(historial2.balance);
      expect(body.bank_account.anual_historial[0]?.month.dec?.expenses).toEqual(historial2.expenses);
      expect(body.bank_account.anual_historial[0]?.month.dec?.investments).toEqual(historial2.investments);

      // TRANSACTIONS RECEIVED ON NOVEMBER OF THE PREVIOUS YEAR
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received).toBeInstanceOf(Array);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[0]?.id).toEqual(2);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[0]?.year).toEqual(anualHistorial1.year);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[0]?.month).toEqual(historial1.month);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[0]?.source_account).toEqual(transaction2.source_account);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[0]?.destination_account).toEqual(transaction2.destination_account);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[0]?.amount).toEqual(transaction2.amount);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[0]?.from.user.name).toMatch(normalUser.name)
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[0]?.from.user.lastname).toMatch(normalUser.lastname);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[1]?.id).toEqual(6);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[1]?.year).toEqual(anualHistorial1.year);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[1]?.month).toEqual(historial1.month);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[1]?.source_account).toEqual(transaction6.source_account);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[1]?.destination_account).toEqual(transaction6.destination_account);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[1]?.amount).toEqual(transaction6.amount);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[1]?.from.user.name).toMatch(normalUser.name)
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[1]?.from.user.lastname).toMatch(normalUser.lastname);

      // TRANSACTIONS SENT ON NOVEMBER OF THE PREVIOUS YEAR
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent).toBeInstanceOf(Array);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[0]?.id).toEqual(1);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[0]?.year).toEqual(anualHistorial1.year);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[0]?.month).toEqual(historial1.month);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[0]?.source_account).toEqual(transaction1.source_account);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[0]?.destination_account).toEqual(transaction1.destination_account);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[0]?.amount).toEqual(transaction1.amount);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[0]?.to.user.name).toMatch(normalUser.name);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[0]?.to.user.lastname).toMatch(normalUser.lastname);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[1]?.id).toEqual(5);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[1]?.year).toEqual(anualHistorial1.year);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[1]?.month).toEqual(historial1.month);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[1]?.source_account).toEqual(transaction5.source_account);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[1]?.destination_account).toEqual(transaction5.destination_account);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[1]?.amount).toEqual(transaction5.amount);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[1]?.to.user.name).toMatch(normalUser.name);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[1]?.to.user.lastname).toMatch(normalUser.lastname);

      // TWO MONTHS AGO ON THE CURRENT YEAR
      const twoMonthsAgoHistorial = monthHistorialsFound.find(historial => historial.month === twoMonthsAgo);
      expect(twoMonthsAgoHistorial?.month).toEqual(twoMonthsAgo);
      expect(twoMonthsAgoHistorial?.balance).toEqual(historial3.balance);
      expect(twoMonthsAgoHistorial?.expenses).toEqual(historial3.expenses);
      expect(twoMonthsAgoHistorial?.investments).toEqual(historial3.investments);

      // TRANSACTIONS RECEIVED TWO MONTHS AGO ON THE CURRENT YEAR
      expect(twoMonthsAgoHistorial?.transactions.received).toBeInstanceOf(Array);
      expect(twoMonthsAgoHistorial?.transactions.received[0]?.id).toEqual(4);
      expect(twoMonthsAgoHistorial?.transactions.received[0]?.year).toEqual(anualHistorial2.year);
      expect(twoMonthsAgoHistorial?.transactions.received[0]?.month).toEqual(historial3.month);
      expect(twoMonthsAgoHistorial?.transactions.received[0]?.source_account).toEqual(transaction4.source_account);
      expect(twoMonthsAgoHistorial?.transactions.received[0]?.destination_account).toEqual(transaction4.destination_account);
      expect(twoMonthsAgoHistorial?.transactions.received[0]?.amount).toEqual(transaction4.amount);
      expect(twoMonthsAgoHistorial?.transactions.received[0]?.from.user.name).toMatch(normalUser.name)
      expect(twoMonthsAgoHistorial?.transactions.received[0]?.from.user.lastname).toMatch(normalUser.lastname);
      expect(twoMonthsAgoHistorial?.transactions.received[1]?.id).toEqual(8);
      expect(twoMonthsAgoHistorial?.transactions.received[1]?.year).toEqual(anualHistorial2.year);
      expect(twoMonthsAgoHistorial?.transactions.received[1]?.month).toEqual(historial3.month);
      expect(twoMonthsAgoHistorial?.transactions.received[1]?.source_account).toEqual(transaction8.source_account);
      expect(twoMonthsAgoHistorial?.transactions.received[1]?.destination_account).toEqual(transaction8.destination_account);
      expect(twoMonthsAgoHistorial?.transactions.received[1]?.amount).toEqual(transaction8.amount);
      expect(twoMonthsAgoHistorial?.transactions.received[1]?.from.user.name).toMatch(normalUser.name)
      expect(twoMonthsAgoHistorial?.transactions.received[1]?.from.user.lastname).toMatch(normalUser.lastname);
      
      // TRANSACTIONS SENT TWO MONTHS AGO ON THE CURRENT YEAR
      expect(twoMonthsAgoHistorial?.transactions.sent).toBeInstanceOf(Array);
      expect(twoMonthsAgoHistorial?.transactions.sent[0]?.id).toEqual(3);
      expect(twoMonthsAgoHistorial?.transactions.sent[0]?.year).toEqual(anualHistorial2.year);
      expect(twoMonthsAgoHistorial?.transactions.sent[0]?.month).toEqual(historial3.month);
      expect(twoMonthsAgoHistorial?.transactions.sent[0]?.source_account).toEqual(transaction3.source_account);
      expect(twoMonthsAgoHistorial?.transactions.sent[0]?.destination_account).toEqual(transaction3.destination_account);
      expect(twoMonthsAgoHistorial?.transactions.sent[0]?.amount).toEqual(transaction3.amount);
      expect(twoMonthsAgoHistorial?.transactions.sent[0]?.to.user.name).toMatch(normalUser.name);
      expect(twoMonthsAgoHistorial?.transactions.sent[0]?.to.user.lastname).toMatch(normalUser.lastname);
      expect(twoMonthsAgoHistorial?.transactions.sent[1]?.id).toEqual(7);
      expect(twoMonthsAgoHistorial?.transactions.sent[1]?.year).toEqual(anualHistorial2.year);
      expect(twoMonthsAgoHistorial?.transactions.sent[1]?.month).toEqual(historial3.month);
      expect(twoMonthsAgoHistorial?.transactions.sent[1]?.source_account).toEqual(transaction7.source_account);
      expect(twoMonthsAgoHistorial?.transactions.sent[1]?.destination_account).toEqual(transaction7.destination_account);
      expect(twoMonthsAgoHistorial?.transactions.sent[1]?.amount).toEqual(transaction7.amount);
      expect(twoMonthsAgoHistorial?.transactions.sent[1]?.to.user.name).toMatch(normalUser.name);
      expect(twoMonthsAgoHistorial?.transactions.sent[1]?.to.user.lastname).toMatch(normalUser.lastname);

      // PREVIOUS MONTH 
      const previousMonthHistorial = monthHistorialsFound.find(historial => historial.month === previousMonth);
      expect(previousMonthHistorial?.month).toEqual(previousMonth);
      expect(previousMonthHistorial?.balance).toEqual(historial4.balance);
      expect(previousMonthHistorial?.expenses).toEqual(historial4.expenses);
      expect(previousMonthHistorial?.investments).toEqual(historial4.investments);

      // CURRENT MONTH
      const currentMonthHistorial = monthHistorialsFound.find(historial => historial.month === currentMonth);
      expect(currentMonthHistorial?.month).toEqual(currentMonth);
      expect(currentMonthHistorial?.balance).toEqual(bankAccount1.balance)
      expect(currentMonthHistorial?.expenses).toEqual(bankAccount1.expenses)
      expect(currentMonthHistorial?.investments).toEqual(bankAccount1.investments)
    })

    it('Should get the normal user', async () => {
      const { statusCode, body }: { statusCode: any, body: IUserResponse } = await api.get('/api/v1/user').auth(normalUserToken, { type: 'bearer' });
      expect(statusCode).toBe(200);

      const previousMonth = new Date().getMonth();
      const twoMonthsAgo = new Date().getMonth() - 1;
      const currentMonth = new Date().getMonth() + 1;
      const month: Partial<IMonthsResponse> = {};
      month.jan = currentMonth || previousMonth || twoMonthsAgo === 1 ? body.bank_account.anual_historial[1]?.month.jan : undefined
      month.feb = currentMonth || previousMonth || twoMonthsAgo === 2 ? body.bank_account.anual_historial[1]?.month.feb : undefined
      month.mar = currentMonth || previousMonth || twoMonthsAgo === 3 ? body.bank_account.anual_historial[1]?.month.mar : undefined
      month.apr = currentMonth || previousMonth || twoMonthsAgo === 4 ? body.bank_account.anual_historial[1]?.month.apr : undefined
      month.may = currentMonth || previousMonth || twoMonthsAgo === 5 ? body.bank_account.anual_historial[1]?.month.may : undefined
      month.jun = currentMonth || previousMonth || twoMonthsAgo === 6 ? body.bank_account.anual_historial[1]?.month.jun : undefined
      month.jul = currentMonth || previousMonth || twoMonthsAgo === 7 ? body.bank_account.anual_historial[1]?.month.jul : undefined
      month.aug = currentMonth || previousMonth || twoMonthsAgo === 8 ? body.bank_account.anual_historial[1]?.month.aug : undefined
      month.sep = currentMonth || previousMonth || twoMonthsAgo === 9 ? body.bank_account.anual_historial[1]?.month.sep : undefined
      month.oct = currentMonth || previousMonth || twoMonthsAgo === 10 ? body.bank_account.anual_historial[1]?.month.oct : undefined
      month.nov = currentMonth || previousMonth || twoMonthsAgo === 11 ? body.bank_account.anual_historial[1]?.month.nov : undefined
      month.dec = currentMonth || previousMonth || twoMonthsAgo === 12 ? body.bank_account.anual_historial[1]?.month.dec : undefined
      const monthHistorials = Object.values(month);
      const monthHistorialsFound = monthHistorials.filter(historial => historial != undefined);

      // USER DATA
      expect(body.id).toEqual(normalUser.id);
      expect(body.name).toMatch(normalUser.name);
      expect(body.lastname).toMatch(normalUser.lastname);
      expect(body.accountType).toMatch(normalUser.account_type);
      expect(body.avatar).toMatch(normalUser.avatar);
      expect(body.alias).toMatch(normalUser.alias);
      expect(body.address).toMatch(normalUser.address);
      expect(body.phone).toMatch(normalUser.phone);
      expect(body.auth.id).toEqual(normalAuth.id);
      expect(body.auth.email).toMatch(normalAuth.email);
      expect(body.preferences.min_ammount_transfers).toEqual(preference2.min_ammount_transfers);
      expect(body.preferences.max_ammount_transfers).toEqual(preference2.max_ammount_transfers);
      expect(body.bank_account.number_account).toMatch(bankAccount2.number_account);
      expect(body.bank_account.balance).toEqual(bankAccount2.balance);
      expect(body.bank_account.expenses).toEqual(bankAccount2.expenses);
      expect(body.bank_account.investments).toEqual(bankAccount2.investments);

      // ANUAL HISTORIALS
      expect(body.bank_account.anual_historial).toBeInstanceOf(Array);
      expect(body.bank_account.anual_historial[0]?.year).toEqual(anualHistorial3.year);
      expect(body.bank_account.anual_historial[1]?.year).toEqual(anualHistorial4.year);

      // EXPECTED MONTHS TO BE DEFINED
      expect(body.bank_account.anual_historial[0]?.month.nov).toBeDefined();
      expect(body.bank_account.anual_historial[0]?.month.dec).toBeDefined();

      // NOVEMBER OF THE PREVIOUS YEAR
      expect(body.bank_account.anual_historial[0]?.month.nov?.balance).toEqual(historial5.balance);
      expect(body.bank_account.anual_historial[0]?.month.nov?.expenses).toEqual(historial5.expenses);
      expect(body.bank_account.anual_historial[0]?.month.nov?.investments).toEqual(historial5.investments);

      // DECEMBER OF THE PREVIOUS YEAR
      expect(body.bank_account.anual_historial[0]?.month.dec?.balance).toEqual(historial6.balance);
      expect(body.bank_account.anual_historial[0]?.month.dec?.expenses).toEqual(historial6.expenses);
      expect(body.bank_account.anual_historial[0]?.month.dec?.investments).toEqual(historial6.investments);

      // TRANSACTIONS RECEIVED ON NOVEMBER OF THE PREVIOUS YEAR
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received).toBeInstanceOf(Array);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[0]?.id).toEqual(1);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[0]?.year).toEqual(anualHistorial3.year);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[0]?.month).toEqual(historial5.month);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[0]?.source_account).toEqual(transaction1.source_account);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[0]?.destination_account).toEqual(transaction1.destination_account);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[0]?.amount).toEqual(transaction1.amount);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[0]?.from.user.name).toMatch(adminUser.name)
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[0]?.from.user.lastname).toMatch(adminUser.lastname);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[1]?.id).toEqual(5);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[1]?.year).toEqual(anualHistorial3.year);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[1]?.month).toEqual(historial5.month);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[1]?.source_account).toEqual(transaction5.source_account);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[1]?.destination_account).toEqual(transaction5.destination_account);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[1]?.amount).toEqual(transaction5.amount);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[1]?.from.user.name).toMatch(adminUser.name)
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.received[1]?.from.user.lastname).toMatch(adminUser.lastname);

      // TRANSACTIONS SENT ON NOVEMBER OF THE PREVIOUS YEAR
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent).toBeInstanceOf(Array);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[0]?.id).toEqual(2);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[0]?.year).toEqual(anualHistorial3.year);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[0]?.month).toEqual(historial5.month);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[0]?.source_account).toEqual(transaction2.source_account);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[0]?.destination_account).toEqual(transaction2.destination_account);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[0]?.amount).toEqual(transaction2.amount);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[0]?.to.user.name).toMatch(adminUser.name);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[0]?.to.user.lastname).toMatch(adminUser.lastname);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[1]?.id).toEqual(6);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[1]?.year).toEqual(anualHistorial3.year);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[1]?.month).toEqual(historial5.month);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[1]?.source_account).toEqual(transaction6.source_account);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[1]?.destination_account).toEqual(transaction6.destination_account);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[1]?.amount).toEqual(transaction6.amount);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[1]?.to.user.name).toMatch(adminUser.name);
      expect(body.bank_account.anual_historial[0]?.month.nov?.transactions.sent[1]?.to.user.lastname).toMatch(adminUser.lastname);

      // TWO MONTHS AGO ON THE CURRENT YEAR
      const twoMonthsAgoHistorial = monthHistorialsFound.find(historial => historial.month === twoMonthsAgo);
      expect(twoMonthsAgoHistorial?.month).toEqual(twoMonthsAgo);
      expect(twoMonthsAgoHistorial?.balance).toEqual(historial7.balance);
      expect(twoMonthsAgoHistorial?.expenses).toEqual(historial7.expenses);
      expect(twoMonthsAgoHistorial?.investments).toEqual(historial7.investments);

      // TRANSACTIONS RECEIVED TWO MONTHS AGO ON THE CURRENT YEAR
      expect(twoMonthsAgoHistorial?.transactions.received).toBeInstanceOf(Array);
      expect(twoMonthsAgoHistorial?.transactions.received[0]?.id).toEqual(3);
      expect(twoMonthsAgoHistorial?.transactions.received[0]?.year).toEqual(anualHistorial4.year);
      expect(twoMonthsAgoHistorial?.transactions.received[0]?.month).toEqual(historial7.month);
      expect(twoMonthsAgoHistorial?.transactions.received[0]?.source_account).toEqual(transaction3.source_account);
      expect(twoMonthsAgoHistorial?.transactions.received[0]?.destination_account).toEqual(transaction3.destination_account);
      expect(twoMonthsAgoHistorial?.transactions.received[0]?.amount).toEqual(transaction3.amount);
      expect(twoMonthsAgoHistorial?.transactions.received[0]?.from.user.name).toMatch(adminUser.name)
      expect(twoMonthsAgoHistorial?.transactions.received[0]?.from.user.lastname).toMatch(adminUser.lastname);
      expect(twoMonthsAgoHistorial?.transactions.received[1]?.id).toEqual(7);
      expect(twoMonthsAgoHistorial?.transactions.received[1]?.year).toEqual(anualHistorial4.year);
      expect(twoMonthsAgoHistorial?.transactions.received[1]?.month).toEqual(historial7.month);
      expect(twoMonthsAgoHistorial?.transactions.received[1]?.source_account).toEqual(transaction7.source_account);
      expect(twoMonthsAgoHistorial?.transactions.received[1]?.destination_account).toEqual(transaction7.destination_account);
      expect(twoMonthsAgoHistorial?.transactions.received[1]?.amount).toEqual(transaction7.amount);
      expect(twoMonthsAgoHistorial?.transactions.received[1]?.from.user.name).toMatch(adminUser.name)
      expect(twoMonthsAgoHistorial?.transactions.received[1]?.from.user.lastname).toMatch(adminUser.lastname);
      
      // TRANSACTIONS SENT TWO MONTHS AGO ON THE CURRENT YEAR
      expect(twoMonthsAgoHistorial?.transactions.sent).toBeInstanceOf(Array);
      expect(twoMonthsAgoHistorial?.transactions.sent[0]?.id).toEqual(4);
      expect(twoMonthsAgoHistorial?.transactions.sent[0]?.year).toEqual(anualHistorial4.year);
      expect(twoMonthsAgoHistorial?.transactions.sent[0]?.month).toEqual(historial7.month);
      expect(twoMonthsAgoHistorial?.transactions.sent[0]?.source_account).toEqual(transaction4.source_account);
      expect(twoMonthsAgoHistorial?.transactions.sent[0]?.destination_account).toEqual(transaction4.destination_account);
      expect(twoMonthsAgoHistorial?.transactions.sent[0]?.amount).toEqual(transaction4.amount);
      expect(twoMonthsAgoHistorial?.transactions.sent[0]?.to.user.name).toMatch(adminUser.name);
      expect(twoMonthsAgoHistorial?.transactions.sent[0]?.to.user.lastname).toMatch(adminUser.lastname);
      expect(twoMonthsAgoHistorial?.transactions.sent[1]?.id).toEqual(8);
      expect(twoMonthsAgoHistorial?.transactions.sent[1]?.year).toEqual(anualHistorial4.year);
      expect(twoMonthsAgoHistorial?.transactions.sent[1]?.month).toEqual(historial7.month);
      expect(twoMonthsAgoHistorial?.transactions.sent[1]?.source_account).toEqual(transaction8.source_account);
      expect(twoMonthsAgoHistorial?.transactions.sent[1]?.destination_account).toEqual(transaction8.destination_account);
      expect(twoMonthsAgoHistorial?.transactions.sent[1]?.amount).toEqual(transaction8.amount);
      expect(twoMonthsAgoHistorial?.transactions.sent[1]?.to.user.name).toMatch(adminUser.name);
      expect(twoMonthsAgoHistorial?.transactions.sent[1]?.to.user.lastname).toMatch(adminUser.lastname);

      // PREVIOUS MONTH 
      const previousMonthHistorial = monthHistorialsFound.find(historial => historial.month === previousMonth);
      expect(previousMonthHistorial?.month).toEqual(previousMonth);
      expect(previousMonthHistorial?.balance).toEqual(historial8.balance);
      expect(previousMonthHistorial?.expenses).toEqual(historial8.expenses);
      expect(previousMonthHistorial?.investments).toEqual(historial8.investments);

      // CURRENT MONTH
      const currentMonthHistorial = monthHistorialsFound.find(historial => historial.month === currentMonth);
      expect(currentMonthHistorial?.month).toEqual(currentMonth);
      expect(currentMonthHistorial?.balance).toEqual(bankAccount2.balance)
      expect(currentMonthHistorial?.expenses).toEqual(bankAccount2.expenses)
      expect(currentMonthHistorial?.investments).toEqual(bankAccount2.investments)
    })
  })

  describe('GET /all', () => {
    it('Should not access to the list of users', async () => {
      const { statusCode } = await api.get('/api/v1/user/all');
      expect(statusCode).toBe(401);
    })

    it('Should not access to the list of users because the payload from token is invalid', async () => {
      const { statusCode } = await api.get('/api/v1/user/all')
        .auth(tokenWithInvalidPayload, { type: 'bearer' });
      expect(statusCode).toBe(403);
    })

    it('Should not access to the list of users because your role is wrong', async () => {
      const { statusCode } = await api.get('/api/v1/user/all')
        .auth(normalUserToken, { type: 'bearer' });
      expect(statusCode).toBe(403);
    })

    it('Should access to the list of users', async () => {
      const { statusCode, body } = await api.get('/api/v1/user/all')
        .auth(adminUserToken, { type: 'bearer' });
      expect(statusCode).toBe(200);
      expect(body).toBeInstanceOf(Array);
    })
  })
  
  describe('GET /all-alias', () => {
    it('Should not access to the list of aliases', async () => {
      const { statusCode } = await api.post('/api/v1/user/all-alias');
      expect(statusCode).toBe(401);
    })

    it('Should not get aliases because three characters are neccesary', async () => {
      const request = {
        alias: 'ok'
      };
      const { statusCode } = await api.post('/api/v1/user/all-alias')
        .auth(normalUserToken, { type: 'bearer' })
        .send(request);
      expect(statusCode).toBe(400);
    })

    it('Should not get aliases because the payload from token is invalid', async () => {
      const request = {
        alias: 'okp'
      };
      const { statusCode } = await api.post('/api/v1/user/all-alias')
        .auth(tokenWithInvalidPayload, { type: 'bearer' })
        .send(request);
      expect(statusCode).toBe(403);
    })

    it('Should not get aliases because the current user not found', async () => {
      const request = {
        alias: 'okp'
      };
      const { statusCode } = await api.post('/api/v1/user/all-alias')
        .auth(anonUserToken, { type: 'bearer' })
        .send(request);
      expect(statusCode).toBe(404);
    })

    it('Should not get any alias', async () => {
      const request = {
        alias: 'oam'
      };
      const { statusCode } = await api.post('/api/v1/user/all-alias')
        .auth(normalUserToken, { type: 'bearer' })
        .send(request);
      expect(statusCode).toBe(404);
    })

    it('Should get one or more aliases', async () => {
      const request = {
        alias: 'adm'
      };
      const { statusCode, body } = await api.post('/api/v1/user/all-alias')
        .auth(normalUserToken, { type: 'bearer' })
        .send(request);
      expect(body).toBeInstanceOf(Array);
      expect(statusCode).toBe(200);
    })
  })

  describe('POST /', () => {
    it('Should not create user without login', async () => {
      const { statusCode } = await api.post('/api/v1/user');
      expect(statusCode).toBe(401);
    })

    it('Should not create user without any data', async () => {
      const { statusCode } = await api.post('/api/v1/user').auth(tokenWithInvalidPayload, { type: 'bearer' })
      expect(statusCode).toBe(400);
    })

    it('Should not create user by using a token with invalid payload', async () => {
      const data = {
        name: 'wrong',
        lastname: 'wrong',
        accountType: 'personal',
        alias: 'wrong',
      }
      const { statusCode } = await api.post('/api/v1/user')
        .auth(tokenWithInvalidPayload, { type: 'bearer' })
        .send(data);
      expect(statusCode).toBe(403);
    })

    it('Should not create an already existing user', async () => {
      const data = {
        name: 'admin',
        lastname: 'admin',
        accountType: 'personal',
        alias: 'admin',
      }
      const { statusCode } = await api.post('/api/v1/user')
        .auth(adminUserToken, { type: 'bearer' })
        .send(data);
      expect(statusCode).toBe(409);
    })

    it('Should create a new bank account', async () => {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
      const month: Partial<IMonthsResponse> = {};
      const payload = {
        name: 'nonuser',
        lastname: 'nonuser',
        accountType: 'personal',
        alias: 'nonuser',
        address: 'fake street 123',
        phone: "(000)-000-0000",
      }
      const { statusCode, body }: { statusCode: any, body: IUserCreatedData } = await api.post('/api/v1/user')
        .auth(authWithoutUserToken, { type: 'bearer' })
        .send(payload);
      expect(statusCode).toBe(200);
      expect(body.payload.userCreatedResponse.name).toMatch(payload.name);
      expect(body.payload.userCreatedResponse.lastname).toMatch(payload.lastname);
      expect(body.payload.userCreatedResponse.accountType).toMatch(payload.accountType);
      expect(body.payload.userCreatedResponse.alias).toMatch(payload.alias);
      expect(body.payload.userCreatedResponse.address).toMatch(payload.address);
      expect(body.payload.userCreatedResponse.phone).toMatch(payload.phone);
      expect(body.payload.userCreatedResponse.preferences.min_ammount_transfers).toEqual(10);
      expect(body.payload.userCreatedResponse.preferences.max_ammount_transfers).toEqual(999999);
      expect(body.payload.userCreatedResponse.bank_account.balance).toEqual(0);
      expect(body.payload.userCreatedResponse.bank_account.expenses).toEqual(0);
      expect(body.payload.userCreatedResponse.bank_account.investments).toEqual(0);
      expect(body.payload.userCreatedResponse.bank_account.anual_historial[0]?.year).toEqual(currentYear);
      month.jan = currentMonth === 1 ? body.payload.userCreatedResponse.bank_account.anual_historial[0]?.month.jan : undefined
      month.feb = currentMonth === 2 ? body.payload.userCreatedResponse.bank_account.anual_historial[0]?.month.feb : undefined
      month.mar = currentMonth === 3 ? body.payload.userCreatedResponse.bank_account.anual_historial[0]?.month.mar : undefined
      month.apr = currentMonth === 4 ? body.payload.userCreatedResponse.bank_account.anual_historial[0]?.month.apr : undefined
      month.may = currentMonth === 5 ? body.payload.userCreatedResponse.bank_account.anual_historial[0]?.month.may : undefined
      month.jun = currentMonth === 6 ? body.payload.userCreatedResponse.bank_account.anual_historial[0]?.month.jun : undefined
      month.jul = currentMonth === 7 ? body.payload.userCreatedResponse.bank_account.anual_historial[0]?.month.jul : undefined
      month.aug = currentMonth === 8 ? body.payload.userCreatedResponse.bank_account.anual_historial[0]?.month.aug : undefined
      month.sep = currentMonth === 9 ? body.payload.userCreatedResponse.bank_account.anual_historial[0]?.month.sep : undefined
      month.oct = currentMonth === 10 ? body.payload.userCreatedResponse.bank_account.anual_historial[0]?.month.oct : undefined
      month.nov = currentMonth === 11 ? body.payload.userCreatedResponse.bank_account.anual_historial[0]?.month.nov : undefined
      month.dec = currentMonth === 12 ? body.payload.userCreatedResponse.bank_account.anual_historial[0]?.month.dec : undefined
      const monthHistorials = Object.values(month);
      const currentMonthHistorial = monthHistorials.find(historial => historial != undefined);
      expect(currentMonthHistorial?.month).toEqual(currentMonth);
      expect(currentMonthHistorial?.transactions.sent).toBeInstanceOf(Array);
      expect(currentMonthHistorial?.transactions.received).toBeInstanceOf(Array);
    })
  })

  describe('PUT /', () => {
    it('Should not update user without login', async () => {
      const { statusCode } = await api.put('/api/v1/user/999');
      expect(statusCode).toBe(401);
    })

    it('Should not update an unexisting user', async () => {
      const { statusCode } = await api.put('/api/v1/user/999')
        .auth(normalUserToken, { type: 'bearer' });
      expect(statusCode).toBe(404);
    })

    it('Should not update an user with invalid data from the access token', async () => {
      const { statusCode } = await api.put(`/api/v1/user/${normalUser.id}`)
        .auth(tokenWithInvalidPayload, { type: 'bearer' });
      expect(statusCode).toBe(403);
    })

    it(`Should not update because the auth ids don't match`, async () => {
      const { statusCode } = await api.put(`/api/v1/user/${normalUser.id}`)
        .auth(adminUserToken, { type: 'bearer' });
      expect(statusCode).toBe(409);
    })

    it('Should not update the user with invalid data', async () => {
      const payload = {
        name: '',
        lastname: '',
        alias: '',
        address: 'fake street 123',
        phone: "555-2596",
        min_ammount_transfers: 9,
        max_ammount_transfers: 100000000
      }
      const { statusCode } = await api.put(`/api/v1/user/${normalUser.id}`)
        .auth(normalUserToken, { type: 'bearer' })
        .send(payload);
      expect(statusCode).toBe(400);
    })

    it('Should update the user', async () => {
      const payload = {
        name: 'Carlitos',
        lastname: 'Díaz',
        alias: 'carlito.diaz',
        address: 'fake street 123',
        phone: "(261)-555-2596",
        min_ammount_transfers: 12,
        max_ammount_transfers: 1000
      }
      const { statusCode } = await api.put(`/api/v1/user/${normalUser.id}`)
        .auth(normalUserToken, { type: 'bearer' })
        .send(payload);
      expect(statusCode).toBe(201);
    })
  })

  afterAll(async () => {
    await sequelize.close();
    server.close()
  })
})