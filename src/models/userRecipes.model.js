module.exports = (sequelize, Sequelize) => {
  const UserRecipe = sequelize.define("usersRecipes", {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    recipeId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    relation: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return UserRecipe;
};
