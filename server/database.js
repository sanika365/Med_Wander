const { Sequelize } = require("sequelize");
require("dotenv").config(); // Load environment variables from .env file

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    storage: "./database.mysql",
  }
);

module.exports = sequelize;
