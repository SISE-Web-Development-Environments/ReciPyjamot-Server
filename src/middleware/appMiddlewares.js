const sessionMiddleware = require("./session");
const appMiddleware = (app) => {
  app.use(sessionMiddleware);
  // app.use(logger("dev")); // logger
};

module.exports = appMiddleware;
