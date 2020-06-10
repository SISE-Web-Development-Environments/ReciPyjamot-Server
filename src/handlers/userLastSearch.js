const userLastSearchHandler = async (req, res, next) => {
  try{
  const db = req.app.db;
  const id = req.params.userId;
  // get from db
  const lastSearch = await db.usersRecipes.find({
    where: { userId: id },
    raw: true,
  });
  const lastSearchObj = lastSearch.map(({ lastSearch }) => lastSearch);
  // return value
  res.status(200).json(lastSearchObj);
  }catch(err){
    res.status(400).send("bad request "+err)
  }
};

module.exports = userLastSearchHandler;
