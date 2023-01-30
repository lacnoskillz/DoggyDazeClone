const { Review } = require('../models');

const reviewData = [
  {
    id: 1,
    restaurant_id: 1,
    user_id: 1
  },
  {
    id: 2,
    restaurant_id: 2,
    user_id: 2
  },
  {
    id: 3,
    restaurant_id: 3,
    user_id: 3
  },
  {
    id: 4,
    restaurant_id: 4,
    user_id: 4
  },
  {
    id: 5,
    restaurant_id: 5,
    user_id: 5
  },
];

const seedProducts = () => Review.bulkCreate(reviewData);

module.exports = seedProducts;
