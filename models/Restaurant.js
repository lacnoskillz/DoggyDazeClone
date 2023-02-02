const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Restaurant extends Model { }

Restaurant.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    restaurant_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'restaurant'
  }
);

module.exports = Restaurant;
