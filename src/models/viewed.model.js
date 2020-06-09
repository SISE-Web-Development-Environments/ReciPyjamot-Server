module.exports = (sequelize, Sequelize) => {
  const Viewed = sequelize.define("viewed", {
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
