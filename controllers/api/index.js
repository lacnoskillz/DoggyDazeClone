//kai
const router = require('express').Router();
const userRoutes = require('./userRoutes');
//Hazel
const reviewRoutes = require('./reviewRoutes');
router.use('/reviews', reviewRoutes);
router.use('/users', userRoutes);

module.exports = router;