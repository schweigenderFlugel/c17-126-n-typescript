// Import environment variables here.
import '../mainServer';

const PORT = process.env.PORT || '';
const HOST = process.env.HOST || '';
const DATABASE = process.env.DATABASE || '';
const USER = process.env.USER || '';
const PASSWORD = process.env.PASSWORD || '';

export { PORT, HOST, DATABASE, USER, PASSWORD };