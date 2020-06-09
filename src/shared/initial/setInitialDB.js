require("dotenv").config();
const data = require("./data");

// init sequelize
const dbSequelize = require("../../db/dbSequelize");

// insert to db
(async () => {
  try {
    const conn = {};
    const dbRecords = {};
    await dbSequelize(conn, true);
    for (const [table, entries] of Object.entries(data)) {
      dbRecords[table] = [];
      for await (const entry of entries) {
        const object = entry(dbRecords);
        const resp = await conn.db[table].create(object);
        dbRecords[table].push(resp);
      }
    }
  } catch (e) {
    console.log(e);
  }
})();
