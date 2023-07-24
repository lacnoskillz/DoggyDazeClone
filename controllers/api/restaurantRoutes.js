const router = require('express').Router();
const { Restaurant } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const { restaurant_name } = req.body;
    const userId = req.session.user_id;
    console.log('Received restaurant_name:', restaurant_name);
    // Check if the restaurant with the same name already exists for the logged-in user
    const existingRestaurant = await Restaurant.findOne({
      where: {
       
        restaurant_name: restaurant_name,
      },
    });

    if (existingRestaurant) {
      // Return an error response indicating that the restaurant already exists
      return res.status(409).json({ message: 'Restaurant already exists. Cannot add the same restaurant multiple times.' });
    }

    // Create the new restaurant
    const newRestaurant = await Restaurant.create({
      restaurant_name,

    });

    res.status(200).json(newRestaurant);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;