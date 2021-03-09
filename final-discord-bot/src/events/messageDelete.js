const db = require('quick.db');
const {Message, Client, MessageEmbed} = require('discord.js');
const GuildConfig = require('../database/models/GuildConfig');

/**
 *
 * @param {Client} client
 * @param {Message} message
 */

module.exports = async (client, message) => {
  if (!message.author || !message.guild || message.author.bot) return;

  const Guild = await GuildConfig.findOne({id: message.guild.id});

  logging();
  snipe();

  async function logging() {
    let y = Guild.logging.events.includes('Message deletion');
    if (!y) return;
    let x = Guild.logging.channel;
    x = message.guild.channels.cache.get(x);
    if (!x) return;

    if (message.content.startsWith(':game_die:')) return;

    let m2;
    let m3;
    let m4;

    if (!message.author.tag) m2 = 'Error';
    else m2 = message.author.tag;
    if (!message.content) m3 = 'Error';
    else m3 = message.content;
    if (!message.channel) m4 = 'Error';
    else m4 = message.channel;

    let embed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(m2, message.author.avatarURL())
      .addField('User', m2)
      .addField('Message', m3)
      .addField('Channel', m4)
      .setTimestamp();

    x.send(embed).catch();
  }

  async function snipe() {
    let snipe = {
      content: message.content,
      author: `${message.author.username}#${message.author.discriminator}`,
      id: message.channel.id,
    };

    console.log(snipe);

    if (Guild.snipe.find(c => c.id == message.channel.id)) {
      return await Guild.updateOne(
        {$set: {'snipe.$[s]': snipe}},
        {arrayFilters: [{'s.id': snipe.id}]}
        // {$pull: {'snipe.$.id': snipe.id}, /* $push: {snipe} */},
        // {}
      );
    }

    await Guild.updateOne({$push: {snipe: snipe}});
  }
};
