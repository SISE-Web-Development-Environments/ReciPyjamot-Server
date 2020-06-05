const express = require("express");
const router = express.Router();
const { authenticationHandlers } = require("../handlers");

router.post("/Register", authenticationHandlers.register);

router.post("/Login", authenticationHandlers.login);

module.exports = router;
