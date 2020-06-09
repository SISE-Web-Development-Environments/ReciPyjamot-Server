const userLastWatchedRecipesHandler = async (req, res, next) => {
  const db = req.app.db;
  const id = req.params.userId;
  const lastWatched = await db.viewed.findAll({
    where: { userId: id },
    include: [{ model: db.recipes, as: "recipe" }],
    order: [sequelize.literal("created_at, updated_at"), "desc"],
  });

  const lastWatchedObj = lastWatched.map(({ recipe }) => recipe);
  // return value
  res.json(lastWatchedObj.slice(0, 2));
};

module.exports = userLastWatchedRecipesHandler;
