const Router = require('express').Router();
const UserConfig = require('../database/models/UserConfig');
const User = require('../database/models/User');

Router.get('/', async (req, res) => {
  if (!req.user) res.status(200).send('Unauthorized');
  res.send(await User.find());
});

Router.get('/me', async (req, res) => {
  if (!req.user) return res.status(401).send({status: 'Unauthorized'});
  let user = await User.findOne({discordId: req.user.discordId});
  res.send(user ? user : '');
});

Router.get('/me/all', async (req, res) => {
  if (!req.user) res.status(401);
  let {guilds, discordId, discordTag, avatar} = await User.findOne({
    discordId: req.user.discordId,
  });
  let config = await UserConfig.findOne({id: req.user.discordId});
  res.send({
    guilds,
    discordId,
    discordTag,
    avatar,
    config,
  });
});

Router.get('/me/config', async (req, res) => {
  if (!req.user) res.status(200).send('Unauthorized');
  res.send(await UserConfig.findOne({id: req.user.discordId}));
});

Router.get('/config', async (req, res) => {
  if (!req.user) res.status(200).send('Unauthorized');
  res.send(await UserConfig.find());
});

Router.get('/id/:userId', async (req, res) => {
  if (!req.user) res.status(200).send('Unauthorized');
});

module.exports = Router;
