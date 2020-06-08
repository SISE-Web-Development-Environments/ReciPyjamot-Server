const userFamilyRecipesHandler = async (req, res, next) => {
  const db = req.app.db;
  const id = req.params.userId;
  // get from db
  const family = await db.usersRecipes.findAll({
    where: { userId: id, relation: "family" },
    include: [{ model: db.recipes, as: "recipe" }],
  });
  const familyRecipes = family.map(({ recipe }) => recipe);
  // return value
  res.json(familyRecipes);
};

module.exports = userFamilyRecipesHandler;
