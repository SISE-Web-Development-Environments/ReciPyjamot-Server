const express = require("express");
const userRouter = require("../routes/user");
const authRouter = require("../routes/auth");
const recipesRouter = require("../routes/recipes");
const dbRouter = require("../routes/db");

const mainRouter = express.Router();

mainRouter.use("/recipes", recipesRouter);
mainRouter.use("/auth", authRouter);
mainRouter.use("/user/:userId", userRouter);
mainRouter.use("/db", dbRouter);

module.exports = mainRouter;
