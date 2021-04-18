const {Message, MessageEmbed} = require('discord.js');

/**
 *
 * @param {Message} message
 */

module.exports.run = async (client, message, args) => {
  let msg = await message.channel.send(`🏓 Pinging....`);
  let title = '🏓 Pong!';
  let description = `Latency is ${Math.floor(
    msg.createdTimestamp - message.createdTimestamp
  )}\nAPI Latency is ${Math.round(client.ws.ping)}ms`;

  const _ = new MessageEmbed()
    .setTitle(title)
    .setDescription(description)
    .setColor('RANDOM');
  msg.edit(_);

  msg.edit('\u200B');
};

module.exports.info = {
  name: 'ping',
  alias: [],
  usage: '<p>Ping',
  example: '<p>Ping',
  description: 'Find out pearls speed and latency',
  category: 'misc',
};
