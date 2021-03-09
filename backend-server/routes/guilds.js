const router = require('express').Router();
const {
  guilds,
  bot,
  guild,
  getUser,
  getGuildChannels,
  getUserGuilds,
  getGuildMembers,
} = require('../utils/api');
const User = require('../database/models/User');
const {getMutualGuilds, idk} = require('../utils/utils');
const GuildConfig = require('../database/models/GuildConfig');

router.get('/', async (req, res) => {
  if (!req.user) return res.status(401).send({msg: 'Unauthorized'});

  const user = await User.findOne({discordId: req.user.discordId});
  if (user) {
    // res.send(await getUserGuilds(req.user.discordId))
    res.send(await guilds());
  } else {
    res.send(400)
  }
});

router.get('/me', async (req, res) => {
  if (!req.user) return res.status(401).send({msg: 'Unauthorized'});

  // const user = await User.findOne({discordId: req.user.discordId});
  // if (user) {
  res.send(await getUserGuilds(req.user.discordId));
    // res.send(await guilds());
  // }
});

router.get(`/id/:guildId`, async (req, res) => {
  if (!req.user) return res.status(401).send({msg: 'Unauthorized'});
  let g = await guild(req.params.guildId);
  const channels = await getGuildChannels(req.params.guildId);
  g.channels = channels;
  g.config = await GuildConfig.findOne({id: req.params.guildId});
  // g.members = await getGuildMembers(req.params.guildId);
  res.send(g);
});

router.get(`/id/:guildId/config`, async (req, res) => {
  // GuildConfig.find((err, docs) => res.send(docs))

  if (!req.user) return res.status(401).send({msg: 'Unauthorized'});
  const id = req.params.guildId;
  const guildConfig = await GuildConfig.findOne({id});

  return guildConfig
    ? res.send(guildConfig)
    : res.status(400).send({msg: 'Guild not found'});
});

router.put('/id/:guildId/logging/:what', async (req, res) => {
  if (!req.user) return res.status(401).send({msg: 'Unauthorized'});
  const {to} = req.body;
  const {guildId, what} = req.params;
  const g = req.user.guilds.find(g => g.id == req.params.guildId);
  const userPermissions = g.permissions;
  const canManageGuild = (userPermissions & 0x20) === 0x20;
  if (!canManageGuild)
    return res.status(401).send({msg: 'Not enough permission'});
  if (!to) return res.status(400).send({msg: `Not enough info`});
  if (what == 'channel') {
    const update = await GuildConfig.findOneAndUpdate(
      {id: guildId},
      {'logging.channel': to},
      {new: true}
    );
    return update
      ? res.send(update.logging)
      : res.status(400).send({msg: 'guild not found'});
  } else if (what == 'events') {
    const update = await GuildConfig.findOneAndUpdate(
      {id: guildId},
      {'logging.events': to},
      {new: true}
    );
    return update
      ? res.send(update.logging)
      : res.status(400).send({msg: 'guild not found'});
  }
});

router.put(`/id/:guildId/prefix`, async (req, res) => {
  // const { prefix } = req.body
  // const { guildId } = req.params
  // if (!prefix) return res.status(400).send({msg: "Prefix required"})
  // const update = await GuildConfig.findOneAndUpdate({id: guildId}, {prefix}, {new: true})
  // return update ? res.send(update) : res.status(400).send({msg: "Could not find guild"})

  const prefix = req.body.prefix;
  if (!req.user) return res.send({msg: 'Unauthorized', error: true});
  if (!prefix) return res.send({msg: 'Prefix is required', error: true});
  const g = req.user.guilds.find(g => g.id == req.params.guildId);
  const userPermissions = g.permissions;
  const canManageGuild = (userPermissions & 0x20) === 0x20;
  if (!canManageGuild)
    return res.send({msg: 'Not enough permission', error: true});
  else {
    const update = await GuildConfig.findOneAndUpdate(
      {id: req.params.guildId},
      {prefix},
      {new: true}
    );
    return update
      ? res.send(update)
      : res.send({msg: 'Could not find that guild', error: true});
  }
});

router.get('/mutual', async (req, res) => {
  if (!req.user) return res.status(401).send({msg: 'Unauthorized'});
  const user = await User.findOne({discordId: req.user.discordId});
  if (user) {
    const botGuilds = await guilds();
    let userGuilds = user.get('guilds');
    res.send(getMutualGuilds(userGuilds, botGuilds));
  }
});

router.get('/perms', async (req, res) => {
  if (!req.user) return res.status(401).send({msg: 'Unauthorized'});
  console.log('Call to fetch');
  // const user = await User.findOne({discordId: req.user.discordId});
  // if (user) {
    const botGuilds = await guilds();
    let userGuilds = await getUserGuilds(req.user.discordId)
    res.send(idk(userGuilds, botGuilds));
  // }
});

module.exports = router;
