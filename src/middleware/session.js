const session = require("client-sessions");

const sessionMiddleware = (req, res, next) => {
  session({
    cookieName: "session", // the cookie key name
    secret: process.env.COOKIE_SECRET, // the encryption key
    duration: 20 * 60 * 1000, // expired after 20 sec
    activeDuration: 0, // if expiresIn < activeDuration,
    // the session will be extended by activeDuration milliseconds
  });
  next();
};
module.exports = sessionMiddleware;
