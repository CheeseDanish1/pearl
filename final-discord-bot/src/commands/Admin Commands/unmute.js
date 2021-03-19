module.exports.run = (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_ROLES')) {
    message.channel.send("You don't have permission to use this command");
    return;
  }
  if (!message.guild.me.hasPermission('MANAGE_ROLES'))
    return message.channel.send('I do not have permission to manage roles.');

  const user = message.mentions.members.first();

  if (!user) return message.channel.send('Mention who you want to unmute');

  let muterole = message.guild.roles.cache.find(x => x.name === 'Muted');
  if (!muterole)
    return message.channel.send('Server does not have mute role set up');
  if (!user.roles.cache.has(muterole))
    return message.channel.send('User is not muted');

  user.roles.remove(muterole);

  message.channel.send(`**${user.user.username}** is unmuted`);

  user.send(`You are now unmuted from **${message.guild.name}**`);
};

module.exports.info = {
  name: 'unmute',
  alias: ['unshut'],
  usage: '<p>Unmute [Member]',
  example: '<p>Kick @Jimmy#7932',
  description: 'Kick a member from your server',
  category: 'moderation',
};
