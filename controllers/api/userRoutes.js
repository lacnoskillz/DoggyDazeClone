const router = require('express').Router();
const { User } = require('../../models');
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// Check if email exists in the database
const isEmailRegistered = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user !== null;
};

//new
router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email is already registered
    const emailExists = await isEmailRegistered(email);
    if (emailExists) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const userData = await User.create({ name, email, password });

    const msg = {
      to: email,
      from: 'rosalvahmartinez@gmail.com',
      subject: 'Sending with SendGrid is Fun',
      text: 'Thank You ' + name + ' for signing up with Doggy Daze!'
    };
    
    // ... (rest of the email sending code) ...

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