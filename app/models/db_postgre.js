const { Client } = require("pg");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = new Client({
  host: dbConfig.HOST,
  database: dbConfig.DB,
  password: dbConfig.PASSWORD,
  user: dbConfig.USER
  //connectionString: process.env.DATABASE_URL,
  //ssl: {
  //  rejectUnauthorized: false
  //}
});


// open the PG connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
