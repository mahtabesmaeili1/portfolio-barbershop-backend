"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      appointment.belongsTo(models.user);
      appointment.belongsTo(models.service);
    }
  }
  appointment.init(
    {
      date: { type: DataTypes.DATEONLY, allowNull: false },
      time: { type: DataTypes.STRING, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      serviceId: { type: DataTypes.INTEGER, allowNull: false },
      done: { type: DataTypes.BOOLEAN },
      paid: { type: DataTypes.BOOLEAN },
    },
    {
      sequelize,
      modelName: "appointment",
    }
  );
  return appointment;
};
