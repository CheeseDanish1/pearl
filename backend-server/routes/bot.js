const router = require('express').Router();
const {guilds, bot, guild} = require('../utils/api');
const {getMutualGuilds, idk} = require('../utils/utils');
const g = require('./guilds')
const u = require('./users');

router.use('/users', u);
router.use('/guilds', g)

router.get('/me', async (req, res) => {
  if (!req.user) return res.status(401).send({msg: 'Unauthorized'});

  res.send(await bot());
});

router.get('/', async (req, res) => {
  if (!req.user) return res.status(401).send({msg: 'Unauthorized'});

  res.send(await bot());
});

module.exports = router;
