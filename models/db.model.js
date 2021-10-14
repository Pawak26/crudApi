//const dbconfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("udemy", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user.model.js")(sequelize, Sequelize);

module.exports = db;
