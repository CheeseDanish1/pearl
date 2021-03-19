const {Client, Message} = require('discord.js');

/**
 *
 * @param {Client} client
 * @param {Message} message
 */

module.exports.run = (client, message, args) => {
  const {channel} = message.member.voice;
  if (!channel) return message.channel.send("I'm sorry but your not in a vc!");
  if (!message.guild.me.voice.channel)
    return message.channel.send("I'm not in a vc");
  if (channel != message.guild.me.voice.channel)
    return message.channel.send('We are not in the same vc');
  channel.leave();
  const serverQueue = client.queue.get(message.guild.id);
  if (serverQueue) serverQueue.songs = [];
  message.channel.send('Left vc');
};

module.exports.info = {
  name: 'leave',
  alias: ['exit'],
  usage: '<p>Leave',
  example: '<p>Leave',
  description: 'Have pearl leave voice channel when your done listening',
  category: 'music',
};
