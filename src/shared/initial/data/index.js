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
    salmonTacos,
    plov,
    // add personal recipe
    salsa,
    enchiladas,
    // add family recipe
  ],
  usersRecipes: [
    { userId: 1, recipeId: 1, relation: "personal" },
    { userId: 1, recipeId: 2, relation: "personal" },
    { userId: 1, recipeId: 3, relation: "personal" },
    { userId: 1, recipeId: 4, relation: "family" },
    { userId: 1, recipeId: 5, relation: "family" },
    { userId: 1, recipeId: 6, relation: "family" },
    { userId: 2, recipeId: 7, relation: "personal" },
    { userId: 2, recipeId: 8, relation: "personal" },
    { userId: 2, recipeId: 9, relation: "personal" },
    { userId: 2, recipeId: 10, relation: "family" },
    { userId: 2, recipeId: 11, relation: "family" },
    { userId: 2, recipeId: 12, relation: "family" },
  ],
};
