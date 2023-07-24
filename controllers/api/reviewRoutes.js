const router = require('express').Router();
const { Review, Restaurant } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', async (req, res) => {
  try {
    const productData = await Review.findByPk(req.params.id, {

    });

    console.log(req.params.id);
    if (!productData) {
      res.status(404).json({ message: 'Not found' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// get route to get all reviews
router.get('/', async (req, res) => {
  try {
    const ReviewData = await Review.findAll()

 
    if (!ReviewData) {
      res.status(404).json({ message: 'Review Not found' });
      return;
    }

    res.status(200).json(ReviewData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// put route to update review
// Add the PUT route to update the review
router.put('/:id', withAuth, async (req, res) => {
  try {
    // Get the ID of the review to be updated from the request parameters
    const reviewId = req.params.id;

    // Find the review to be updated in the database
    const reviewData = await Review.findByPk(reviewId);

    // Check if the review exists
    if (!reviewData) {
      res.status(404).json({ message: 'Review not found' });
      return;
    }

    // Check if the logged-in user is the owner of the review
    if (reviewData.user_id !== req.session.user_id) {
      res.status(403).json({ message: 'You are not authorized to edit this review' });
      return;
    }
    const amenities = JSON.stringify(req.body.amenities);
    // Update the review data with the new values
    await Review.update(
      {
        rating: req.body.rating,
        description: req.body.description,
        amenities: amenities,
      },
      {
        where: {
          id: reviewId,
        },
      }
    );

    // Send a success response
    res.status(200).json({ message: 'Review updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const { rating, description, restaurant_id, amenities } = req.body;
    const userId = req.session.user_id;

    // Check if the user has already submitted a review for the restaurant
    const existingReview = await Review.findOne({
      where: {
        user_id: userId,
        restaurant_id: restaurant_id
      }
    });

    if (existingReview) {
      // Return an error response indicating that the user has already submitted a review
      return res.status(409).json({ message: 'You have already submitted a review for this restaurant.' });
    }

    // Create the new review
    const newReview = await Review.create({
      rating,
      description,
      restaurant_id,
      amenities,
      user_id: userId
    });

    res.status(200).json(newReview);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});


router.post('/reviewcheck', async (req, res) => {
  try {
    const { restaurant_id } = req.body;
    const userId = req.session.user_id;

    // Check if the user has already submitted a review for the restaurant
    const existingReview = await Review.findOne({
      where: {
        user_id: userId,
        restaurant_id: restaurant_id,
      },
    });

    if (existingReview) {
      // Return an error response indicating that the user has already submitted a review
      return res.status(409).json({ message: 'You have already submitted a review for this restaurant.' });
    }

    res.status(200).json({ message: 'Review check successful.' });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});


router.delete('/:id', withAuth, async (req, res) => {
  try {
    const reviewData = await Review.destroy({
      where: {
        id: req.params.id 
      },
    });

    if (!reviewData) {
      res.status(404).json({ message: 'No review found with this id!' });
      return;
    }

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
