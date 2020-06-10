const errorMiddleware = require("./errorMiddleware");
const appMiddleware = (app) => {
  app.use(errorMiddleware);
};

module.exports = appMiddleware;
