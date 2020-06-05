const express = require("express");
const router = express.Router();
// Haim - get all the function handlers
const {recipesHandlers} = require("../handlers");

router.get('/recipe/:id', recipesHandlers.getRecipe);
router.post('/search', recipesHandlers.recipesSearch);
router.get('/', recipesHandlers.getRandomRecipes);

module.exports = router;
