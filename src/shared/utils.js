const axios = require("axios");

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
// extracts relevant data from information in request https://api.spoonacular.com//${id}/information
  const preview = {
    image: infoAPI.image,
    title: infoAPI.title,
    readyInMinutes: infoAPI.readyInMinutes,
    likes: infoAPI.likes,
    vegan: infoAPI.vegan,
    glutenFree: infoAPI.glutenFree,
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
// -----------------------------------------------------------------
const registerInDB = (registerRequest) => {
  console.log(`extracting registration info from request`);
  const {username,fisrt_name,last_name,country,password,confirmation_password,email,image} = registerRequest;
  if(isUsernameTaken(username)){
    console.log(`username ${username} is taken`);
    return false;
  }
  return true;
}
// private functions
const authenticate = (username,password) => {
  console.log(`authenticating ${username},${password} is in DB`);
  return true;
}
const isUsernameTaken = (username) => {
  console.log(`checking if ${username} is in DB`);
  return false;
}


module.exports={
    getRecipeInfoByID: getRecipeInfoByID,
    getRecipeInstructionsByID: getRecipeInstructionsByID,
    getRecipeIngredientsByID: getRecipeIngredientsByID,
    getRecipePreviewByData: getRecipePreviewByData,
    getRandomRecipeData: getRandomRecipeData,
    authenticate: authenticate,
}
// module.exports = {
//     getRecipeInfoByID: getRecipeInfoByID,
//     getRecipeInstructionsByID: getRecipeInstructionsByID,
//     getRecipeIngredientsByID: getRecipeIngredientsByID,
//     getRecipePreviewByData: getRecipePreviewByData,
//     getRandomRecipeData: getRandomRecipeData,
// }