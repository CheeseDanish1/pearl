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
  let id = req.params.guildId;
  // let g = await guild(req.params.guildId);
  Promise.all([
    guild(id),
    getGuildChannels(id),
    GuildConfig.findOne({id}),
    getGuildMembers(id),
  ]).then(r => {
    let g = r[0];
    g.channels = r[1];
    g.config = r[2];
    g.members = r[3];

    return res.send(g);
  });
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

router.put('/id/:guildId/ignored/:w', async (req, res) => {
  const {ignored, guilds} = req.body;
  if (!req.user) return res.send({msg: 'Unauthorized', error: true});
  const g = guilds.find(g => g.id == req.params.guildId);
  if (!g) return res.send({msg: 'Could not find that guild', error: true});
  const userPermissions = g.permissions;
  const canManageGuild = (userPermissions & 0x20) === 0x20;
  if (!canManageGuild)
    return res.send({msg: 'Not enough permission', error: true});
  let n = {};
  n[`ignoredStuff.${req.params.w}`] = ignored;
  const update = await GuildConfig.updateOne(
    {id: g.id},
    {$set: n},
    {new: true}
  );
  return res.status(200).send({
    msg: `Updated servers ignored ${req.params.w}`,
    result: update,
  });
});

router.put(`/id/:guildId/prefix`, async (req, res) => {
  const {prefix, guilds} = req.body;
  if (!req.user) return res.send({msg: 'Unauthorized', error: true});
  if (!prefix) return res.send({msg: 'Prefix is required', error: true});
  const g = guilds.find(g => g.id == req.params.guildId);
  if (!g) return res.send({msg: 'Could not find that guild', error: true});
  const userPermissions = g.permissions;
  const canManageGuild = (userPermissions & 0x20) === 0x20;
  if (!canManageGuild)
    return res.send({msg: 'Not enough permission', error: true});

  const update = await GuildConfig.findOneAndUpdate(
    {id: req.params.guildId},
    {prefix},
    {new: true}
  );
  return update
    ? res.send({msg: 'Updated server prefix', result: update})
    : res.send({msg: 'Could not find that guild', error: true});
});

router.put(`/id/:guildId/logging/channel`, async (req, res) => {
  const {channel, guilds} = req.body;
  if (!req.user) return res.send({msg: 'Unauthorized', error: true});
  if (!channel) return res.send({msg: 'Channel is required', error: true});
  const g = guilds.find(g => g.id == req.params.guildId);
  if (!g) return res.send({msg: 'Could not find that guild', error: true});
  const userPermissions = g.permissions;
  const canManageGuild = (userPermissions & 0x20) === 0x20;
  if (!canManageGuild)
    return res.send({msg: 'Not enough permission', error: true});

  const update = await GuildConfig.findOneAndUpdate(
    {id: req.params.guildId},
    {'logging.channel': channel},
    {new: true}
  );
  return update
    ? res.send({msg: 'Updated logging channel', result: update})
    : res.send({msg: 'Could not find that guild', error: true});
});

router.put(`/id/:guildId/enableCommand`, async (req, res) => {
  const {command, guilds} = req.body;
  console.log(command);
  if (!req.user) return res.send({msg: 'Unauthorized', error: true});
  if (!command) return res.send({msg: 'Command is required', error: true});
  const g = guilds.find(g => g.id == req.params.guildId);
  if (!g) return res.send({msg: 'Could not find that guild', error: true});
  const userPermissions = g.permissions;
  const canManageGuild = (userPermissions & 0x20) === 0x20;
  if (!canManageGuild)
    return res.send({msg: 'Not enough permission', error: true});

  const update = await GuildConfig.findOneAndUpdate(
    {id: req.params.guildId},
    {$pull: {disabledCommands: command.toLowerCase()}},
    {new: true}
  );
  return update
    ? res.send({
        msg: `Enabled usage of the ${command} command`,
        result: update,
      })
    : res.send({msg: 'Could not find that guild', error: true});
});

router.put(`/id/:guildId/disableCommand`, async (req, res) => {
  const {command, guilds} = req.body;
  if (!req.user) return res.send({msg: 'Unauthorized', error: true});
  if (!command) return res.send({msg: 'Command is required', error: true});
  const g = guilds.find(g => g.id == req.params.guildId);
  if (!g) return res.send({msg: 'Could not find that guild', error: true});
  const userPermissions = g.permissions;
  const canManageGuild = (userPermissions & 0x20) === 0x20;
  if (!canManageGuild)
    return res.send({msg: 'Not enough permission', error: true});

  const update = await GuildConfig.findOneAndUpdate(
    {id: req.params.guildId},
    {$push: {disabledCommands: command.toLowerCase()}},
    {new: true}
  );
  return update
    ? res.send({
        msg: `Disabled usage of the ${command} command`,
        result: update,
      })
    : res.send({msg: 'Could not find that guild', error: true});
});

router.post(`/id/:guildId/automod/punishments`, async (req, res) => {
  const {guilds, punishment} = req.body;
  if (!req.user)
    return res.status(401).send({msg: 'Unauthorized', error: true});

  if (!punishment)
    return res.send({msg: 'Punishments are required', error: true});

  const g = guilds.find(g => g.id == req.params.guildId);
  if (!g) return res.send({msg: 'Could not find that guild', error: true});

  const userPermissions = g.permissions;
  const canManageGuild = (userPermissions & 0x20) === 0x20;
  if (!canManageGuild)
    return res.send({msg: 'Not enough permission', error: true});

  if (punishment.some(pun => !pun.strike && !pun.action))
    return res.send({msg: 'Bad request', error: true});

  const update = await GuildConfig.findOneAndUpdate(
    {id: g.id},
    {'automod.punishments': punishment.sort((a, b) => a.strike - b.strike)},
    {new: true}
  );

  return update
    ? res.send({
        msg: `Updated automod punishments`,
        result: update,
      })
    : res.send({msg: 'Unknown error', error: true});
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
  console.time('total time');
  console.time('auth');

  if (!req.user) return res.status(401).send({msg: 'Unauthorized'});

  console.timeEnd('auth');
  console.time('fetch user guilds');

  const userGuilds = await getUserGuilds(req.user.id);
  if (userGuilds.code == 0) return res.status(401).send({msg: 'Unauthorized'});

  console.timeEnd('fetch user guilds');
  console.time('fetch bot guilds');

  const botGuilds = await guilds();

  console.timeEnd('fetch bot guilds');
  console.time('filter guilds');

  const sorted = idk(userGuilds, botGuilds);

  console.timeEnd('filter guilds');

  res.send(sorted);

  console.timeEnd('total time');
});

module.exports = router;
