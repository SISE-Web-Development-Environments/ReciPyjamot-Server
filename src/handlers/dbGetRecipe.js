const db = require("../db/DButils");

const getRecipeFromDBHandler = async () => {
  const users = await db.execQuery("select INFO from recipes");
  console.log(users);
};

module.exports = getRecipeFromDBHandler;
