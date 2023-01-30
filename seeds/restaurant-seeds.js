const { Restaurant } = require('../models');

const restaurantData = [
  {
    id: 1,
    restaurant_name: "Burleson",
    rating: 4
  },
  {
    id: 2,
    restaurant_name: "Velvet taco",
    rating: 2
  },
  {
    id: 3,
    restaurant_name: "Hooters",
    rating: 3
  },
  {
    id: 4,
    restaurant_name: "Hops N Hounds",
    rating: 4
  },
  {
    id: 5,
    restaurant_name: "Rumble",
    rating: 5
  },
];

const seedProducts = () => Restaurant.bulkCreate(restaurantData);

module.exports = seedProducts;
