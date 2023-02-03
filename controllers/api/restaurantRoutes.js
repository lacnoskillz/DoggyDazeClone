const router = require('express').Router();
const { Restaurant } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    try {
      const newRestaurant = await Restaurant.create({
        ...req.body,
        user_id: req.session.user_id,
  
      });
  
      res.status(200).json(newRestaurant);
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;