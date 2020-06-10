const {
  getRecipePreviewByData,
  getRandomRecipeData,
} = require("../shared/utils");

const getRandomRecipesHandler = async (req, res, next) => {
  try {
    // for random recipes https://api.spoonacular.com/recipes/random
    const randomRecipesAPI = await getRandomRecipeData(req.body.number); // get the recipe info by given id
    const previews = [];
    if (randomRecipesAPI.data.length != 0) {
      randomRecipesAPI.data.recipes.forEach((recipeData) => {
        previews.push(getRecipePreviewByData(recipeData));
      });
    }
    res.status(200).send(previews); // sends the data we got
  } catch (err) {
    res.status(400).send("bad request"); // sends the data we got
    console.log(err);
  }
};

module.exports = getRandomRecipesHandler;
