const Discord = require('discord.js');
const GuildConfig = require('../database/models/GuildConfig');
const fs = require('fs');

module.exports = async (client, messages) => {
  const guild = messages.random().guild;
  const Guild =
    (await GuildConfig.findOne({id: guild.id})) ||
    (await GuildConfig.create({id: guild.id}));

  let y = Guild.logging.events.includes('Bulk deletes');
  if (!y) return;
  let x = Guild.logging.channel;
  x = guild.channels.cache.get(x);
  if (!x) return;

  await messages
    .array()
    .reverse()
    .forEach(m => {
      if (!m.author) return;
      let x = m.createdAt.toString().split(' ');
      fs.appendFile(
        'messagebulkdelete.txt',
        `[${m.author.tag}], [#${m.channel.name}]: ["${m.content}"], created at [${x[0]} ${x[1]} ${x[2]} ${x[3]} ${x[4]}]\n\n`,
        function (err) {
          if (err) throw err;
        }
      );
    });

  let embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setAuthor('Message Bulk Delete', messages.random().guild.iconURL)
    .addField('Channel', messages.random().channel)
    .addField(
      'Messages Count',
      messages.array().length + `\n**----------------------**`
    )
    .setTimestamp();

  await x.send(embed).catch();

  await x.send(`Here is the log file for the deleted messages: \n`).catch();

  await x
    .send({
      files: [
        {
          attachment: 'messagebulkdelete.txt',
        },
      ],
    })
    .catch();

  fs.unlink('messagebulkdelete.txt', function (err) {
    if (err) throw err;
  });
};
