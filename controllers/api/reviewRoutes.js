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


router.post('/', withAuth, async (req, res) => {
  try {
    const newReview = await Review.create({
      ...req.body,
      user_id: req.session.user_id,

    });

    res.status(200).json(newReview);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/reviewcheck', async (req,res) =>{

  try{
    const checkReview = await Review.findByPk({
        user_id: req.session.user_id,
  
      });
      if(checkReview.restaurant_id == req.params.restaurant_id){
        res.status(404)
      }
      res.status(200).json(checkReview);
  }catch (err) {
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
