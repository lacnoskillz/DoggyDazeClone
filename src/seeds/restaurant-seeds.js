const { Restaurant } = require('../models');

const restaurantData = [
  {
    id: 1,
    restaurant_name: "Burleson"
  },
  {
    id: 2,
    restaurant_name: "Velvet taco"
  },
  {
    id: 3,
    restaurant_name: "Hooters"
  },
  {
    id: 4,
    restaurant_name: "Hops N Hounds"
  },
  {
    id: 5,
    restaurant_name: "Rumble"
  },
];

const seedProducts = () => Restaurant.bulkCreate(restaurantData);

module.exports = seedProducts;
