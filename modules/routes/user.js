const express = require('express');

const router = express.Router();
const DButils = require('../../db/DButils');

// #region cookie middleware
router.use((req, res, next) => {
  if (req.session && req.session.user_id) {
    DButils.execQuery('SELECT user_id FROM users')
      .then((users) => {
        if (users.find((x) => x.user_id === req.session.user_id)) {
          req.user_id = req.session.user_id;
        }
        next();
      })
      .catch((error) => next());
  } else {
    next();
  }
});
// #endregion

router.get('/search', async (req, res, next) => {});

router.get('/family', async (req, res, next) => {});

router.get('/favorites', async (req, res, next) => {});

router.get('/latest', async (req, res, next) => {});

router.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send({ message: err.message, success: false });
});

module.exports = router;
