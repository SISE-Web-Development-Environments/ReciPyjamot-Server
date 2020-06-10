const {
  isFavorite,
  getRecipeInfoByID,
  getRecipeIngredientsByID,
  getRecipeInstructionsByID,
} = require("../shared");

const getRecipeHandler = async (req, res, next) => {
  try {
    const [infoAPI, ingredientsAPI, instructionsAPI] = await Promise.all([
      getRecipeInfoByID(req.params.id), // get the recipe info by given id,
      getRecipeIngredientsByID(req.params.id), // get the recipe's ingredients by given id
      getRecipeInstructionsByID(req.params.id), // get the recipe intructions by given id
    ]);
    // // for information https://api.spoonacular.com/recipes/${id}/information
    // const infoAPI = await getRecipeInfoByID(req.params.id); // get the recipe info by given id
    // // for ingredients https://api.spoonacular.com/recipes/{id}/ingredientWidget.json
    // const ingredientsAPI = await getRecipeIngredientsByID(req.params.id); // get the recipe's ingredients by given id
    // // for instrunctions GET https://api.spoonacular.com/recipes/{id}/analyzedInstructions
    // const instructionsAPI = await getRecipeInstructionsByID(req.params.id); // get the recipe intructions by given id

    // set preview
    const preview = {
      id: infoAPI.data.id,
      image: infoAPI.data.image,
      title: infoAPI.data.title,
      readyInMinutes: infoAPI.data.readyInMinutes,
      likes: infoAPI.data.likes,
      vegan: infoAPI.data.vegan, // TODO change the word 'vegen' to 'vegan' in the API
      gluten_free: infoAPI.data.glutenFree,
      viewed: isViewed(userId,infoAPI.data.id), // TODO get userId
      favorite: isFavorite(userId,infoAPI.data.id), // TODO get userId
    };
    const ingredients = [];
    ingredientsAPI.data.ingredients.forEach((ingredient) => {
      ingredients.push({
        name: ingredient.name,
        value: ingredient.amount.metric.value,
        units: ingredient.amount.metric.unit,
      });
    });
    const instructions = [];
    if (instructionsAPI.data.length != 0) {
      for (let i = 0; i < instructionsAPI.data.length; i++) {
        for (let j = 0; j < instructionsAPI.data[i].steps.length; j++) {
          instructions.push(instructionsAPI.data[i].steps[j].step);
        }
      }
    }
    res.send({
      preview: preview,
      servings: infoAPI.data.servings,
      ingredients: ingredients,
      instructions: instructions,
    }); // sends the data we got
  } catch (err) {
    res.status(402).send('bad request '+err);
  }
};

module.exports = getRecipeHandler;
