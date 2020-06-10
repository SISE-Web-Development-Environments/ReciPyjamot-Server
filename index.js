require("dotenv").config();
const express = require("express");
const path = require("path");
const logger = require("morgan");
const routes = require("./src/routes");
const middlewares = require("./src/middleware");
const app = express();
const dbSequelize = require("./src/db/dbSequelize");
const testTheUtils = require("./src/shared/utils");
middlewares(app);
app.use(logger("dev")); // logger

app.use(express.json()); // parse application/json

app.use(routes);
dbSequelize(app);
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "public"))); // To serve static files such as images, CSS files, and JavaScript files
// for testing
// test();

const port = process.env.PORT || "3000";

const server = app.listen(port, () => {
  // console.log(`Server listen on port ${port}`);
});

process.on("SIGINT", () => {
  if (server) {
    server.close(/* () => console.log("server closed")*/);
  }
  process.exit();
});
async function test() {
  // const db = require("./src/db/DButils");
  //  // // testing fav/unfav functions WORKS
  //  // // insert w/o favorite
  //  await db.execQuery(`INSERT INTO vieweds (userId, recipeId, favorite,createdAt,updatedAt)
  //  VALUES ('2','1234','0','2020-06-06T19:16:29.0940000+00:00','2020-06-06T19:16:29.0940000+00:00'); `)

  // await db.execQuery(`delete from vieweds WHERE userId = '2' and recipeId = '1234'`)

  //console.log("first we try to fav");
  //console.log(await testTheUtils.favorite("2", "223509"));
  // console.log("first we try to fav again (should fail)")
  // console.log(await testTheUtils.favorite("2","1234"))
  // console.log("and then we try to unfav")
  // console.log(await testTheUtils.unfavorite("2","1234"))
  // console.log("and then we try to unfav again (should fail)")
  // console.log(await testTheUtils.unfavorite("2","1234"))

  // console.log("trying to view recipe (should fail)")
  // console.log(await testTheUtils.view("2","1234"))
}
