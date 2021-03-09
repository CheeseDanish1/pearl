const {MessageEmbed} = require('discord.js');
const GuildConfig = require('../database/models/GuildConfig');

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
      .setTitle('Message Reaction Removed')
      .setColor('GREEN')
      .setDescription(
        `${user.username} removed their reaction ${reaction.emoji}`
      )
      .setURL(message.url)
      .setAuthor(user.username, user.displayAvatarURL());

    loggingChannel.send(embed);
  }

  run();

  async function run() {
    const Guild = await GuildConfig.findOne({id: guild.id});
    const obj = Guild.reactionRoles.find(
      r => r.MessageId == message.id && reaction.emoji.name == r.Reaction
    );
    if (!obj) return;
    if (reaction.emoji.name != obj.Reaction) return;
    const role = guild.roles.cache.get(obj.Role);
    if (!role) return;
    const mem = guild.members.cache.get(user.id);
    mem.roles.remove(role);
  }
};
