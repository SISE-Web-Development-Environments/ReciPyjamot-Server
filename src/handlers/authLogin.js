const {login} = require("../shared");
const authLoginHandler = async (req, res, next) => {
  try{
    const ans = await login(req.body.username,req.body.password);
    res.send({
      permission: ans,
      massage: ans?"permission approved":"permission denied"
    })
  }catch(err){
    console.log("error authenticating username and password")
    res.send({
      permission: false,
      massage: "error during user authentication: "+err.message
    })
  }
};

module.exports = authLoginHandler;
