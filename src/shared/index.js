const getRecipeInfoByID = require('./utils');
const getRecipeInstructionsByID = require('./utils');
const getRecipeIngredientsByID = require('./utils');
const getRecipePreviewByData = require('./utils');
const getRandomRecipeData = require('./utils');

module.exports = {
    getRecipeInfoByID: getRecipeInfoByID,
    getRecipeInstructionsByID: getRecipeInstructionsByID,
    getRecipeIngredientsByID: getRecipeIngredientsByID,
    getRecipePreviewByData: getRecipePreviewByData,
    getRandomRecipeData: getRandomRecipeData,
}
