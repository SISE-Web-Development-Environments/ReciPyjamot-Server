const {register} = require("../shared");

const authRegisterHandler = async (req, res, next) => {
  try{
    const ans = await register(req);
    res.send({
      permission: ans,
      massage: ans?"registration approved":"registration denied"
    })
  }catch(err){
    console.log("error registratering user")
    res.send({
      permission: false,
      massage: "error during user registration: "+err.message
    })
  }
};

module.exports = authRegisterHandler;
