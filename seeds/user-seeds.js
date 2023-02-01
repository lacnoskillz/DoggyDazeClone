const { User } = require('../models');

const userData = [
  {
    id: 1,
    user_name: "Goose Bean",
    email: "1234@gmail.com",
    password: "password12345"
  },
  {
    id: 2,
    user_name: "Duck Butt",
    email: "12345@gmail.com",
    password: "password12345"
  },
  {
    id: 3,
    user_name: "Whiskey Peets",
    email: "123456@gmail.com",
    password: "password12345"
  },
  {
    id: 4,
    user_name: "Gavin Belson",
    email: "1234567@gmail.com",
    password: "password12345"
  },
  {
    id: 5,
    user_name: "Bruce Tubi",
    email: "12345678@gmail.com",
    password: "password12345"
  },
];

const seedProducts = () => User.bulkCreate(userData);

module.exports = seedProducts;
