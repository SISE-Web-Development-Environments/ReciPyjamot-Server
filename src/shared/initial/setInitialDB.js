require("dotenv").config();
const data = require("./data");
// loadFiles();

// init sequelize
const dbSequelize = require("../../db/dbSequelize");

// insert to db
(async () => {
  try {
    const conn = {};
    await dbSequelize(conn);
    for (const [table, entries] of Object.entries(data)) {
      entries.forEach(async (entry) => {
        await conn.db[table].create(entry);
      });
    }
  } catch (e) {
    console.log(e);
  }
})();
