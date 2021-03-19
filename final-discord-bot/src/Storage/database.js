const UserConfig = require('../database/models/UserConfig');
const GuildConfig = require('../database/models/GuildConfig');
const GuildMemberConfig = require('../database/models/GuildMemberConfig');

const database = {
  addMoney: async (amount, id) => {
    if (Math.sign(amount) == -1) return this.removeMoney(~amount + 1);
    return await UserConfig.findOneAndUpdate(
      {id},
      {
        $inc: {'economy.balance': amount},
      },
      {new: true}
    );
  },
  removeMoney: async (amount, id) => {
    return await UserConfig.findOneAndUpdate(
      {id},
      {
        $inc: {'economy.balance': -amount},
      },
      {new: true}
    );
  },
  addBank: async (amount, id) => {
    return await UserConfig.findOneAndUpdate(
      {id},
      {$inc: {'economy.bank': amount}},
      {new: true}
    );
  },
  buyItem: async (item, inventory, id) => {
    if (inventory.find(i => i.name == item.name))
      return await UserConfig.findOneAndUpdate(
        {id},
        {
          $inc: {'economy.inventory.$[i].amount': 1},
        },
        {new: true, arrayFilters: [{'i.name': item.name}]}
      );
    else
      return await UserConfig.findOneAndUpdate(
        {id},
        {$push: {'economy.inventory': item}},
        {new: true}
      );
  },
  sellItem: async (item, id) => {
    if (item.amount <= 1)
      return UserConfig.findOneAndUpdate(
        {id},
        {$pull: {'economy.inventory': item}},
        {new: true}
      );
    else
      return await UserConfig.findOneAndUpdate(
        {id},
        {$inc: {'economy.inventory.$[i].amount': -1}},
        {arrayFilters: [{'i.name': item.name}], new: true}
      );
  },
  setTimeout: async (what, id) => {
    let object = {};
    object[`timeout.${what}`] = Date.now();
    return await UserConfig.findOneAndUpdate({id}, {$set: object}, {new: true});
  },
  createGuild: async id => {
    return await GuildConfig.create({id});
  },
  getGuild: async id => {
    return (await GuildConfig.findOne({id})) || (await this.createGuild(id));
  },
  getGuildMember: async (id, guild) => {
    return (
      (await GuildMemberConfig.findOne({id, guild})) ||
      (await GuildMemberConfig.create({id, guild}))
    );
  },
  getUser: async user => {
    return (
      (await UserConfig.findOneAndUpdate(
        {id: user.id},
        {
          avatar: user.avatar,
          name: `${user.username}#${user.discriminator}`,
        },
        {new: true}
      )) || (await this.createUser(user))
    );
  },
  createUser: async user => {
    return await UserConfig.create({
      id: user.id,
      avatar: user.avatar,
      name: `${user.username}#${user.discriminator}`,
    });
  },
  enableEvent: async (event, config) => {
    if (typeof event == 'object')
      return await config.updateOne({$set: {'logging.events': event}});
    return await config.updateOne({$push: {'logging.events': event}});
  },
  disableEvent: async (event, config) => {
    if (event == 'all')
      return await config.updateOne({$set: {'logging.events': []}});
    return await config.updateOne({$pull: {'logging.events': event}});
  },
  resetEvents: async config => {
    return await config.updateOne({
      $unset: {'logging.channel': ''},
      $set: {'logging.events': []},
    });
  },
  setLoggingChannel: async (channel, config) => {
    await config.updateOne({$set: {'logging.channel': channel}});
  },
  addWarning: async (info, id, guild) => {
    let res = await GuildMemberConfig.findOneAndUpdate(
      {id, guild},
      {
        $inc: {'warnings.amount': 1},
        $push: {
          'warnings.info': info,
        },
      },
      {new: true}
    );
    return res;
  },
  removeWarnings: async (amount, gmc, id, guild) => {
    if (amount == 'all')
      return await GuildMemberConfig.findOneAndUpdate(
        {id, guild},
        {$set: {'warnings.amount': 0, 'warnings.info': []}},
        {new: true}
      );

    let r = gmc.warnings.amount - amount;

    let res = await GuildMemberConfig.findOneAndUpdate(
      {id, guild},
      {
        $pull: {'warnings.info': {warning: {$gt: r}}},
        $set: {'warnings.amount': r},
      },
      {multi: true}
    );
    return res;
  },
  createGiveaway: async giveaway => {
    return await GuildConfig.findOneAndUpdate(
      {id: giveaway.guild},
      {$push: {giveaways: giveaway}},
      {new: true}
    );
  },
  getGiveaways: async () => {
    return (await GuildConfig.find())
      .map(g => g.giveaways)
      .filter(g => g.length)
      .flat();
  },
  endGiveaway: async giveaway => {
    return await GuildConfig.findOneAndUpdate(
      {id: giveaway.guild},
      {$set: {'giveaways.$[g].ended': true}},
      {arrayFilters: [{'g.mes': giveaway.mes}], new: true}
    );
  },
  resetAutorole: async guild => {
    return await GuildConfig.findOneAndUpdate(
      {id: guild},
      {autorole: []},
      {new: true}
    );
  },
  insertAutorole: async (guild, role) => {
    return await GuildConfig.findOneAndUpdate(
      {id: guild},
      {$push: {autorole: role}},
      {new: true}
    );
  },
  removeAutorole: async (guild, role) => {
    return await GuildConfig.findOneAndUpdate(
      {id: guild},
      {$pull: {autorole: role}},
      {new: true}
    );
  },
  editOps: async (guild, what, to) => {
    let o = {};
    o[`ops.${what}`] = to;
    return await GuildConfig.findOneAndUpdate(
      {id: guild},
      {$set: o},
      {new: true}
    );
  },
  changePrefix: async (guild, prefix) => {
    return await GuildConfig.findOneAndUpdate(
      {id: guild},
      {$set: {prefix}},
      {new: true}
    );
  },
  addXp: async (id, guild, xp) => {
    return await GuildMemberConfig.findOneAndUpdate(
      {id, guild},
      {$inc: {xp}, $set: {xptimeout: Date.now()}},
      {new: true}
    );
  },
  addXpg: async (id, guild, xpg) => {
    return await GuildMemberConfig.findOneAndUpdate(
      {id, guild},
      {$inc: {xpg}},
      {new: true}
    );
  },
  mes: async (id, guild) => {
    await GuildMemberConfig.findOneAndUpdate(
      {id, guild},
      {$inc: {messages: 1}},
      {new: true}
    );
    await UserConfig.findOneAndUpdate({id}, {$inc: {messages: 1}}, {new: true});
  },
};

module.exports = database;
