const express = require("express");
const router = express.Router();
const { dbHandlers } = require("../handlers");

router.get("/getRecipe/:recipeId", dbHandlers.getRecipe);

router.get("/getUser/:userId", dbHandlers.getUser);

module.exports = router;
