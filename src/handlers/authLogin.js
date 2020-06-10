const {login} = require("../shared");
const authLoginHandler = async (req, res, next) => {
  try{
    const ans = await login(req.body.username,req.body.password);
    if(ans){
      res.status(200).send('succesful login');
    }
  }catch(err){
    console.log("error authenticating username and password")
    res.status(400).send('bad request '+err);
  }
};

module.exports = authLoginHandler;
