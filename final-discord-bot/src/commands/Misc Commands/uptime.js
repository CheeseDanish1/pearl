const ms = require('parse-ms');
const m = require('pretty-ms');
const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
  let time = m(client.uptime, {verbose: true});
  let embed = new Discord.MessageEmbed()
    .setTitle('Bot Uptime')
    .setDescription(time)
    .setColor('GREEN');

  message.channel.send(embed);
};

module.exports.info = {
  name: 'uptime',
  alias: [],
  usage: '<p>Uptime',
  example: '<p>Uptime',
  description: 'See how long the bot has been in for since the last restart',
  category: 'misc',
};
