const userPersonalRecipesHandler = async (req, res, next) => {
  const db = req.app.db;
  const id = req.params.userId;
  // get from db
  const personal = await db.usersRecipes.findAll({
    where: { userId: id, relation: "personal" },
    include: [{ model: db.recipes, as: "recipe" }],
  });
  const personalRecipes = personal.map(({ recipe }) => recipe);
  // return value
  res.json(personalRecipes);
};

module.exports = userPersonalRecipesHandler;
