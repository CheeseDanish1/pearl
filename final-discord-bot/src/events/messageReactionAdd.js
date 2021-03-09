const {
  MessageEmbed,
  ReactionCollector,
  User,
  MessageReaction,
  Client,
} = require('discord.js');
const GuildConfig = require('../database/models/GuildConfig');

/**
 * @param {Client} bot
 * @param {MessageReaction} reaction
 * @param {User} user
 */

module.exports = async (bot, reaction, user) => {
  const message = reaction.message;
  const guild = message.guild;

  logging();
  async function logging() {
    const Guild = await GuildConfig.findOne({id: guild.id});
    const loggingChannelId = Guild.logging.channel;
    if (!loggingChannelId) return;
    const loggingChannel = guild.channels.cache.get(loggingChannelId);
    if (!loggingChannel) return;
    const enabled = Guild.logging.events.includes('Message reactions');
    if (!enabled) return;

    const embed = new MessageEmbed()
      .setTitle('Message Reaction Added')
      .setColor('GREEN')
      .setDescription(`${user.username} reacted with ${reaction.emoji}`)
      .setURL(message.url)
      .setAuthor(user.username, user.displayAvatarURL());

    loggingChannel.send(embed);

    // let chanid = db.get(`loggingchannel_${guild.id}`)
    // if (!chanid) return;
    // let enabled = db.get(`mesreaction_${guild.id}`) == "enabled"
    // if (!enabled) return;

    // let chan = bot.channels.cache.get(chanid)

    // chan.send(embed)
  }

  rr().catch(console.dir);

  async function rr() {
    const Guild = await GuildConfig.findOne({id: guild.id});
    const obj = Guild.reactionRoles.find(r => r.MessageId == message.id);
    if (!obj) return;
    if (reaction.emoji.name != obj.Reaction) return;
    const role = guild.roles.cache.get(obj.Role);
    if (!role) return;
    const mem = guild.members.cache.get(user.id);
    mem.roles.add(role);
  }
};
