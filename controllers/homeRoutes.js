const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

// TODO: Add a comment describing the functionality of the withAuth middleware
// This middleware function checks if the user is logged in before allowing them to access the route
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      // TODO: Add a comment describing the functionality of this property
      // This property is used to check if the user is logged in
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // TODO: Add a comment describing the functionality of this if statement
  // If the user is already logged in, redirect them to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
