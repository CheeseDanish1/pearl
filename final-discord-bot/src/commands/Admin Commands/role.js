const {MessageEmbed} = require('discord.js');
const {
  colourNameToHex
} = require('../../Storage/functions')


module.exports.run = async (client, message, args, {prefix}) => {
  if (!message.member.permissions.has('ADMINISTRATOR'))
    return message.channel.send(
      `You do not have permission to use this command`
    );

  if (!args[0]) {
    let mes = `${prefix}Role Create - Create's A Role - Usage >Role Create <Role Hex Code> <Role Name>\n`;

    mes += `${prefix}Role Delete - Delete's A Role - Usage >Role Delete <Role Name Or Id>\n`;

    mes += `${prefix}Role Give - Give's Someone A Role - Usage >Role Give <@User> <@Role>\n`;

    mes += `${prefix}Role Remove - Remove's Someone From A Role - Usage >Role Remove <@User> <@Role>`;
    return message.channel.send(mes);
  }

  if (args[0].toLowerCase() == 'create') {
    let rName = args.slice(2).join(' ');
    let rColor;
    args.forEach(arg => {
      if (arg.startsWith('#')) {
        rColor = arg;
      } else if (colourNameToHex(arg) != false) {
        rColor = arg;
      } else {
        const randomHexColorCode = () => {
          let n = (Math.random() * 0xfffff * 1000000).toString(16);
          return '#' + n.slice(0, 6);
        };
        rColor = randomHexColorCode();
      }
    });
    if (!rName)
      return message.channel.send(`You did not specify a name for your role!`);
    if (!rColor)
      return message.channel.send(`You did not specify a color for your role!`);
    if (rColor >= 16777215)
      return message.channel.send(
        `That hex color range was too big! Keep it between 0 and 16777215`
      );
    if (rColor <= 0)
      return message.channel.send(
        `That hex color range was too small! Keep it between 0 and 16777215`
      );
    //rName = rName.replace(`${rColor}`, ``);
    let rNew = await message.guild.roles.create({
      data: {
        name: rName,
        color: rColor,
      },
    });
    const Embed = new MessageEmbed()
      .setTitle(`New role!`)
      .setDescription(
        `${message.author.username} has created the role "${rName}"\nIts Hex Color Code: ${rColor}\nIts ID: ${rNew.id}`
      )
      .setColor(rColor);
    message.channel.send(Embed);
  } else if (args[0].toLowerCase() == 'delete') {
    let roleDelete =
      message.guild.roles.cache.get(args[1]) ||
      message.guild.roles.cache.find(
        r => r.name.toLowerCase() == args.slice(1).join(' ').toLowerCase()
      );
    if (!roleDelete)
      return message.channel.send(
        `You did not specify the name or id of the role you wish to delete!`
      );
    roleDelete
      .delete('Ok')
      .then(r => {
        const Embed1 = new MessageEmbed()
          .setTitle(`Deleted role!`)
          .setColor(roleDelete.color)
          .setDescription(
            `${message.author.username} has deleted the role "${roleDelete.name}"\nIts ID: ${roleDelete.id}\nIts Hex Color Code: ${roleDelete.color}`
          );
        message.channel.send(Embed1);
      })
      .catch(e => message.channel.send(`Error\n${e}`));
  } else if (args[0].toLowerCase() == 'give') {
    if (args[2] && isNaN(args[2])) role = message.mentions.roles.first();
    if (args[2] && !isNaN(args[2])) {
      role = message.guild.roles.cache.get(args[2]);
    }
    let user;
    if (args[1] && isNaN(args[1])) user = message.mentions.users.first();
    if (args[1] && !isNaN(args[1])) {
      user = client.users.cache.get(args[1]);

      if (!message.guild.members.cache.has(args[1]))
        return message.reply('User not found');
    }
    if (!user) return message.reply(':x: You must mention a user');
    if (!role) return message.reply(':x: You must mention role');
    if (message.guild.members.cache.get(user.id).roles.cache.has(role.id))
      return message.reply(':x: This person already has that role');
    message.guild.members.cache
      .get(user.id)
      .roles.add(role.id)
      .catch(e => message.reply(e));
    message.reply('Role Added Successfully');
  } else if (args[0].toLowerCase() == 'remove') {
    let role;
    if (args[2] && isNaN(args[2])) role = message.mentions.roles.first();
    if (args[2] && !isNaN(args[2])) {
      role = message.guild.roles.cache.get(args[2]);
    }
    let user;
    if (args[1] && isNaN(args[1])) user = message.mentions.users.first();
    if (args[1] && !isNaN(args[1])) {
      user = client.users.cache.get(args[1]);

      if (!message.guild.members.cache.has(args[1]))
        return message.reply('User not found');
    }
    if (!user) return message.reply(':x: You must mention a user');
    if (!role) return message.reply(':x: You must mention role');
    if (!message.guild.members.cache.get(user.id).roles.cache.has(role.id))
      return message.reply(':x:');
    message.guild.members.cache
      .get(user.id)
      .roles.remove(role.id)
      .catch(e => message.reply(e));
    message.reply('Role Removed Successfully');
  }
};