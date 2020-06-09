const getRecipeFromDBHandler = async (req, res, next) => {
  const db = req.app.db;
  const id = req.params.recipeId;
  // get from db
  const recipe = await db.recipes.find({
    where: { recipeId: id },
  });
  // return value
  res.json(recipe);
};
module.exports = getRecipeFromDBHandler;
