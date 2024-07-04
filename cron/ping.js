const cron = require('node-cron');
require('dotenv').config();

const { NODE_ENV, PORT = 3000, BASE_URL_PROD } = process.env;
const BASE_URL =
  NODE_ENV === 'development' ? 'http://localhost' : BASE_URL_PROD;
const FULL_URL = NODE_ENV === 'development' ? `${BASE_URL}:${PORT}` : BASE_URL;

cron.schedule('*/14 * * * *', async () => {
  try {
    const response = await fetch(`${FULL_URL}/ping`);
    const data = await response.json();
    console.log('Server responded to /ping:', data);
  } catch (error) {
    console.error('Error pinging the server:', error);
  }
});
