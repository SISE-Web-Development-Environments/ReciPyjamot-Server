const getUserHandler = require("./getUser");
const userLastSearch = require("./userLastSearch");

module.exports = {
  userHandlers: {
    getUser: getUserHandler,
    search: userLastSearch,
  },
  recipes: {},
};
