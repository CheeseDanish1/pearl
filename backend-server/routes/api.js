const router = require('express').Router()
const bot = require('./bot')

router.get('/', (req, res) => {
  req.user ? res.send(req.user) : res.status(401).send({msg: "Unauthorized"})
})

router.get('/isLoggedIn', (req, res) => {
  console.log('Got call to is logged in');
  res.send(!!req.user);
});

router.get('/me', (req, res) => {
  req.user ? res.send(req.user) : res.status(401).send({msg: "Unauthorized"})
})

router.use('/bot', bot)

module.exports = router