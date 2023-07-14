const { User } = require('../models');

const userData = [
  {
    id: 1,
    name: "Goose Bean",
    email: "1234@gmail.com",
    password: "password12345"
  },
  {
    id: 2,
    name: "Duck Butt",
    email: "12345@gmail.com",
    password: "password12345"
  },
  {
    id: 3,
    name: "Whiskey Peets",
    email: "123456@gmail.com",
    password: "password12345"
  },
  {
    id: 4,
    name: "Gavin Belson",
    email: "1234567@gmail.com",
    password: "password12345"
  },
  {
    id: 5,
    name: "Bruce Tubi",
    email: "12345678@gmail.com",
    password: "password12345"
  },
];

const seedProducts = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedProducts;
