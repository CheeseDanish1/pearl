const Discord = require('discord.js');

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
        // {name: '\u200B', value: '\u200B', inline: true},

        {
          name: 'Cubing Commands',
          value: `${prefix}Help Scramble`,
          inline: true,
        }
      )
      // .setColor('GREEN')
      .setTimestamp();
    return message.channel.send(helpEmbed);
  }
  const r = [...client.commands.entries()];
  let help = r.filter(f => {
    if (!f[1].info) return false;
    return f[1].info.category.toLowerCase() === args[0].toLowerCase();
  });
  if (!help.length) {
    help = client.commands.get(args[0].toLowerCase()).info;
    if (!help) return message.channel.send('Command not found');
    const embed = new Discord.MessageEmbed()
      .setTitle(`${p(help.name)} Info`)
      .addField('Description', help.description.replace(/<p>/g, prefix))
      .addField('Usage', help.usage.replace(/<p>/g, prefix))
      .addField('Category', p(help.category))
      .setFooter(
        `Do ${prefix}Help ${p(help.category)} for more ${
          help.category
        } commands`
      );

    // .setColor('GREEN');
    help.usage == help.example
      ? ''
      : embed.addField('Example', help.example.replace(/<p>/g, prefix));
    return message.channel.send(embed);
  }

  help = help.map(r => r[1].info);
  const embed = new Discord.MessageEmbed()
    .setTitle(`${p(help[0].category)} Commands`)
    .setDescription(help.map(h => `\`${prefix}${p(h.name)}\``).join(', '))
    .setFooter(`Do ${prefix}Help [Command] for more info`)
    .setTimestamp();

  message.channel.send(embed);

  function p(str) {
    return str
      .split(' ')
      .map(s => s[0].toUpperCase() + s.substring(1))
      .join(' ');
  }
};

// const Discord = require('discord.js');
// const fs = require('fs');

// module.exports.run = (client, message, args, {prefix}) => {

//     let embed1 = new Discord.MessageEmbed()
//       .setTitle('Help Categories')
//       .addFields(
//         {
//           name: 'Admin Commands',
//           value: `${prefix}Help Admin`,
//           inline: true,
//         },
//         {
//           name: 'Admin Commands 2',
//           value: `${prefix}Help Admin2`,
//           inline: true,
//         },
//         {
//           name: 'Economy Commands',
//           value: `${prefix}Help Economy`,
//           inline: true,
//         },
//         {
//           name: 'Miscellaneous Commands',
//           value: `${prefix}Help Misc`,
//           inline: true,
//         },
//         {
//           name: 'Fun Commands',
//           value: `${prefix}Help Fun`,
//           inline: true,
//         },
//         {
//           name: 'Music Commands',
//           value: `${prefix}Help Music`,
//           inline: true,
//         },
//         {
//           name: 'Logging Commands',
//           value: `${prefix}Help Logging`,
//           inline: true,
//         },
//         {
//           name: 'Xp Commands',
//           value: `${prefix}Help Xp`,
//           inline: true,
//         },
//         {
//           name: 'Cubing Commands',
//           value: `${prefix}Help Cubing`,
//           inline: true,
//         }
//       )
//       .setColor('GREEN')
//       .setTimestamp();

//     if (!args[0]) return message.channel.send(embed1)

//     var idk = args[0].toUpperCase()

//     var admin = fs.readFileSync('src/Storage/helpAdmin.txt', 'utf-8');
//     var admin2 = fs.readFileSync('src/Storage/helpAdmin2.txt', 'utf-8');
//     var economy = fs.readFileSync('src/Storage/helpEconomy.txt', 'utf-8');
//     var fun = fs.readFileSync('src/Storage/helpFun.txt', 'utf-8');
//     var miscellaneous = fs.readFileSync('src/Storage/helpMisc.txt', 'utf-8');
//     var scramble = fs.readFileSync('src/Storage/helpScramble.txt', 'utf-8');
//     var log = fs.readFileSync('src/Storage/helpLogging.txt', 'utf-8');
//     var music = fs.readFileSync('src/Storage/music.txt', 'utf-8');
//     var xp = fs.readFileSync('src/Storage/helpxp.txt', 'utf-8');

//     if (!idk) {
//         message.channel.send(embed1);

//     } else if (idk == 'ECONOMY') {

//         let embed2 = new Discord.MessageEmbed()
//             .setTitle("Economy Commands")
//             .setDescription(economy)
//             .setColor("RANDOM")
//             .setTimestamp()
//         message.channel.send(embed2)
//         return;

//     } else if (idk == 'ADMIN') {

//         let embed3 = new Discord.MessageEmbed()
//             .setTitle("Admin Commands")
//             .setDescription(admin)
//             .setColor("RANDOM")
//             .setTimestamp()
//         message.channel.send(embed3)
//         return;

//     } else if (idk == 'ADMIN2') {

//         let embed9 = new Discord.MessageEmbed()
//             .setTitle("Admin Commands Page 2")
//             .setDescription(admin2)
//             .setColor("RANDOM")
//             .setTimestamp()
//         message.channel.send(embed9)
//         return;

//     } else if (idk == 'FUN') {

//         let embed4 = new Discord.MessageEmbed()
//             .setTitle("Fun Commands")
//             .setDescription(fun)
//             .setColor("RANDOM")
//             .setTimestamp()
//         message.channel.send(embed4)
//         return;

//     } else if (idk == 'MISC' || args[0] == 'MISCELLANEOUS') {

//         let embed5 = new Discord.MessageEmbed()
//             .setTitle("Miscellaneous Commands")
//             .setDescription(miscellaneous)
//             .setColor("RANDOM")
//             .setTimestamp()
//         message.channel.send(embed5)
//         return;

//     } else if (idk == 'CUBING' || idk == 'SCRAMBLE') {

//         let embed6 = new Discord.MessageEmbed()
//             .setTitle("Cubing Commands")
//             .setDescription(scramble)
//             .setColor("RANDOM")
//             .setTimestamp()
//         message.channel.send(embed6)
//         return;

//     } else if (idk == "LOGGING" || idk == "LOG") {

//         let embed7 = new Discord.MessageEmbed()
//             .setTitle("Logging Commands")
//             .setDescription(log)
//             .setColor("RANDOM")
//             .setTimestamp()
//         message.channel.send(embed7)
//         return;

//     } else if (idk == "XP") {

//         let embed8 = new Discord.MessageEmbed()
//             .setTitle("Xp Commands")
//             .setDescription(xp)
//             .setColor("RANDOM")
//             .setTimestamp()
//         message.channel.send(embed8)
//         return;

//     } else if (idk == "MUSIC") {

//         let embed9 = new Discord.MessageEmbed()
//             .setTitle("Music Commands")
//             .setDescription(music)
//             .setColor("RANDOM")
//             .setTimestamp()
//         message.channel.send(embed9)

//         return;
//     } else {
//         message.channel.send(embed1)
//         return;
//     }
// }
module.exports.info = {
  name: 'help',
  alias: [],
  usage: '<p>Help [Category | Command]',
  example: '<p>Help Warnings\n<p>Help Moderation',
  description: 'Get help info on command or categoys',
  category: 'misc',
};
