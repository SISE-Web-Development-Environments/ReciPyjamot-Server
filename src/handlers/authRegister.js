const { register } = require("../shared");

const authRegisterHandler = async (req, res, next) => {
  try {
    const ans = await register(req);
    if(ans){
      res.status(201).send("successfull registration new user created");
    }
    else{
      res.status(400).send("bad request");
    }
  } catch (err) {
    res.status(400).send("bad request");
  }
};

module.exports = authRegisterHandler;
