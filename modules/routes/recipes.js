const express = require('express');

const router = express.Router();
const axios = require('axios');

const api_domain = 'https://api.spoonacular.com/recipes';

// HAIM
router.get('/recipes/recipe/{id}', async (req, res, next) => {});
// SAPIR
router.get('/recipes', async (req, res, next) => {});
router.post('/recipes/search', async (req, res, next) => {});
// HAIM AND SAPIR
router.get('/recipes/users/{username}', async (req, res, next) => {});
// and finally
module.exports = router;


// -----------------------REFERENCES FROM LAB 9------------------------------------------//


router.get('/', (req, res) => res.send('im here'));

router.get('/Information', async (req, res, next) => {
  try {
    const recipe = await getRecipeInfo(req.query.recipe_id);
    res.send({ data: recipe.data });
  } catch (error) {
    next(error);
  }
});

// #region example1 - make serach endpoint
router.get('/search', async (req, res, next) => {
  try {
    const {
      query, cuisine, diet, intolerances, number,
    } = req.query;
    const search_response = await axios.get(`${api_domain}/search`, {
      params: {
        query,
        cuisine,
        diet,
        intolerances,
        number,
        instructionsRequired: true,
        apiKey: process.env.spooncular_apiKey,
      },
    });
    let recipes = await Promise.all(
      search_response.data.results.map((recipe_raw) => getRecipeInfo(recipe_raw.id)),
    );
    recipes = recipes.map((recipe) => recipe.data);
    res.send({ data: recipes });
  } catch (error) {
    next(error);
  }
});
// #endregion

function getRecipeInfo(id) {
  return axios.get(`${api_domain}/${id}/information`, {
    params: {
      includeNutrition: false,
      apiKey: process.env.spooncular_apiKey,
    },
  });
}
// and finally
module.exports = router;
