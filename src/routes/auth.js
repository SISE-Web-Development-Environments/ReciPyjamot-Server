const express = require("express");
const router = express.Router();
const { authenticationHandlers } = require("../handlers");

const session = require("client-sessions");

const setSession = () =>
  session({
    cookieName: "session", // the cookie key name
    secret: process.env.COOKIE_SECRET, // the encryption key
    duration: 20 * 60 * 1000, // expired after 20 sec
    activeDuration: 0, // if expiresIn < activeDuration,
    // the session will be extended by activeDuration milliseconds
  });
router.post("/Register", authenticationHandlers.register);

router.post("/Login", authenticationHandlers.login, setSession());

module.exports = router;
