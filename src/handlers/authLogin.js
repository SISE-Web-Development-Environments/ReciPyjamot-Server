const { login } = require("../shared");

const authLoginHandler = async (req, res, next) => {
  const userId = await login(req.body.username, req.body.password);
  if (userId) {
    next();
    req.session.user_id = userId;
    res.json({ result: "success" });
    return;
  }
  next(new Error("error authenticating username and password"));
};

module.exports = authLoginHandler;
