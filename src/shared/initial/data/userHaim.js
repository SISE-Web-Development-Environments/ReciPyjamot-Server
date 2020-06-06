const crypto = require("crypto-js");

const userHaim = {
  username: "HaimReyes",
  firstName: "Haim",
  lastName: "Reyes",
  country: "Israel",
  password: crypto.SHA256("67891").toString(),
  email: "reyes@post.bgu.ac.il",
  image:
    "https://ewscripps.brightspotcdn.com/74/8a/b8272ed446d5b12323d2c14c5401/denver-7-picasso-6.jpg",
};

module.exports = userHaim;
