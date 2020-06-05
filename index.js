require("dotenv").config();
const express = require("express");
const path = require("path");
const logger = require("morgan");
const routes = require("./src/routes");
const middlewares = require("./src/middleware");
const app = express();
const db = require("./db/DButils")

middlewares(app);
app.use(logger("dev")); // logger

app.use(express.json()); // parse application/json

app.use(routes);
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "public"))); // To serve static files such as images, CSS files, and JavaScript files
app.get("/testDB",async ()=>{
  const users = await db.execQuery("select username from users where username = '4'")
  console.log(users);
})
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
