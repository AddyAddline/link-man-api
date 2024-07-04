const cron = require("node-cron");
const axios = require("axios");
require("dotenv").config();

const { NODE_ENV, PORT = 3000, BASE_URL_PROD } = process.env;
const BASE_URL =
  NODE_ENV === "development" ? "http://localhost" : BASE_URL_PROD;
const FULL_URL = NODE_ENV === "development" ? `${BASE_URL}:${PORT}` : BASE_URL;

cron.schedule("*/14 * * * *", async () => {
  try {
    const response = await axios.get(`${FULL_URL}/ping`);
    console.log("Server responded to /ping:", response.data);
  } catch (error) {
    console.error("Error pinging the server:", error.message);
  }
});
