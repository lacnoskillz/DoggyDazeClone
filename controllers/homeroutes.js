const router = require('express').Router();
const { Restaurant, User, Review } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  const restaurantData = await Restaurant.findAll();
  const restaurants = restaurantData.map((restaurant) => restaurant.get({ plain: true }));

  res.render('homepage', {
    restaurants
  });

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
      include: [{
        model: Review,
        include: [
          {model: Restaurant}
        ] 
      }]
    });

    const user = userData.get({ plain: true });
    console.log(user)
    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/results/', async (req, res) => {
  try {
    const resultData = await Restaurant.findAll({
      include: [{ model: Review }],
      attributes: {
        include: [
          [
            sequelize.literal(
              '(SELECT AVG(rating) FROM review AND review.restaurant_id = restaurant.id)'
            ),
            'averageRating',
          ],
        ],
      },
    });

    const posts = resultData.map((result) => result.get({ plain: true }));

    res.render('results', { 
      results, 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/results/:restaurant_name', async (req, res) => {
  try {
    const resultData = await Restaurant.findByPk(req.params.restaurant_name, {
      include: [{ model: Review }],
      attributes: {
        include: [
          [
            sequelize.literal(
              '(SELECT AVG(rating) FROM review AND review.restaurant_id = restaurant.id)'
            ),
            'averageRating',
          ],
        ],
      },
    });

    const posts = resultData.map((result) => result.get({ plain: true }));

    res.render('results', { 
      results, 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/restaurant/:id', async (req, res) => {
  try {
    const restaurantData = await Restaurant.findByPk(req.params.id, {
      include: [{ model: Review }]
      // include: [
      //   {
      //     model: Review,
      //     attributes: ['description','date_created' ]
      //   }
      // ]
    });
    const restaurant = restaurantData.get({ plain: true });
    console.log(restaurant)
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