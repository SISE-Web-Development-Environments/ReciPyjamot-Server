const getUserHandler = require("./getUser");
const userLastSearch = require("./userLastSearch");
const recipesSearch = require("./recipesSearch");
const getRecipe = require("./getRecipe");

module.exports = {
  userHandlers: {
    getUser: getUserHandler,
    search: userLastSearch,

  },
  recipesHandlers: {
    recipesSearch: recipesSearch,
    getRecipe: getRecipe,
  },
};
