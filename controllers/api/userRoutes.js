const router = require('express').Router();
const { User } = require('../../models');
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

//new
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    const msg = {
      to: req.body.email, // Change to your recipient
      from: 'doggydazeUTSA@outlook.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'Thank You ' + req.body.name + ' for signing up with Doggy Daze!'
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    console.log('user data:');
    console.log(userData);

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);
    console.log('password works');
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }


    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json({ message: "no user account found" });
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});



module.exports = router;