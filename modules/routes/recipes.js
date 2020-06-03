var express = require("express");
var router = express.Router();
const axios = require("axios");

const api_domain = "https://api.spoonacular.com/recipes";

//HAIM
router.get("/recipes/recipe/{id}",async (req, res, next) => {
  try{
    // for information https://api.spoonacular.com//${id}/information
    const infoAPI = await getRecipeInfoByID(req.query.recipe_id);//get the recipe info by given id
    // for instrunctions GET https://api.spoonacular.com/recipes/{id}/analyzedInstructions
    const instructionsAPI = await getRecipeInstructionsByID(req.query.recipe_id);//get the recipe intructions by given id
    // for ingredients https://api.spoonacular.com/recipes/{id}/ingredientWidget.json
    const ingredientsAPI = await getRecipeIngredientsByID(req.query.recipe_id)//get the recipe's ingredients by given id
    
    const preview = {
      image_url: infoAPI.image,
      title: infoAPI.title,
      preperation_time: infoAPI.readyInMinutes,
      likes: infoAPI.likes,
      vegen: infoAPI.vegen,
      gluten_free: infoAPI.gluten_freee,
      viewed: infoAPI.viewed,//TODO get from user
      favorite: infoAPI.favorite//TODO get from user
    }
    const ingrediants = ingredientsAPI.ingredients.forEach((ingredient))
    res.send(
      //{ data: recipe.data }
      {
        "preview": preview,
        "number_of_dishes": recipe.servings,
        "ingrediants": [
          {
            "name": "pepper",
            "amount": 0,
            "units": "grams"
          }
        ],
        "instructions": {
          "intructions": [
            "mix the eggs with the milk"
          ]
        }
      }
      );//sends the data we got
  }catch{}

})
//SAPIR
router.get("/recipes",async (req, res, next) => {})
router.post("/recipes/search",async (req, res, next) => {})
//HAIM AND SAPIR
router.get("/recipes/users/{username}",async (req, res, next) => {})
//and finally
module.exports = router;



//-----------------------REFERENCES FROM LAB 9------------------------------------------//


router.get("/", (req, res) => res.send("im here"));

router.get("/Information", async (req, res, next) => {
  try {
    const recipe = await getRecipeInfo(req.query.recipe_id);
    res.send({ data: recipe.data });
  } catch (error) {
    next(error);
  }
});

//#region example1 - make serach endpoint
router.get("/search", async (req, res, next) => {
  try {
    const { query, cuisine, diet, intolerances, number } = req.query;
    const search_response = await axios.get(`${api_domain}/search`, {
      params: {
        query: query,
        cuisine: cuisine,
        diet: diet,
        intolerances: intolerances,
        number: number,
        instructionsRequired: true,
        apiKey: process.env.spooncular_apiKey
      }
    });
    let recipes = await Promise.all(
      search_response.data.results.map((recipe_raw) =>
        getRecipeInfo(recipe_raw.id)
      )
    );
    recipes = recipes.map((recipe) => recipe.data);
    res.send({ data: recipes });
  } catch (error) {
    next(error);
  }
});
//#endregion

function getRecipeInfoByID(id) {
// for information https://api.spoonacular.com//${id}/information
  return axios.get(`${api_domain}/${id}/information`, {
    params: {
      includeNutrition: false,
      apiKey: process.env.spooncular_apiKey
    }
  });
}
function getRecipeInstructionsByID(id){
// for instrunctions https://api.spoonacular.com/recipes/{id}/analyzedInstructions
  return axios.get(`${api_domain}/${id}/analyzedInstructions`, {
    params: {
      includeNutrition: false,
      apiKey: process.env.spooncular_apiKey
    }
  });
}
function getRecipeIngredientsByID(id){
// for ingredients https://api.spoonacular.com/recipes/{id}/ingredientWidget.json
  return axios.get(`${api_domain}/${id}/ingredientWidget.json`, {
    params: {
      includeNutrition: false,
      apiKey: process.env.spooncular_apiKey
    }
  });
}
//and finally
module.exports = router;

