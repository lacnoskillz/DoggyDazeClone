const { User } = require('../models');

const userData = [
  {
    id: 1,
    user_name: "Goose Bean",
  },
  {
    id: 2,
    user_name: "Duck Butt",
  },
  {
    id: 3,
    user_name: "Whiskey Peets",
  },
  {
    id: 4,
    user_name: "Gavin Belson",
  },
  {
    id: 5,
    user_name: "Bruce Tubi",
  },
];

const seedProducts = () => User.bulkCreate(userData);

module.exports = seedProducts;
