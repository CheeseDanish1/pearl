const Discord = require('discord.js');
const {getGuild} = require('../Storage/database');

module.exports = async (client, role) => {
  const Guild = await getGuild(role.guild.id);
  let y = Guild.logging.events.includes('Role deletion');
  if (!y) return;
  let x = Guild.logging.channel;
  x = role.guild.channels.cache.get(x);
  if (!x) return;

  let embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setAuthor('Role Deleted', role.guild.iconURL)
    .addField('Role Name', role.name)
    .addField('Role Id', role.id + `\n**----------------------**`)
    .setTimestamp();

  x.send(embed).catch();
};
