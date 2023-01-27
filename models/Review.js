// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');
const Restaurant = require('./Restaurant');
const User = require('./User');

// Initialize Review model (table) by extending off Sequelize's Model class
class Review extends Model { }

// set up fields and rules for Review model
Review.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      //References the Restaurant model's id.
      references: {
        model: Restaurant,
        key: 'id'
      }
    },
    user_id: {
        type: DataTypes.INTEGER,
        //References the User model's id.
        references: {
          model: User,
          key: 'id'
        }
      },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'review',
  }
);

module.exports = Review;
