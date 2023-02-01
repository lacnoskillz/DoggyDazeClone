const { Review } = require('../models');

const reviewData = [
  {
    id: 1,
    rating: 1,
    description: "This restaurant was so lovely. They have a full doggy menu.",
    restaurant_id: 1,
    user_id: 1
  },
  {
    id: 2,
    rating: 2,
    description: "This restaurant was so lovely. They have a full doggy menu.",
    restaurant_id: 2,
    user_id: 2
  },
  {
    id: 3,
    rating: 3,
    description: "This restaurant was so lovely. They have a full doggy menu.",
    restaurant_id: 3,
    user_id: 3
  },
  {
    id: 4,
    rating: 4,
    description: "This restaurant was so lovely. They have a full doggy menu.",
    restaurant_id: 4,
    user_id: 4
  },
  {
    id: 5,
    rating: 5,
    description: "This restaurant was so lovely. They have a full doggy menu.",
    restaurant_id: 5,
    user_id: 5
  },
];

const seedProducts = () => Review.bulkCreate(reviewData);

module.exports = seedProducts;
