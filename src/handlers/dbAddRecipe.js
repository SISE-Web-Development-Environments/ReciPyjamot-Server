const addRecipeHandler = async (req, res, next) => {
  await req.app.db.recipes.create({
    image: "123",
    title: "demo",
    readyInMinutes: 3,
    likes: 3,
    vegan: true,
    glutenFree: true,
  });
  res.send({ 1: 1 });
};

// await db.execQuery(`
// INSERT INTO [dbo].[users]
//   ([USERNAME], [FIRSTNAME], [LASTNAME], [COUNTRY], [PASSWORD], [EMAIL] ,[IMAGE])
//   VALUES
//   ('${username}', '${first_name}', '${last_name}', '${country}', HASHBYTES('SHA2_256', '${password}'), '${email}', '${image}')
//   GO `);

module.exports = addRecipeHandler;
