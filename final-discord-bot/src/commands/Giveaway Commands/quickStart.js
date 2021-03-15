const {MessageEmbed} = require('discord.js');
const {startGiveaway} = require('../../Storage/giveaway');
const {createGiveaway} = require('../../Storage/database');

module.exports.run = async (message, args) => {
  if (!args[0]) return message.channel.send(`You did not specify your time!`);
  if (!/^(\d+(m|h|s|d))+$/gi.test(args[0]))
    return message.channel.send('The time you provided is invalid');

  let channel = message.mentions.channels.first() || message.channel;
  let prize = args.slice(2).join(' ');
  if (!prize) return message.channel.send(`No prize specified!`);

  message.channel.send(`*Giveaway created in ${channel}*`);

  let ends = +new Date() + toMilliseconds(args[0]);
  let embed = new MessageEmbed()
    .setTitle(`New giveaway!`)
    .setDescription(
      `**${message.author.username}** is hosting a giveaway for **${prize}**`
    )
    .setFooter(
      `Giveaway ends in ${formatTime(ends - +new Date(), {long: true})}`
    )
    .setColor('GREEN');
  let m = await channel.send(embed);
  m.react('🎉');

  let giveawayObject = {
    prize,
    ends,
    channel: channel.id,
    mes: m.id,
    interval: '15',
    length: args[0],
    guild: message.guild.id,
    ended: false,
  };

  startGiveaway(giveawayObject, client);
  createGiveaway(giveawayObject);

  function toMilliseconds(f) {
    return require('ms')(f);
  }

  function formatTime(t) {
    return require('pretty-ms')(round(t), {verbose: true});
  }

  function round(d) {
    return Math.round(d / 1000) * 1000;
  }
};
