const Sequelize = require("sequelize");
const DataTypes = Sequelize;
module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define("users", {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
    },
  });
  return user;
};
