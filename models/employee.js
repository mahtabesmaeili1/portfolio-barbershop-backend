"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      employee.belongsToMany(models.customer, {
        through: "appointments",
        foreignKey: "employeeId",
      });
    }
  }
  employee.init(
    {
      fullName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      password: DataTypes.STRING,
      phoneNumber: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "employee",
    }
  );
  return employee;
};
