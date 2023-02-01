const router = require('express').Router();
const { Restaurant, User, Review } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    res.render('homepage');
  });

  router.get('/login', async (req, res) => {
    res.render('login');
  });

  router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Review }, { model: User, 
          attributes: [
            'user_name',
          ],
        },
        {
          model: Restaurant,
          attributes: [
            'user_name',
          ],
        }
      ],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('profile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.get('/results', async (req, res) => {
    res.render('results');
  });
 
  router.get('/signup', async (req, res) => {
    res.render('signup');
  });

  module.exports = router;