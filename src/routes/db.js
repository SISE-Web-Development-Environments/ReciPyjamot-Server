const express = require("express");
const router = express.Router();
const { dbHandlers } = require("../handlers");

router.get("/getRecipe/:id", dbHandlers.getRecipe);

router.get("/getUser/:id", dbHandlers.getUser);

module.exports = router;
