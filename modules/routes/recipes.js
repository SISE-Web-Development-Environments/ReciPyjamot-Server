const express = require("express");

const router = express.Router();
const axios = require("axios");
const api_domain='https://api.spoonacular.com';
// HAIM
router.get("/recipe/:id", async (req, res, next) => {
  console.log('id='+req.params.id);
  try {
    // for information https://api.spoonacular.com/recipes/${id}/information
    const infoAPI = await getRecipeInfoByID(req.params.id); // get the recipe info by given id
    // for ingredients https://api.spoonacular.com/recipes/{id}/ingredientWidget.json
    const ingredientsAPI = await getRecipeIngredientsByID(req.params.id); // get the recipe's ingredients by given id
    // for instrunctions GET https://api.spoonacular.com/recipes/{id}/analyzedInstructions
    const instructionsAPI = await getRecipeInstructionsByID(req.params.id); // get the recipe intructions by given id

    // set preview
    const preview = {
      image_url: infoAPI.data.image,
      title: infoAPI.data.title,
      preperation_time: infoAPI.data.readyInMinutes,
      likes: infoAPI.data.likes,
      vegen: infoAPI.data.vegan,
      gluten_free: infoAPI.data.glutenFree,
      viewed: infoAPI.data.viewed, // TODO get from user
      favorite: infoAPI.data.favorite, // TODO get from user
    };
    const ingredients = [];
    ingredientsAPI.data.ingredients.forEach((ingredient)=>{
      ingredients.push({
        name: ingredient.name,
        amount: ingredient.amount.metric.value,
        units: ingredient.amount.metric.unit,
      })
    });
    const instructions = {instructions:[]};
    if(instructionsAPI.data.length!=0){
      for(let i=0;i<instructionsAPI.data.length;i++){
        for(let j=0;j<instructionsAPI.data[i].steps.length;j++){
          instructions.instructions.push(instructionsAPI.data[i].steps[j].step)
        }
      }
    }
    res.send(
      {
        preview: preview,
        number_of_dishes: infoAPI.data.servings,
        ingrediants: ingredients,// TODO change the name 'ingrediants' to 'ingredients'
        instructions: instructions,
      }
    ); // sends the data we got
  } catch(err) {console.log(err)}
});
// SAPIR
router.get("/", async (req, res, next) => {});
// router.post("/search", async (req, res, next) => {
router.get("/search", async (req, res, next) => {
    try {
      const { query, cusine, diet, intolerance, count } = req.body;
      const search_response = await axios.get(`${api_domain}/recipes/search`, {
        params: {
          query,
          cuisine: cusine,
          diet,
          intolerances: intolerance,
          number: count,
          instructionsRequired: true,
          apiKey: process.env.spooncular_apiKey,
        },
      });
      let recipes = await Promise.all(
        search_response.data.results.map((recipe_raw) =>
            getRecipeInfoByID(recipe_raw.id)
        )
      );
      recipes = recipes.map((recipe) => getRecipePreviewByData(recipe.data));
      res.send({ data: recipes });
    } catch (error) {
      next(error);
    }
  });
  
// router.get("/users/${username}", async (req, res, next) => {});
// // and finally
module.exports = router;
// -----------------------REFERENCES FROM LAB 9------------------------------------------//
/*
router.get("/", (req, res) => res.send("im here"));

router.get("/Information", async (req, res, next) => {
  try {
    const recipe = await getRecipeInfo(req.query.recipe_id);
    res.send({ data: recipe.data });
  } catch (error) {
    next(error);
  }
});

// #region example1 - make serach endpoint
router.get("/search", async (req, res, next) => {
  try {
    const { query, cuisine, diet, intolerances, number } = req.query;
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
// #endregion
*/
function getRecipeInfoByID(id) {
  // for information https://api.spoonacular.com//${id}/information
  console.log(`requesting: ${api_domain}/recipes/${id}/information`);
  return axios.get(`${api_domain}/recipes/${id}/information`, {
    params: {
      includeNutrition: true,
      apiKey: process.env.spooncular_apiKey,
    },
  });
}
// gets the instructions
function getRecipeInstructionsByID(id) {
  // for instrunctions https://api.spoonacular.com/recipes/{id}/analyzedInstructions
  console.log(`requesting: ${api_domain}/recipes/${id}/analyzedInstructions`);
  return axios.get(`${api_domain}/recipes/${id}/analyzedInstructions`, {
    params: {
      includeNutrition: false,
      apiKey: process.env.spooncular_apiKey,
    },
  });
}
function getRecipeIngredientsByID(id) {
  // for ingredients https://api.spoonacular.com/recipes/{id}/ingredientWidget.json
  console.log(`requesting: ${api_domain}/recipes/${id}/ingredientWidget.json`);
  return axios.get(`${api_domain}/recipes/${id}/ingredientWidget.json`, {
    params: {
      includeNutrition: false,
      apiKey: process.env.spooncular_apiKey,
    },
  });
}
// get the preview information of a recipe by given id  
function getRecipePreviewByData(infoAPI) {
  // for information https://api.spoonacular.com//${id}/information
  const preview = {
    image_url: infoAPI.image,
    title: infoAPI.title,
    preperation_time: infoAPI.readyInMinutes,
    likes: infoAPI.likes,
    vegen: infoAPI.vegan,
    gluten_free: infoAPI.glutenFree,
    viewed: infoAPI.viewed, // TODO get from user
    favorite: infoAPI.favorite, // TODO get from user
  };

  return preview;
}
// and finally
module.exports = router;
