// Sapir: family
const kubaneh = require("./recipeKubaneh");
const lahoh = require("./recipeLahoh");
const yemeniteSoup = require("./recipeYemeniteSoup");
// Sapir: personal
const pancake = require("./recipePancake");
const smoothie = require("./recipeSmoothie");
const cookie = require("./recipeCookie");

// Haim: family
const salsa = require("./recipeSalsa");
const enchiladas = require("./recipeEnchiladas");
// Haim: personal
const salmonTacos = require("./recipeSalmonTacos");
const plov = require("./recipePlov");

// users
const sapir = require("./userSapir");
const haim = require("./userHaim");

module.exports = {
  users: [sapir, haim],
  recipes: [
    pancake,
    smoothie,
    cookie,
    kubaneh,
    lahoh,
    yemeniteSoup,
    salsa,
    enchiladas,
    salmonTacos,
    plov,
  ],
  // usersRecipes: [],
};
