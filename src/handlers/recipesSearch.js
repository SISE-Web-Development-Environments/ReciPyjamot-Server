const axios = require("axios");
const {getRecipeInfoByID,getRecipePreviewByData} = require("../shared/utils")

const apiDomain = 'https://api.spoonacular.com';

const recipesSearch = async (req, res, next) => {
    try {
        const { query, cuisine, diet, intolerances, number } = req.body;
        const searchResponse = await axios.get(`${apiDomain}/recipes/search`, {
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
            searchResponse.data.results.map((rawRecipe) =>
              getRecipeInfoByID(rawRecipe.id)
          )
        );
        recipes = recipes.map((recipe) => getRecipePreviewByData(recipe.data));
        res.send({ data: recipes });
      } catch (error) {
        next(error);
      }
  };
  
  module.exports = recipesSearch;