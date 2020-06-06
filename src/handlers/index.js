const recipesSearchHandler = require("./recipesSearch");
const getRecipeHandler = require("./recipesGetById");
const getRandomRecipesHandler = require("./recipesGetRandom");
const userLastSearchHandler = require("./userLastSearch");
const userFamilyRecipesHandler = require("./userFamilyRecipes");
const userFavoriteRecipesHandler = require("./userFavoriteRecipes");
const userLastWatchedRecipesHandler = require("./userLastWatchedRecipes");
const userPersonalRecipesHandler = require("./userPersonalRecipes");
const authRegisterHandler = require("./authRegister");
const authLoginHandler = require("./authLogin");
const getRecipeFromDBHandler = require("./dbGetRecipe");
const getUserHandler = require("./dbGetUser");

module.exports = {
  userHandlers: {
    search: userLastSearchHandler,
    family: userFamilyRecipesHandler,
    favorite: userFavoriteRecipesHandler,
    lastWatched: userLastWatchedRecipesHandler,
    personal: userPersonalRecipesHandler,
  },
  recipesHandlers: {
    recipesSearch: recipesSearchHandler,
    getRecipe: getRecipeHandler,
    getRandomRecipes: getRandomRecipesHandler,
  },
  authenticationHandlers: {
    register: authRegisterHandler,
    login: authLoginHandler,
  },
  dbHandlers: {
    getRecipe: getRecipeFromDBHandler,
    getUser: getUserHandler,
  },
};
