module.exports = (sequelize, Sequelize) => {
  const Recipe = sequelize.define("recipes", {
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
      type: Sequelize.TEXT,
      allowNull: false,
      get: function () {
        return JSON.parse(this.getDataValue("ingredients"));
      },
      set: function (val) {
        return this.setDataValue("ingredients", JSON.stringify(val));
      },
    },
    instructions: {
      type: Sequelize.TEXT,
      allowNull: false,
      get: function () {
        return JSON.parse(this.getDataValue("instructions"));
      },
      set: function (val) {
        return this.setDataValue("instructions", JSON.stringify(val));
      },
    },
    servings: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    family: {
      type: Sequelize.STRING,
      allowNull: true,
      get: function () {
        return (
          (this.getDataValue("family") &&
            JSON.parse(this.getDataValue("family"))) ||
          null
        );
      },
      set: function (val) {
        return this.setDataValue("family", JSON.stringify(val));
      },
    },
  });
  return Recipe;
};
