const recipesSearch = require("./recipesSearch");
const getRecipe = require("./getRecipe");
const getRandomRecipes = require("./getRandomRecipes");
const userLastSearchHandler = require("./userLastSearch");
const userFamilyRecipesHandler = require("./userFamilyRecipes");
const userFavoriteRecipesHandler = require("./userFavoriteRecipes");
const userLastWatchedRecipesHandler = require("./userLastWatchedRecipes");
const userPersonalRecipesHandler = require("./userPersonalRecipes");
const authRegisterHandler = require("./authRegister");
const authLoginHandler = require("./authLogin");

module.exports = {
  userHandlers: {
    search: userLastSearchHandler,
    family: userFamilyRecipesHandler,
    favorite: userFavoriteRecipesHandler,
    lastWatched: userLastWatchedRecipesHandler,
    personal: userPersonalRecipesHandler,
  },
  recipesHandlers: {
    recipesSearch: recipesSearch,
    getRecipe: getRecipe,
    getRandomRecipes: getRandomRecipes,
  },
  authenticationHandlers: {
    register: authRegisterHandler,
    login: authLoginHandler,
  },
};
