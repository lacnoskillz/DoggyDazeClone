const { User } = require('../models');

const userData = [
  {
    id: 1,
    user_name: "Goose Bean",
    email: "123@gmail.com"
  },
  {
    id: 2,
    user_name: "Duck Butt",
    email: "123@gmail.com"
  },
  {
    id: 3,
    user_name: "Whiskey Peets",
    email: "123@gmail.com"
  },
  {
    id: 4,
    user_name: "Gavin Belson",
    email: "123@gmail.com"
  },
  {
    id: 5,
    user_name: "Bruce Tubi",
    email: "123@gmail.com"
  },
];

const seedProducts = () => User.bulkCreate(userData);

module.exports = seedProducts;
