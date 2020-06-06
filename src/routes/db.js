const express = require("express");
const router = express.Router();
const { dbHandlers } = require("../handlers");

app.get("/addRecipe/:id", dbHandlers.addRecipe);

app.get("/getRecipe/:id", dbHandlers.getRecipe);

app.get("/getUser/:id", dbHandlers.getUser);

module.exports = router;
