const axios = require("axios");
const db = require("../db/DButils");
const apiDomain = "https://api.spoonacular.com";

const getRecipeInfoByID = (id) => {
  // for information https://api.spoonacular.com//${id}/information
  console.log(`requesting: ${apiDomain}/recipes/${id}/information`);
  return axios.get(`${apiDomain}/recipes/${id}/information`, {
    params: {
      includeNutrition: true,
      apiKey: process.env.spooncular_apiKey,
    },
  });
};
const getRecipeInstructionsByID = (id) => {
  // for instrunctions https://api.spoonacular.com/recipes/{id}/analyzedInstructions
  console.log(`requesting: ${apiDomain}/recipes/${id}/analyzedInstructions`);
  return axios.get(`${apiDomain}/recipes/${id}/analyzedInstructions`, {
    params: {
      includeNutrition: false,
      apiKey: process.env.spooncular_apiKey,
    },
  });
};
const getRecipeIngredientsByID = (id) => {
  // for ingredients https://api.spoonacular.com/recipes/{id}/ingredientWidget.json
  console.log(`requesting: ${apiDomain}/recipes/${id}/ingredientWidget.json`);
  return axios.get(`${apiDomain}/recipes/${id}/ingredientWidget.json`, {
    params: {
      includeNutrition: false,
      apiKey: process.env.spooncular_apiKey,
    },
  });
};
const getRecipePreviewByData = (infoAPIData) => {
  // extracts relevant data from information in request https://api.spoonacular.com//${id}/information
  const preview = {
    id: infoAPIData.id,
    image: infoAPIData.image,
    title: infoAPIData.title,
    readyInMinutes: infoAPIData.readyInMinutes,
    likes: infoAPIData.likes,
    vegan: infoAPIData.vegan,
    glutenFree: infoAPIData.glutenFree,
    viewed: infoAPIData.viewed, // TODO get from user
    favorite: infoAPIData.favorite, // TODO get from user
  };
  return preview;
};
const getRandomRecipeData = (count) => {
  // for ingredients // for random recipes https://api.spoonacular.com/recipes/random?number=count
  console.log(`requesting: ${apiDomain}/recipes/random?number=${count}`);
  return axios.get(`${apiDomain}/recipes/random?number=${count}`, {
    params: {
      includeNutrition: false,
      apiKey: process.env.spooncular_apiKey,
    },
  });
};
// -----------------------------------------------------------------
const login = async (username, password) => {
  return isUsernameTaken(username) && authenticate(username, password);
};
const registerInDB = async (registerRequest) => {
  console.log(`extracting registration info from request`);
  const {
    username,
    first_name,
    last_name,
    country,
    password,
    confirmation_password,
    email,
    image,
  } = registerRequest;
  if (isUsernameTaken(username)) {
    console.log(`username ${username} is taken`);
    return false;
  }
  if (password != confirmation_password) {
    console.log(`confirmation password does not match password`);
    return false;
  }
  await db.execQuery(`
  INSERT INTO [dbo].[users]
    ([USERNAME], [FIRSTNAME], [LASTNAME], [COUNTRY], [PASSWORD], [EMAIL] ,[IMAGE])
    VALUES
    ('${username}', '${first_name}', '${last_name}', '${country}', HASHBYTES('SHA2_256', '${password}'), '${email}', '${image}')
    GO `);
  return true;
};
// private functions
const authenticate = async (username, password) => {
  const passwordDB = await db.execQuery(
    `select password from users where username = '${username}'`
  );
  return password == passwordDB;
};
const isUsernameTaken = async (username) => {
  const users = await db.execQuery(
    `select username from users where username = '${username}'`
  );
  return users.length != 0;
};

module.exports = {
  getRecipeInfoByID: getRecipeInfoByID,
  getRecipeInstructionsByID: getRecipeInstructionsByID,
  getRecipeIngredientsByID: getRecipeIngredientsByID,
  getRecipePreviewByData: getRecipePreviewByData,
  getRandomRecipeData: getRandomRecipeData,
  register: registerInDB,
  login: login,
};
