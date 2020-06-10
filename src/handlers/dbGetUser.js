const getUserHandler = async (req, res, next) => {
  try{
  const db = req.app.db;
  const id = req.params.userId;
  // get from db
  const user = await db.users.find({
    where: { userId: id },
  });
  // return value
  res.status(200).json(user);
  }catch(err){
    res.status(400).send('bad request '+err);
  }
};
module.exports = getUserHandler;
