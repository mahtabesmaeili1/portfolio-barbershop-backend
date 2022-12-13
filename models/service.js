"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      service.hasMany(models.appointment, {
        foreignKey: "serviceId",
      });
    }
  }
  service.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "service",
    }
  );
  return service;
};
