module.exports = (sequelize, Sequelize) => {
  const Viewed = sequelize.define("viewed", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "users",
        key: "id",
      },
      //   references: "users",
      //   referencesKey: "id",
    },
    recipeId: {
      // spoonacular recipe id only
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    favorite: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  });
  return Viewed;
};
