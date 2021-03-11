const GuildConfig = require('../database/models/GuildConfig');
const {User, Client, MessageEmbed} = require('discord.js');

/**
 *
 * @param {Client} client
 * @param {User} oldUser
 * @param {User} newUser
 */

module.exports = async (client, oldUser, newUser) => {
  client.guilds.cache.forEach(async g => {
    let who = g.members.cache.get(newUser.id);
    if (!who) return;

    const Guild =
      (await GuildConfig.findOne({id: who.guild.id})) ||
      (await GuildConfig.create({id: who.guild.id}));

    let x = Guild.logging.channel;
    x = who.guild.channels.cache.get(x);
    let y = Guild.logging.events.includes('User changes');
    if (!x || !y) return;

    let changes = {
      other: 0,
      username: 1,
      avatar: 2,
      tag: 3,
    };

    let change = changes.other;

    if (
      newUser.username != oldUser.username &&
      newUser.username != undefined &&
      oldUser.username != undefined
    )
      change = changes.username;

    if (newUser.avatar != oldUser.avatar) change = changes.avatar;

    if (newUser.discriminator != oldUser.discriminator) change = changes.tag;

    var embed;

    switch (change) {
      case 0:
        // x.send("Send")
        break;
      case 1:
        embed = new MessageEmbed()
          .setTitle('Username Changed')
          .setDescription(
            `**${newUser.username}** changed their name from **${oldUser.username}** to **${newUser.username}**`
          )
          .setFooter(`User Id ${newUser.id}`)
          .setTimestamp()
          .setColor('GREEN');
        x.send(embed);
        break;
      case 2:
        embed = new MessageEmbed()
          .setTitle(`${newUser.tag}`, newUser.displayAvatarURL())
          .setDescription(`Profile Image Changed`)
          .setImage(newUser.displayAvatarURL())
          .setFooter(`User Id ${newUser.id}`)
          .setTimestamp()
          .setColor('GREEN');
        x.send(embed);
        break;
      case 3:
        embed = new MessageEmbed()
          .setTitle(`${newUser.tag}`, newUser.displayAvatarURL())
          .setDescription(`Discord Tag Changed`)
          .setImage(newUser.displayAvatarURL())
          .setFooter(`User Id ${newUser.id}`)
          .setTimestamp()
          .setColor('GREEN');
        x.send(embed);
        break;
      default:
        break;
    }
  });
};
