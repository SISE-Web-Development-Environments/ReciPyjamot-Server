const db = require("../db/DButils");

const getUserHandler = async () => {
  const users = await db.execQuery(
    "select username from users where username = '4'"
  );
  console.log(users);
};

module.exports = getUserHandler;
