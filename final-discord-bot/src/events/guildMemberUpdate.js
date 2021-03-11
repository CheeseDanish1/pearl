/** @format */

const Discord = require('discord.js');
const {GuildMember, Client} = require('discord.js');
const GuildConfig = require('../database/models/GuildConfig');

/**
 *
 * @param {Client} client
 * @param {GuildMember} oldMember
 * @param {GuildMember} newMember
 */

module.exports = async (client, oldMember, newMember) => {
  const Guild =
    (await GuildConfig.findOne({id: oldMember.guild.id})) ||
    (await GuildConfig.create({id: oldMember.guild.id}));
  let x = Guild.logging.channel;
  x = oldMember.guild.channels.cache.get(x);
  if (!x) return;

  let changes = {
    addedRole: 1,
    removedRole: 2,
    nickname: 3,
  };

  let change;

  // check if roles were removed
  let removedRole = '';
  let y = Guild.logging.events.find(e => e == 'Role removal');
  if (y) {
    if (oldMember.roles.cache.size > newMember.roles.cache.size) {
      oldMember.roles.cache.forEach(value => {
        if (newMember.roles.cache.find(r => r.id == value.id) == null) {
          change = changes.removedRole;
          removedRole = value.name;
        }
      });
    }
  }

  // check if roles were added
  let addedRole = '';
  y = Guild.logging.events.find(e => e == 'Role given');
  if (y) {
    if (oldMember.roles.cache.size < newMember.roles.cache.size) {
      newMember.roles.cache.forEach(r => {
        if (oldMember.roles.cache.find(role => role.id == r.id) == null) {
          change = changes.addedRole;
          addedRole = r.name;
        }
      });
    }
  }

  y = Guild.logging.events.find(e => e == 'Nickname change');
  if (y) {
    if (newMember.nickname != oldMember.nickname) {
      change = changes.nickname;
    }
  }

  let nickOld;
  let nickNew;

  if (oldMember.nickname == null) nickOld = oldMember.user.username;
  else nickOld = oldMember.nickname;
  if (newMember.nickname == null) nickNew = newMember.user.username;
  else nickNew = newMember.nickname;

  if (change == changes.addedRole) {
    let embed = new Discord.MessageEmbed()
      .setTitle('Role Added')
      .setDescription(
        `**${newMember.user.username}** was given the role **${addedRole}**`
      )
      .setFooter(`User Id ${newMember.id}`)
      .setTimestamp()
      .setColor('GREEN');
    x.send(embed);
  } else if (change == changes.removedRole) {
    let embed = new Discord.MessageEmbed()
      .setTitle('Role Removed')
      .setDescription(
        `**${newMember.user.username}** was removed of the role **${removedRole}**`
      )
      .setFooter(`User Id ${newMember.id}`)
      .setTimestamp()
      .setColor('GREEN');
    x.send(embed);
  } else if (change == changes.nickname) {
    let embed = new Discord.MessageEmbed()
      .setTitle('User Nickname Changed')
      .setDescription(
        `**${newMember.user.username}** changed their nick name from **${nickOld}** to **${nickNew}**`
      )
      .setFooter(`User Id ${newMember.id}`)
      .setTimestamp()
      .setColor('GREEN');
    x.send(embed);
  }
};
