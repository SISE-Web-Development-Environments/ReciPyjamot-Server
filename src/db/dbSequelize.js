const Sequelize = require("sequelize");
const dbConfig = require("./dbConfig");

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.server,
    dialect: "mssql",
    dialectOptions: {
      options: {
        encrypt: true,
      },
    },
    operatorsAliases: false,
  }
);
module.exports = async (app) => {
  const db = {};

  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  db.recipes = require("../models/recipe.model")(sequelize, Sequelize);

  await sequelize.sync({ force: true });
  app.db = db;
};
