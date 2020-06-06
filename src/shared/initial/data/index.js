const pancakeRecipe = require("./recipePancake");
const sapir = require("./userSapir");
const haim = require("./userHaim");

module.exports = {
  users: [sapir, haim],
  recipes: [pancakeRecipe],
  usersRecipes: [],
  viewed: [],
};
