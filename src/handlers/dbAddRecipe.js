const db = require("../db/DButils");

const addRecipeHandler = async () => {
  await db.execQuery(
    `INSERT INTO [dbo].[recipes] ([INFO]) VALUES(${recipeString})`
  );
};

module.exports = addRecipeHandler;
