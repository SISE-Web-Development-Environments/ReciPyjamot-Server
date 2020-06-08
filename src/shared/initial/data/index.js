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
const picoDeGallo = require("./recipePicoDeGallo");
// Haim: personal
const salmonTacos = require("./recipeSalmonTacos");
const plov = require("./recipePlov");
const pastaBatata = require("./recipePastaBatata");

// users
const sapir = require("./userSapir");
const haim = require("./userHaim");

const userRecipe = (dbRecords, username, title) => {
  const userSapir = dbRecords.users.find((user) => user.username === username);
  const recipePancake = dbRecords.recipes.find(
    (recipe) => recipe.title === title
  );
  const relation = recipePancake.family === null ? "personal" : "family";
  return { userId: userSapir.id, recipeId: recipePancake.id, relation };
};

module.exports = {
  users: [() => sapir, () => haim],
  recipes: [
    () => pancake,
    () => smoothie,
    () => cookie,
    () => kubaneh,
    () => lahoh,
    () => yemeniteSoup,
    () => salmonTacos,
    () => plov,
    () => pastaBatata,
    () => salsa,
    () => enchiladas,
    () => picoDeGallo,
  ],
  usersRecipes: [
    (dbRecords) => userRecipe(dbRecords, sapir.username, kubaneh.title),
    (dbRecords) => userRecipe(dbRecords, sapir.username, lahoh.title),
    (dbRecords) => userRecipe(dbRecords, sapir.username, yemeniteSoup.title),
    (dbRecords) => userRecipe(dbRecords, sapir.username, pancake.title),
    (dbRecords) => userRecipe(dbRecords, sapir.username, smoothie.title),
    (dbRecords) => userRecipe(dbRecords, sapir.username, cookie.title),
    (dbRecords) => userRecipe(dbRecords, haim.username, salsa.title),
    (dbRecords) => userRecipe(dbRecords, haim.username, enchiladas.title),
    (dbRecords) => userRecipe(dbRecords, haim.username, picoDeGallo.title),
    (dbRecords) => userRecipe(dbRecords, haim.username, salmonTacos.title),
    (dbRecords) => userRecipe(dbRecords, haim.username, plov.title),
    (dbRecords) => userRecipe(dbRecords, haim.username, pastaBatata.title),
  ],
};
