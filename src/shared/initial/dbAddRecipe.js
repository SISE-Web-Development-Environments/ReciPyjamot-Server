// const pancakeRecipe = require("../models/jsonRecipes/pancakeRecipe");

const addRecipeHandler = async (req, res, next) => {
  await req.app.db.recipes.create({
    image: pancakeRecipe.image,
    title: pancakeRecipe.title,
    readyInMinutes: pancakeRecipe.readyInMinutes,
    likes: pancakeRecipe.likes,
    vegan: pancakeRecipe.vegan,
    glutenFree: pancakeRecipe.glutenFree,
    viewed: pancakeRecipe.viewed,
    favorite: pancakeRecipe.favorite,
    ingredients: pancakeRecipe.ingredients,
    instructions: pancakeRecipe.instructions,
    servings: pancakeRecipe.servings,
  });
  res.send({ 1: 1 });
};

module.exports = addRecipeHandler;
