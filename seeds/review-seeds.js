const { Review } = require('../models');

const reviewData = [
  {
    rating: 1,
    description: "This restaurant was so lovely. They have a full doggy menu.",
    amenities: "checkbox",
    restaurant_id: 1,
    user_id: 1
  },
  {
    rating: 4,
    description: "This restaurant was so lovely. They have a full doggy menu.",
    amenities: "checkbox",
    restaurant_id: 1,
    user_id: 2
  },
  {
    rating: 9,
    description: "This restaurant was so lovely. They have a full doggy menu.",
    amenities: "checkbox",
    restaurant_id: 1,
    user_id: 3
  },
  {
    rating: 2,
    description: "This restaurant was so lovely. They have a full doggy menu.",
    amenities: "checkbox",
    restaurant_id: 2,
    user_id: 2
  },
  {
    rating: 3,
    description: "This restaurant was so lovely. They have a full doggy menu.",
    amenities: "checkbox",
    restaurant_id: 3,
    user_id: 3
  },
  {
    rating: 4,
    description: "This restaurant was so lovely. They have a full doggy menu.",
    amenities: "checkbox",
    restaurant_id: 4,
    user_id: 4
  },
  {
    rating: 5,
    description: "This restaurant was so lovely. They have a full doggy menu.",
    amenities: "checkbox",
    restaurant_id: 5,
    user_id: 5
  },
];

const seedProducts = () => Review.bulkCreate(reviewData);

module.exports = seedProducts;
