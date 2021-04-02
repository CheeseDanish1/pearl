const {MessageEmbed} = require('discord.js');
const {getGuild} = require('../Storage/database');

module.exports = async (client, message) => {
  if (!message.author || !message.guild || message.author.bot) return;

  const Guild = await getGuild(message.guild.id);

  logging();
  snipe();

  async function logging() {
    let y = Guild.logging.events.includes('Message deletion');
    if (!y) return;
    let x = Guild.logging.channel;
    x = message.guild.channels.cache.get(x);
    if (!x) return;

    if (message.content.startsWith(':game_die:')) return;

    let m2 = message.author.toString() || 'Error';
    let m3 = message.content || 'Error';
    let m4 = message.channel.toString() || 'Error';

    let embed = new MessageEmbed()
      .setColor('GREEN')
      // .setAuthor(m2, message.author.avatarURL())
      // .setTitle("Message")
      // .addField('User', m2)
      // .addField('Message', m3)
      // .addField('Channel', m4)
      // .setTitle("Message Deleted")
      .setTitle(`**${m2}** deleted a message in ${m4}`)
      .setDescription(m3)
      .setTimestamp();

    x.send(embed).catch();
  }

  async function snipe() {
    let snipe = {
      content: message.content,
      author: `${message.author.username}#${message.author.discriminator}`,
      id: message.channel.id,
    };

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
