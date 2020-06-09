const userFavoriteRecipesHandler = async (req, res, next) => {
  const db = req.app.db;
  const id = req.params.userId;
  // get from db
  const allUserRecipes = await db.usersRecipes.findAll({
    where: { userId: id },
    include: [{ model: db.recipes, as: "recipe" }],
  });
  const allUserRecipesId = allUserRecipes.map(({ recipe }) => recipe);

  const favorite = await db.viewed.findAll({
    where: { userId: id, favorite: true },
    raw: true,
  });
  const favoriteId = favorite.map(({ recipeId }) => recipeId);
  // return value
  res.json({ db: allUserRecipesId, spoonacular: favoriteId });
};

module.exports = userFavoriteRecipesHandler;
