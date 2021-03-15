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
const UserConfig = require('../database/models/UserConfig');
const {getMutualGuilds, idk} = require('../utils/utils');
const GuildConfig = require('../database/models/GuildConfig');

router.get('/', async (req, res) => {
  if (!req.user) return res.status(401).send({msg: 'Unauthorized'});

  const user = await UserConfig.findOne({id: req.user.id});
  if (user) {
    res.send(await guilds());
  } else {
    res.send(400);
  }
});

router.get('/me', async (req, res) => {
  if (!req.user) return res.status(401).send({msg: 'Unauthorized'});

  // if (user) {
  res.send(await getUserGuilds(req.user.id));
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

router.put(`/config/create`, async (req, res) => {
  // GuildConfig.find((err, docs) => res.send(docs))

  if (!req.user) return res.status(401).send({msg: 'Unauthorized'});
  const {id, guild} = req.body;
  const hasPerms = (guild.permissions & 0x20) === 0x20;
  if (!hasPerms) return res.status(401).send({msg: 'Not enough permissions'});
  const created = await GuildConfig.create({id});
  return res.status(200).send(created);
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

  const {prefix, guilds} = req.body;
  if (!req.user) return res.send({msg: 'Unauthorized', error: true});
  if (!prefix) return res.send({msg: 'Prefix is required', error: true});
  const g = guilds.find(g => g.id == req.params.guildId);
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
      ? res.send({msg: 'Success', result: update})
      : res.send({msg: 'Could not find that guild', error: true});
  }
});

router.get('/mutual', async (req, res) => {
  if (!req.user) return res.status(401).send({msg: 'Unauthorized'});
  const user = await UserConfig.findOne({id: req.user.id});
  if (user) {
    const botGuilds = await guilds();
    // let userGuilds = user.get('guilds');
    res.send(getMutualGuilds(userGuilds, botGuilds));
  }
});

router.get('/perms', async (req, res) => {
  if (!req.user) return res.status(401).send({msg: 'Unauthorized'});
  console.log('Call to fetch');

  const botGuilds = await guilds();
  let userGuilds = await getUserGuilds(req.user.id);
  res.send(idk(userGuilds, botGuilds));
});

module.exports = router;
