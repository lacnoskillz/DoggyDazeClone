const { Restaurant } = require('../models');

const restaurantData = [
  {
    id: 1,
    restaurant_name: "boilesun",
    rating: 4
  },
  {
    id: 2,
    restaurant_name: 2,
    rating: 2
  },
  {
    id: 3,
    restaurant_name: 3,
    rating: 3
  },
  {
    id: 4,
    restaurant_name: 4,
    rating: 4
  },
  {
    id: 5,
    restaurant_name: 5,
    rating: 5
  },
];

const seedProducts = () => Restaurant.bulkCreate(restaurantData);

module.exports = seedProducts;
