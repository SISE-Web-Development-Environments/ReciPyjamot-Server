const crypto = require("crypto-js");

const userSapir = {
  username: "SapirShamay",
  firstName: "Sapir",
  lastName: "Shamay",
  country: "Israel",
  password: crypto.SHA256("12345").toString(),
  email: "sapirnag@post.bgu.ac.il",
  image:
    "https://www.impel.eu/wp-content/uploads/2019/08/mediterranean-sea.jpg",
};

module.exports = userSapir;
