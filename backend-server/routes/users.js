const Router = require('express').Router();
const UserConfig = require('../database/models/UserConfig');

Router.get('/', async (req, res) => {
  if (!req.user) res.status(200).send('Unauthorized');
  res.send(await User.find());
});

Router.get('/me', async (req, res) => {
  if (!req.user) return res.status(401).send({status: 'Unauthorized'});
  let user = await UserConfig.findOne({id: req.user.id});
  if (!user) return res.status(401).send({message: 'User not found'});
  res.send(user ? user : '');
});

// Router.get('/id/:userId', async (req, res) => {
//   if (!req.user) res.status(200).send('Unauthorized');

// });

module.exports = Router;
