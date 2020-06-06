module.exports = (sequelize, Sequelize) => {
  const UserRecipe = sequelize.define("usersRecipes", {
    userId: {
      type: Sequelize.INTEGER,
      // allowNull: false,
      primaryKey: true,
      // references: {
      //   key: "id",
      //   model: "users",
      // },
      // references: "users",
      // referencesKey: "id",
    },
    recipeId: {
      type: Sequelize.INTEGER,
      // allowNull: false,
      primaryKey: true,
      // references: {
      //   key: "id",
      //   model: "recipes",
      // },
      // references: "recipes",
      // referencesKey: "id",
    },
    relation: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return UserRecipe;
};
