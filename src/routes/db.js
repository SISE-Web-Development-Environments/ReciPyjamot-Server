const express = require("express");
const router = express.Router();
const { dbHandlers } = require("../handlers");

router.post("/addRecipe", dbHandlers.addRecipe);

router.get("/getRecipe/:id", dbHandlers.getRecipe);

router.get("/getUser/:id", dbHandlers.getUser);

module.exports = router;
