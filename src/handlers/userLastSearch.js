const userLastSearchHandler = async (req, res, next) => {
  const db = req.app.db;
  const id = req.params.userId;
  // get from db
  const lastSearch = await db.usersRecipes.find({
    where: { userId: id },
    raw: true,
  });
  const lastSearchObj = lastSearch.map(({ lastSearch }) => lastSearch);
  // return value
  res.json(lastSearchObj);
};

module.exports = userLastSearchHandler;
