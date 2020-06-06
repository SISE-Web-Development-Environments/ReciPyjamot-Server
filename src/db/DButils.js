require("dotenv").config();
const sql = require("mssql");
const dbConfig = require("./dbConfig");

const pool = new sql.ConnectionPool(dbConfig);
const poolConnect = pool
  .connect()
  .then(() => console.log("new connection pool Created"))
  .catch((err) => console.log(err));

exports.execQuery = async function (query) {
  await poolConnect;
  try {
    const result = await pool.request().query(query);
    return result.recordset;
  } catch (err) {
    console.error("SQL error", err);
    throw err;
  }
};
