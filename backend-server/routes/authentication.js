const router = require('express').Router()
const passport = require('passport')

router.get('/discord', passport.authenticate('discord'));
router.get(
  '/discord/redirect',
  passport.authenticate('discord'),
  (req, res) => {
    res.redirect('http://localhost:3000/menu');
    // res.send({});;
  }
);

router.get('/invite/redirect', (req, res) => {
  res.redirect(`http://localhost:3000/dashboard/${req.query.guild_id}`);
});

router.get('/logout', (req, res) => {
  // res.redirect(`http://localhost:3000/dashboard/${req.query.guild_id}`);
  req.logout();
  res.redirect('http://localhost:3000/');
});


module.exports = router