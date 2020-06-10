const axios = require("axios");
const {
  getRecipeInfoByID,
  getRecipePreviewByData,
} = require("../shared/utils");

const apiDomain = "https://api.spoonacular.com";

const recipesSearchHandler = async (req, res, next) => {
  try {
    const { id, query, cuisine, diet, intolerances, number } = req.body;
    const searchResponse = await axios.get(`${apiDomain}/recipes/search`, {
      params: {
        id,
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
    if(recipes.length!=0){
      res.status(200).send(recipes);
    }else{
      res.status(404).send('no results found');
    }
  } catch (error) {
    res.status(400).send('bad request');  
    next(error);
  }
};

module.exports = recipesSearchHandler;
