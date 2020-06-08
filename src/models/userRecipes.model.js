module.exports = (sequelize, Sequelize) => {
  const UserRecipe = sequelize.define("usersRecipes", {
    relation: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return UserRecipe;
};
