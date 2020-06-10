const userFamilyRecipesHandler = async (req, res, next) => {
  try{
    const db = req.app.db;
    const id = req.params.userId;
    // get from db
    const family = await db.usersRecipes.findAll({
      where: { userId: id, relation: "family" },
      include: [{ model: db.recipes, as: "recipe" }],
    });
    const familyRecipes = family.map(({ recipe }) => recipe);
    // return value
    if(familyRecipes.length!=0){
      res.status(200).json({data: familyRecipes});
    }else{
      res.status(404).send('no results found');
    }
  }catch(err){
    res.status(400).send('bad request');
  }
};

module.exports = userFamilyRecipesHandler;
