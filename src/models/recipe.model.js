module.exports = (sequelize, Sequelize) => {
  const Recipe = sequelize.define("recipes", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    readyInMinutes: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    likes: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    vegan: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    glutenFree: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    viewed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    favorite: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
      get: function () {
        return JSON.parse(this.getDataValue("ingredients"));
      },
      set: function (val) {
        return this.setDataValue("ingredients", JSON.stringify(val));
      },
    },
    instructions: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
    servings: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return Recipe;
};
