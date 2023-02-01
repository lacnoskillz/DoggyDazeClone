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
    res.render('profile');
  });

  router.get('/results', async (req, res) => {
    res.render('results');
  });
 
  router.get('/signup', async (req, res) => {
    res.render('signup');
  });

  module.exports = router;