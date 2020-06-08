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
        enableArithAbort: true,
      },
    },
  }
);
module.exports = async (app, recreateTables = false) => {
  const db = {};

  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  db.recipes = require("../models/recipe.model")(sequelize, Sequelize);
  db.users = require("../models/user.model")(sequelize, Sequelize);
  db.usersRecipes = require("../models/userRecipes.model")(
    sequelize,
    Sequelize
  );
  db.viewed = require("../models/viewed.model")(sequelize, Sequelize);

  db.recipes.belongsToMany(db.users, { through: db.usersRecipes });
  db.users.belongsToMany(db.recipes, { through: db.usersRecipes });
  db.usersRecipes.hasOne(db.recipes, { as: "recipe", foreignKey: "id" });
  db.usersRecipes.hasOne(db.users, { as: "user", foreignKey: "id" });

  if (recreateTables) {
    await sequelize.sync({ force: true });
  }
  app.db = db;
};
