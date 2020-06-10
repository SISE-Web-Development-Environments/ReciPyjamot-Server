const axios = require("axios");
const db = require("../db/dbUtils");
const crypto = require("crypto-js");

const apiDomain = "https://api.spoonacular.com";

const getRecipeInfoByID = (id) => {
  // for information https://api.spoonacular.com//${id}/information
  return axios.get(`${apiDomain}/recipes/${id}/information`, {
    params: {
      includeNutrition: true,
      apiKey: process.env.spooncular_apiKey,
    },
  });
};
const getRecipeInstructionsByID = (id) => {
  // for instructions https://api.spoonacular.com/recipes/{id}/analyzedInstructions
  return axios.get(`${apiDomain}/recipes/${id}/analyzedInstructions`, {
    params: {
      includeNutrition: false,
      apiKey: process.env.spooncular_apiKey,
    },
  });
};
const getRecipeIngredientsByID = (id) => {
  // for ingredients https://api.spoonacular.com/recipes/{id}/ingredientWidget.json
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
  const passwordSHA = crypto.SHA256(registerRequest.body.password);
  const {
    username,
    first_name,
    last_name,
    country,
    password = passwordSHA,
    confirmation_password,
    email,
    image,
  } = registerRequest.body;
  if (await isUsernameTaken(username)) {
    return false;
  }
  if (password != confirmation_password) {
    return false;
  }
  const query = `INSERT INTO [dbo].[users]
  ([USERNAME], [FIRSTNAME], [LASTNAME], [COUNTRY], [PASSWORD], [EMAIL] ,[IMAGE])
  VALUES
  ('${username}', '${first_name}', '${last_name}', '${country}', '${password}', '${email}', '${image}')`;
  await db.execQuery(query);
  return true;
};
// -------------------------favorite and viewed
const viewRecipe = async (userId,recipeId) => {
  const viewed = await isViewedByUser(userId,recipeId);
  if(!viewed){
    await db.execQuery(`INSERT INTO vieweds (userId, recipeId, favorite,createdAt,updatedAt)
    VALUES (${userId},${recipeId},'0','${getNow()}','${getNow()}'); `) 
    return {answer: true, message: `recipe with ID: '${recipeId}' is now viewed by user with ID: '${userId}'`}
  }
  return {answer: false, message: `recipe with ID: '${recipeId}' was already viewed by user with ID: '${userId}'`}
}
const unfavoriteRecipeByUser = async (userId,recipeId) => {
  const isFavorated =  await isFavoratedByUser(userId,recipeId);
  if(isFavorated==false)
    return {answer: false, message: `recipe with ID: '${recipeId}' isn't favorited by user with ID: '${userId}'`}
  else await db.execQuery(`update vieweds set favorite='0' WHERE userId = '${userId}' and recipeId = '${recipeId}'`)
  return {answer: true, message: `successfuly unfavorited recipe with ID: '${recipeId}' by user with ID: '${userId}'`}
}
const favoriteRecipeByUser = async (userId,recipeId) => {
  const isViewed = await isViewedByUser(userId,recipeId);
  if(!isViewed){
    const query = `INSERT INTO vieweds (userId, recipeId, favorite,createdAt,updatedAt)
    VALUES ('${userId}','${recipeId}','1','${getNow()}','${getNow()}'); `;
    await db.execQuery(query)
      return {answer: true, message: `successfuly favorited recipe with ID: '${recipeId}' by user with ID: '${userId}'`}
    }
  const isFavorated =  await isFavoratedByUser(userId,recipeId);
  if(isFavorated)
    return {answer: false, message: `recipe with ID: '${recipeId}' already favorited by user with ID: '${userId}'`}
  else await db.execQuery(`update vieweds set favorite='1' WHERE userId = '${userId}' and recipeId = '${recipeId}'`)
  return {answer: true, message: `successfuly favorited recipe with ID: '${recipeId}' by user with ID: '${userId}'`}
}
// private functions
const authenticate = async (username, password) => {
  let passwordDB = await db.execQuery(
    `select password from users where username = '${username}'`
  );
  passwordDB = passwordDB[0].password;
  const hashPassword = await crpto.SHA256(password);
  return hashPassword == passwordDB;
};
const isUsernameTaken = async (username) => {
  const users = await db.execQuery(
    `select username from users where username = '${username}'`
  );
  return users.length != 0;
};
const isFavoratedByUser = async (userId,recipeId) => {
  const record =  await db.execQuery(`select favorite from vieweds where userId = '${userId}' and recipeId = '${recipeId}'`);
  if(record.length==0)// which means that the recipe hasn't even been viewed by the user
    return false; 
  else return record[0].favorite;
}
const isViewedByUser = async (userId,recipeId) => {
  const record =  await db.execQuery(`select favorite from vieweds where userId = '${userId}' and recipeId = '${recipeId}'`);
  if(record.length==0)// which means that the recipe hasn't been viewed by the user
    return false; 
  else return true;
}
// place holder function
const getNow = () => {
  return `2020-06-06T19:16:29.0940000+00:00`;
}
module.exports = {
  getRecipeInfoByID: getRecipeInfoByID,
  getRecipeInstructionsByID: getRecipeInstructionsByID,
  getRecipeIngredientsByID: getRecipeIngredientsByID,
  getRecipePreviewByData: getRecipePreviewByData,
  getRandomRecipeData: getRandomRecipeData,
  register: registerInDB,
  login: login,
  favorite: favoriteRecipeByUser,
  isFavorite: isFavoratedByUser,
  unfavorite: unfavoriteRecipeByUser,
  view: viewRecipe,
  isViewed: isViewedByUser
};
