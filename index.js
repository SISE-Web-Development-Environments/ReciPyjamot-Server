require("dotenv").config();
const express = require("express");
const path = require("path");
const logger = require("morgan");
const routes = require("./src/routes");
const middlewares = require("./src/middleware");
const app = express();
const db = require("./src/db/DButils");

middlewares(app);
app.use(logger("dev")); // logger

app.use(express.json()); // parse application/json

app.use(routes);
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "public"))); // To serve static files such as images, CSS files, and JavaScript files

const newRecipe = {
  preview: {
    image: "string",
    title: "string",
    readyInMinutes: 0,
    likes: 0,
    vegan: true,
    glutenFree: true,
    viewed: true,
    favorite: true,
  },
  ingredients: [
    {
      name: "pepper",
      value: 0,
      units: "grams",
    },
  ],
  instructions: ["mix the eggs with the milk"],
  servings: 4,
};

const recipeString = JSON.stringify(newRecipe);
app.get("/testDB2", async () => {
  await db.execQuery(
    `INSERT INTO [dbo].[recipes] ([INFO]) VALUES('${recipeString}')`
  );
});
app.get("/testDB3", async () => {
  const users = await db.execQuery(
    "select username from users where username = '4'"
  );
  console.log(users);
});

app.get("/testDB", async () => {
  const users = await db.execQuery("select INFO from recipes");
  console.log(users);
});

const port = process.env.PORT || "3000";

const server = app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});

process.on("SIGINT", () => {
  if (server) {
    server.close(() => console.log("server closed"));
  }
  process.exit();
});
