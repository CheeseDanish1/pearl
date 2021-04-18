const Discord = require('discord.js');
const {getMostLikely} = require('../../Storage/functions');

module.exports.run = async (client, message, args, {prefix}) => {
  if (!args[0]) {
    let helpEmbed = new Discord.MessageEmbed()
      .setTitle('Help Categories')
      .addFields(
        {
          name: 'Admin Commands',
          value: `${prefix}Help Admin`,
          inline: true,
        },
        {
          name: 'Moderation Commands',
          value: `${prefix}Help Moderation`,
          inline: true,
        },
        {
          name: 'Economy Commands',
          value: `${prefix}Help Economy`,
          inline: true,
        },
        {
          name: 'Miscellaneous Commands',
          value: `${prefix}Help Misc`,
          inline: true,
        },
        {
          name: 'Fun Commands',
          value: `${prefix}Help Fun`,
          inline: true,
        },
        {
          name: 'Music Commands',
          value: `${prefix}Help Music`,
          inline: true,
        },
        {
          name: 'Logging Commands',
          value: `${prefix}Help Logging`,
          inline: true,
        },
        {
          name: 'Xp Commands',
          value: `${prefix}Help Xp`,
          inline: true,
        },
        {
          name: 'Cubing Commands',
          value: `${prefix}Help Scramble`,
          inline: true,
        }
      );
    // .setTimestamp();
    // .setDescription('[test](https://youtube.com)')
    // .setFooter('[test](https://youtube.com)');
    return message.channel.send(helpEmbed);
  }
  const r = [...client.commands.entries()];
  let help = r.filter(f => {
    if (!f[1].info) return false;
    if (!f[1].info.category) console.log(f[1]);
    return f[1].info.category.toLowerCase() === args[0].toLowerCase();
  });

  if (!help.length) {
    help =
      client.commands.get(args[0].toLowerCase()) ||
      [...client.commands.entries()]
        .map(r => r[1])
        .find(r => r.info.alias.includes(args[0].toLowerCase()));

    const allCmds = [...client.commands.entries()].map(a => a[0].toLowerCase());

    if (!help)
      return message.channel.send(
        `That command does not exist, did you mean \`${
          prefix + (await getMostLikely(args[0].toLowerCase(), allCmds))[0][0]
        }\``
      );
    help = help.info;
    const embed = new Discord.MessageEmbed()
      .setTitle(`${p(help.name)} Info`)
      .addField('Description', help.description.replace(/<p>/g, prefix))
      .addField('Usage', help.usage.replace(/<p>/g, prefix));
    help.usage == help.example
      ? ''
      : embed.addField('Example', help.example.replace(/<p>/g, prefix));
    embed
      .addField('Category', p(help.category))
      .setFooter(
        `Do ${prefix}Help ${p(help.category)} for more ${
          help.category
        } commands`
      );

    return message.channel.send(embed);
  }
  help = help.map(r => r[1].info);
  const embed = new Discord.MessageEmbed()
    .setTitle(`${p(help[0].category)} Commands`)
    .setFooter(`Do ${prefix}Help [Command] for more info`)
    .setTimestamp();
  help
    .filter(h => !h.type)
    .forEach(h =>
      embed.addField(p(h.name), h.description.replace(/<p>/g, prefix))
    );

  message.channel.send(embed);

  function p(str) {
    return str
      .split(' ')
      .map(s => s[0].toUpperCase() + s.substring(1))
      .join(' ');
  }
};
module.exports.info = {
  name: 'help',
  alias: [],
  usage: '<p>Help [Category | Command]',
  example: '<p>Help Warnings\n<p>Help Moderation',
  description: 'Get information on command or categoys',
  category: 'misc',
};
