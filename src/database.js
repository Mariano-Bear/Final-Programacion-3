const mysql = require("mysql");
const { promisify } = require("util");

const { database } = require("./connection");

const db_connect = mysql.createPool(database);

db_connect.getConnection((err, connection) => {
  if (err) {
    console.log(err);
  }

  if (connection) connection.release();
  console.log("Base de datos Conectada");
  return;
});
db_connect.query = promisify(db_connect.query);

module.exports = db_connect;
