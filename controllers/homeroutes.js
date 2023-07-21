const router = require('express').Router();
const { Restaurant, User, Review } = require('../models');
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');

const ITEMS_PER_PAGE = 6; // Number of restaurants to display per page

router.get('/', async (req, res) => {
  try {
    const page = req.query.page || 1; // Get the page number from the query parameters, default to 1 if not provided

    // Calculate the OFFSET and LIMIT for the query
    const offset = (page - 1) * ITEMS_PER_PAGE;
    const limit = ITEMS_PER_PAGE;

    const restaurantData = await Restaurant.findAndCountAll({
      // ... Your existing code for finding restaurants and calculating averageRating ...
      offset, // Apply the OFFSET
      limit, // Apply the LIMIT
    });

    const restaurants = restaurantData.rows.map((restaurant) => restaurant.get({ plain: true }));
    const totalRestaurants = restaurantData.count;
    const totalPages = Math.ceil(totalRestaurants / ITEMS_PER_PAGE);

    res.render('homepage', {
      restaurants,
      logged_in: req.session.logged_in,
      currentPage: page,
      totalPages: totalPages,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
      previousPage: parseInt(page) - 1,
      nextPage: parseInt(page) + 1,
    });
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
      include: [{ model: Review, include: [{ model: User }] }],
      include: [{
        model: Review,
        include: [
          { model: Restaurant }
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
      include: [{ model: Review, include: [{ model: User }] }],
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
    //const amenities = []
    if (restaurant.Reviews.length) {
      restaurant.Reviews.forEach(review => {
        //amenities.push(JSON.parse(review.amenities))
        //change the amenities string to a parsed object in each review
        review.amenities = JSON.parse(review.amenities)
      });
    }
    console.log(restaurant)

    //console.log(amenities)
    res.render('restaurant', {
      //amenities: amenities,
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

router.get('/new-restaurant', async (req, res) => {
  res.render('new-restaurant', {
    logged_in: req.session.logged_in
  });
});

module.exports = router;