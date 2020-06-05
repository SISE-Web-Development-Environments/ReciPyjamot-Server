const getRecipePreviewByData = require("../shared/utils")
const getRandomRecipeData = require("../shared/utils")

const getRandomRecipe = async (req, res, next) => {
    try {
      // for random recipes https://api.spoonacular.com/recipes/random
      const randomRecipesAPI = await getRandomRecipeData(req.params.id); // get the recipe info by given id
      const previews = [];
      if(randomRecipesAPI.data.length!=0){
        randomRecipesAPI.data.forEach((recipeData)=>{
            previews.push(getRecipePreviewByData(recipeData));
        });
      }
      res.send(previews); // sends the data we got
    } catch(err) {console.log(err)}
};
  
module.exports = getRandomRecipe;