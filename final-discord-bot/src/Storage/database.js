const UserConfig = require('../database/models/UserConfig');
const GuildConfig = require('../database/models/GuildConfig');
const GuildMemberConfig = require('../database/models/GuildMemberConfig');
// const {punish} = require('./functions');
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
    return (
      (await GuildConfig.findOne({id})) || (await GuildConfig.create({id}))
    );
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
      )) ||
      (await UserConfig.create({
        id: user.id,
        avatar: user.avatar,
        name: `${user.username}#${user.discriminator}`,
      }))
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
  addWarnings: async ({amount, reason, message}) => {
    if (amount <= 0) return;
    const Guild = await GuildConfig.findOne({id: message.guild.id});
    const GuildMember = await GuildMemberConfig.findOne({
      id: message.member.id,
      guild: message.guild.id,
    });
    // Vars and checking
    const punishments = Guild.automod.punishments;
    const oldWarnings = GuildMember.warnings.amount;
    const newWarnings = oldWarnings + amount;
    const idk = pun =>
      pun.strike == newWarnings ||
      (pun.strike > oldWarnings && pun.strike < newWarnings);
    // Adding warnings
    const info = [
      ...GuildMember.warnings.info.map(i => ({
        warning: i.warning,
        reason: i.reason,
        warnedBy: i.warnedBy,
      })),
    ];
    Array.from(Array(amount).keys()).forEach(a => {
      info.push({
        warning: GuildMember.warnings.amount + a + 1,
        warnedBy: 'Automod',
        reason: reason,
      });
    });
    // console.log(info);
    await GuildMemberConfig.findOneAndUpdate(
      {
        id: message.member.id,
        guild: message.guild.id,
      },
      {$set: {'warnings.info': info}, $inc: {'warnings.amount': amount}},
      {new: true}
    );
    message.author.send(
      `You were warned \`${amount}\` time${amount == 1 ? '' : 's'} in \`${
        message.guild.name
      }\` for \`${reason}\``
    );
    const punishment = punishments.find(pun => idk(pun));
    if (punishment) {
      const pun = {
        ban: 'banned',
        mute: 'muted',
        kick: 'kicked',
        softban: 'softbanned',
      };
      // punish({...punishment, message});
      switch (punishment.action) {
        case 'ban':
          message.member.ban();
          break;
        case 'mute':
          const mutedRole = message.guild.roles.cache.find(
            r => r.name.toLowerCase() == 'muted'
          );
          if (!mutedRole) return;
          message.member.roles.add(mutedRole);
          if ('time' in punishment) {
            setTimeout(() => {
              message.member.roles.remove(mutedRole);
            }, punishment.time);
          }
          break;
        case 'kick':
          message.member.kick();
          break;
        case 'softban':
          message.member.ban({days: 7});
          message.guild.members.unban(message.member.id);
          break;
        default:
          break;
      }
      message.author.send(
        `You now have ${newWarnings} warning${
          newWarnings == 1 ? '' : 's'
        } so are getting ${pun[punishment.action]} ${
          punishment.time
            ? `for ${require('ms')(punishment.time, {long: true})}`
            : ``
        }`
      );
      return message.channel.send(
        `You now have ${newWarnings} warning${
          newWarnings == 1 ? '' : 's'
        } so are getting ${pun[punishment.action]} ${
          punishment.time
            ? `for ${require('ms')(punishment.time, {long: true})}`
            : ``
        }`
      );
    }
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
  editAutomod: async (guild, what, to) => {
    let o = {};
    o[`automod.${what}`] = to;
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
  },
  disableCommand: async (command, guild) => {
    return await GuildConfig.findOneAndUpdate(
      {id: guild},
      {$push: {disabledCommands: command.info.name}},
      {new: true}
    );
  },
  enableCommand: async (command, guild) => {
    return await GuildConfig.findOneAndUpdate(
      {id: guild},
      {$pull: {disabledCommands: command.info.name}},
      {new: true}
    );
  },
  setPunishment: async (info, guild) => {
    if (guild.automod.punishments.find(r => r.strike == info.strike)) {
      return await GuildConfig.findOneAndUpdate(
        {id: guild.id, 'automod.punishments.strike': info.strike},
        {$set: {'automod.punishments.$': info}},
        {new: true}
      );
    }
    return await GuildConfig.findOneAndUpdate(
      {id: guild.id},
      {$push: {'automod.punishments': info}},
      {new: true}
    );
  },
  setAfk: async (status, id, guild) => {
    return await GuildMemberConfig.findOneAndUpdate(
      {id, guild},
      {
        $set: {
          'afk.message': status,
          'afk.timestamp': new Date(),
          'afk.status': true,
        },
      },
      {new: true}
    );
  },
  removeAfk: async (id, guild) => {
    return await GuildMemberConfig.findOneAndUpdate(
      {id, guild},
      {$set: {'afk.status': false}},
      {new: true}
    );
  },
  getAfk: async (id, guild) => {
    const member = await GuildMemberConfig.findOne({id, guild});
    return member.afk || null;
  },
  setLevelRole: async (guild, level, roles) => {
    const info = {level, roles};
    const Guild =
      (await GuildConfig.findOne({id: guild})) ||
      (await GuildConfig.create({id: guild}));

    if (level == 'reset') {
      return await GuildConfig.findOneAndUpdate(
        {id: guild},
        {$set: {levelRoles: []}}
      );
    }

    if (Guild.levelRoles.find(g => g.level == info.level)) {
      return await GuildConfig.findOneAndUpdate(
        {id: guild, 'levelRoles.level': info.level},
        {
          $set: {
            'levelRoles.$.roles': info.roles,
          },
        },
        {new: true}
      );
    }

    return await GuildConfig.findOneAndUpdate(
      {id: guild},
      {$push: {levelRoles: info}},
      {new: true}
    );
  },
  setXp: async (guild, id, amount) => {
    return await GuildMemberConfig.findOneAndUpdate(
      {guild, id},
      {xp: amount},
      {new: true}
    );
  },
  setXpColor: async (id, hex) => {
    return await UserConfig.findOneAndUpdate({id}, {xpcolor: hex}, {new: true});
  },
  setXpInfo: async (props, id) => {
    const obj = {};
    if (props.min) obj.minxp = props.min;
    if (props.max) obj.maxxp = props.max;
    if (props.cooldown) obj.cooldown = props.cooldown;
    if (props.multiplier) obj.multiplier = props.multiplier;
    if (obj == props) return null;
    const f = await GuildConfig.findOneAndUpdate(
      {id},
      {$set: {xp: obj}},
      {new: true}
    );
    return f;
  },
  setLevelup: async (ops, id) => {
    const props = {};
    if ('message' in ops) props.message = ops.message;
    if ('channel' in ops) props.channel = ops.channel;
    if (props == ops) return null;
    return await GuildConfig.findOneAndUpdate(
      {id},
      {$set: {levelup: props}},
      {new: true}
    );
  },
};

module.exports = database;
