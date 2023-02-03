const router = require('express').Router();
const { Restaurant, User, Review } = require('../models');
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const restaurantData = await Restaurant.findAll({
      include: [{ model: Review }],
      attributes: {
        include: [
          [
            sequelize.literal(
              '(SELECT ROUND(AVG(rating),1) AS averageRating FROM reviews WHERE reviews.restaurant_id = restaurant.id)'
            ),
            'averageRating',
          ],
        ],
      },
    });

    const restaurants = restaurantData.map((restaurant) => restaurant.get({ plain: true }));
    res.render('homepage', {
      restaurants
    });
    //res.status(200).json(restaurantData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', async (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Review, include: [{model: User}] }],
      include: [{
        model: Review,
        include: [
          {model: Restaurant}
        ] 
      }]
    });

    const user = userData.get({ plain: true });
    //console.log(user)
    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/*router.get('/results/:id', async (req, res) => {
  try {
    const restaurantData = await Restaurant.findByPk(req.params.id, {
      include: [{ model: Review }],
      attributes: {
        include: [
          [
            sequelize.literal(
              '(SELECT ROUND(AVG(rating),1) AS averageRating FROM reviews WHERE reviews.restaurant_id = restaurant.id)'
            ),
            'averageRating',
          ],
        ],
      },
    });

    const restaurants = restaurantData.get({ plain: true });

    res.render('results', {
      ...restaurants
    });
    //res.status(200).json(restaurantData);
  } catch (err) {
    res.status(500).json(err);
  }
});*/

router.get('/restaurant/:id', async (req, res) => {
  try {
    const restaurantData = await Restaurant.findByPk(req.params.id, {
      include: [{ model: Review, include: [{model: User}] }],
      attributes: {
        include: [
          [
            sequelize.literal(
              '(SELECT ROUND(AVG(rating),1) AS averageRating FROM reviews WHERE reviews.restaurant_id = restaurant.id)'
            ),
            'averageRating',
          ],
        ],
      },
    });
    const restaurant = restaurantData.get({ plain: true });
    
    res.render('restaurant', {
      ...restaurant,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', async (req, res) => {
  res.render('signup');
});

module.exports = router;