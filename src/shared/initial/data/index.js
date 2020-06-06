// Sapir: family
const pancake = require("./recipePancake");
const smoothie = require("./recipeSmoothie");
const cookie = require("./recipeCookie");
// Sapir: personal

// Haim: family
const salmonTacos = require("./recipeSalmonTacos");
const salsa = require("./recipeSalsa");
const enchiladas = require("./recipeEnchiladas");
// Haim: personal

const sapir = require("./userSapir");
const haim = require("./userHaim");

module.exports = {
  users: [sapir, haim],
  recipes: [pancake, smoothie, cookie, salmonTacos, salsa, enchiladas],
  // usersRecipes: [],
};
