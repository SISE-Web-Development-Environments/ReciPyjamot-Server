const express = require("express");
const router = express.Router({ mergeParams: true });
const { userHandlers } = require("../handlers");

// The last search the user did
router.get("/search", userHandlers.search);

// The user family recipes page
router.get("/family", userHandlers.family);

// The user favorite recipes page
router.get("/favorite", userHandlers.favorite);

// The user last three watched recipes
router.get("/lastWatched", userHandlers.lastWatched);

// The user personal recipes page
router.get("/", userHandlers.personal);

module.exports = router;
