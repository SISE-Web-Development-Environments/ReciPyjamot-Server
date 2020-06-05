const getRecipeInfoByID = require("../shared/utils")
const getRecipeIngredientsByID = require("../shared/utils")
const getRecipeInstructionsByID = require("../shared/utils")

const getRecipe = async (req, res, next) => {
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
        vegen: infoAPI.data.vegan,// TODO change the word 'vegen' to 'vegan' in the API
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
  
  };
  
  module.exports = getRecipe;