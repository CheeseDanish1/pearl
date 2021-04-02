const {setAfk} = require('../../Storage/database');
const {MessageEmbed} = require('discord.js');
module.exports.run = (client, message, args) => {
  let status = args[0] ? args.join(' ') : 'None';
  const embed = new MessageEmbed()
    .setTitle(':white_check_mark: Your are now afk!')
    .setDescription(`Your status: **\`${status}\`**`)
    .setFooter(`I will notify people who ping you that you are afk`)
    .setColor('GREEN');
  message.channel.send(embed);
  setAfk(status, message.member.id, message.guild.id);
};

module.exports.info = {
  name: 'afk',
  alias: ['offline'],
  usage: '<p>Afk [Status]',
  example: '<p>Afk Going to sleep',
  description: 'Set an afk status to be shown when someone pings you',
  category: 'misc',
};
