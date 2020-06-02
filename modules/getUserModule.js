const db = require("../testDB/db");

function getUser(id) {
  return new Promise((resolve, reject) => {
    let user = db.users.find((x) => x.userId == id);
    if (user) resolve(user);
    else reject(new Error("user not found"));
  });
}

getUser(10)
  .then((user) => getInterests(user.userId))
  .then((interests) => getLocation(interests.interests[0]))
  .then((location) => console.log(location))
  .catch((error) => console.log(error.message));

  function getInterests(id){

    return new Promise((res,rej)=>{

      let interests = db.interests.find((x)=>x.userId==id);
      if(interests) res(interests);
      else rej(new Error("interests not found"));
    });

  }
  function getLocation(interest){

    return new Promise((res,rej)=>{

      let location = db.locations.find((x)=>x.interest==interest);
      if(location) res(location);
      else rej(new Error("location not found"));
    });

  }