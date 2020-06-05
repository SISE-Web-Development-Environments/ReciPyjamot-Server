const apiDomain='https://api.spoonacular.com';

const getRecipeInfoByID = (id) => {
// for information https://api.spoonacular.com//${id}/information
    console.log(`requesting: ${apiDomain}/recipes/${id}/information`);
    return axios.get(`${apiDomain}/recipes/${id}/information`, {
      params: {
        includeNutrition: true,
        apiKey: process.env.spooncular_apiKey,
      },
    }); 
}
const getRecipeInstructionsByID = (id) => {
  // for instrunctions https://api.spoonacular.com/recipes/{id}/analyzedInstructions
  console.log(`requesting: ${apiDomain}/recipes/${id}/analyzedInstructions`);
  return axios.get(`${apiDomain}/recipes/${id}/analyzedInstructions`, {
    params: {
      includeNutrition: false,
      apiKey: process.env.spooncular_apiKey,
    },
  });
}
const getRecipeIngredientsByID = (id) => {
// for ingredients https://api.spoonacular.com/recipes/{id}/ingredientWidget.json
  console.log(`requesting: ${apiDomain}/recipes/${id}/ingredientWidget.json`);
  return axios.get(`${apiDomain}/recipes/${id}/ingredientWidget.json`, {
    params: {
      includeNutrition: false,
      apiKey: process.env.spooncular_apiKey,
    },
  });
}
const getRecipePreviewByData = (infoAPI) => {
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
const getRandomRecipeData = (count) => {
// for ingredients // for random recipes https://api.spoonacular.com/recipes/random?number=count
console.log(`requesting: ${apiDomain}/recipes/random?number=${count}`);
  return axios.get(`${apiDomain}/recipes/random?number=${count}`, {
    params: {
      includeNutrition: false,
      apiKey: process.env.spooncular_apiKey,
    },
  });
}

module.exports = {
    getRecipeInfoByID: getRecipeInfoByID,
    getRecipeInstructionsByID: getRecipeInstructionsByID,
    getRecipeIngredientsByID: getRecipeIngredientsByID,
    getRecipePreviewByData: getRecipePreviewByData,
    getRandomRecipeData: getRandomRecipeData,
}