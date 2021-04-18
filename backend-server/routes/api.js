const router = require('express').Router();
const {authorized} = require('../utils/api');
const bot = require('./bot');

router.get('/', (req, res) => {
  req.user ? res.send(req.user) : res.status(401).send({msg: 'Unauthorized'});
});

router.get('/isLoggedIn', async (req, res) => {
  res.send(await authorized(req));
});

router.get('/me', (req, res) => {
  req.user ? res.send(req.user) : res.status(401).send({msg: 'Unauthorized'});
});

router.use('/bot', bot);

module.exports = router;
