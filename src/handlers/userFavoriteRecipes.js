const utils = require("../shared/utils")
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
  const favoritesAPI = await favorite.map(async (record) =>{await utils.getRecipePreviewByData(await utils.getRecipeInfoByID(record.recipeId));
    // const infoAPI = await utils.getRecipeInfoByID(record.recipeId);
    // const preview = await utils.getRecipePreviewByData(infoAPI.data)
    // await favoritesAPI.push(preview);
  })
  // return value
  res.json({ db: allUserRecipesId, spoonacular: favoritesAPI });
};

module.exports = userFavoriteRecipesHandler;
