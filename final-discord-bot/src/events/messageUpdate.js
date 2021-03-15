const Discord = require('discord.js');
const {getGuild} = require('../Storage/database');

module.exports = async (client, oldMessage, newMessage) => {
  if (
    !oldMessage.author ||
    !newMessage.author ||
    oldMessage.content == newMessage.content ||
    newMessage.author.bot
  )
    return;

  const Guild = await getGuild(newMessage.guild.id);
  let y = Guild.logging.events.includes('Message edits');
  if (!y) return;
  let x = Guild.logging.channel;
  x = oldMessage.guild.channels.cache.get(x);
  if (!x) return;

  let embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setAuthor(newMessage.author.username, newMessage.author.avatarURL)
    .setTitle(`${newMessage.author.username} Edited A Message`)
    .addFields(
      {name: `Old Message`, value: oldMessage.content},
      {name: `New Message`, value: newMessage.content},
      {name: `Channel`, value: newMessage.channel}
    )
    .setTimestamp();

  x.send(embed);
};
