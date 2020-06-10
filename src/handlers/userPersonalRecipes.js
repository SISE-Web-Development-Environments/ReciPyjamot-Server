const userPersonalRecipesHandler = async (req, res, next) => {
  try{
  const db = req.app.db;
  const id = req.params.userId;
  // get from db
  const personal = await db.usersRecipes.findAll({
    where: { userId: id, relation: "personal" },
    include: [{ model: db.recipes, as: "recipe" }],
  });
  const personalRecipes = personal.map(({ recipe }) => recipe);
  // return value
  res.status(200).json(personalRecipes);
  }catch(err){
    res.status(400).send('bad request '+err);
  }
};

module.exports = userPersonalRecipesHandler;
