const express = require("express");
const userRouter = require("../routes/user");
const authRouter = require("../routes/auth");
const recipesRouter = require("../routes/recipes");

const mainRouter = express.Router();

mainRouter.use("/recipes", recipesRouter);
mainRouter.use("/auth", authRouter);
mainRouter.use("/user/:username", userRouter);

module.exports = mainRouter;
