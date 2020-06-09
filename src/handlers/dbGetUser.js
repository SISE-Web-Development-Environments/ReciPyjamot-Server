const getUserHandler = async (req, res, next) => {
  const db = req.app.db;
  const id = req.params.userId;
  // get from db
  const user = await db.users.find({
    where: { userId: id },
  });
  // return value
  res.json(user);
};
module.exports = getUserHandler;
