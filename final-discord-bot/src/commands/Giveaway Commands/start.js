const {MessageEmbed, Client, Message} = require('discord.js');
const {startGiveaway} = require('../../Storage/giveaway');
const {createGiveaway} = require('../../Storage/database');

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */

module.exports.run = async (client, message, args) => {
  const m = await message.channel.send(
    `What channel do you want the giveaway to be in?`
  );
  let giveaway = {
    ended: false,
    guild: message.guild.id,
    interval: '15',
    channel: null,
    length: null,
    ends: null,
    prize: null,
    mes: null,
  };
  let step = 1;
  const collector = m.channel.createMessageCollector(
    ms => ms.author.id == message.author.id
  );
  collector.on('collect', mes => {
    if (step == 1) {
      let chan =
        mes.mentions.channels.first() ||
        mes.guild.channels.cache.get(mes.content) ||
        mes.guild.channels.cache.find(
          c => c.name.toLowerCase() == mes.content.toLowerCase()
        );
      if (!chan)
        return mes.channel.send(
          'The channel you provided was invalid, try again'
        );
      giveaway.channel = chan.id;
      step++;
      return mes.channel.send(
        `Enter the length of the giveaway\nExample \`30s\`, \`10m\`, \`5d\``
      );
    } else if (step == 2) {
      if (!/^(\d+(m|h|s|d))+$/gi.test(mes.content))
        return message.channel.send('The time you provided is invalid');
      giveaway.length = toMilliseconds(mes.content);
      step++;
      return mes.channel.send('Provide the prize for the giveaway');
    } else if (step == 3) {
      giveaway.prize = mes.content;
      giveaway.ends = +new Date() + giveaway.length;

      let embed = new MessageEmbed()
        .setTitle(`New giveaway!`)
        .setDescription(
          `**${message.author.username}** is hosting a giveaway for **${giveaway.prize}**`
        )
        .setFooter(
          `Giveaway ends in ${formatTime(giveaway.ends - +new Date())}`
        )
        .setColor('GREEN');

      mes.channel.send(`Giveaway successfully created`);
      mes.guild.channels.cache
        .get(giveaway.channel)
        .send(embed)
        .then(me => {
          giveaway.mes = me.id;
          me.react('🎉');
          console.log(giveaway);
          startGiveaway(giveaway, client);
          createGiveaway(giveaway);
          collector.stop();
        });
    } else {
      mes.channel.send('Error');
    }
  });

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
