module.exports.run = (client, message, args) => {
  let user = message.mentions.users.first() || client.users.cache.get(args[0]);

  if (!user)
    return message.channel.send(
      `You did not mention a user, or you gave an invalid id`
    );
  if (!args.slice(1).join(' '))
    return message.channel.send('You did not specify your message');

  const embed = new Discord.MessageEmbed()
    .setTitle(`New message from ${message.author.username}`)
    .setDescription(args.slice(1).join(' '))
    .setColor('GREEN')
    .setTimestamp();

  user
    .send(embed)
    .catch(() => message.channel.send('That user could not be DMed!'))
    .then(() => message.channel.send(`Sent a message to ${user.user.tag}`));
};

module.exports.info = {
  name: 'dm',
  alias: ['directmessage'],
  usage: '<p>Dm [User] [Message]',
  example: '<p>Dm @Jimmy#7932 Hello',
  description: 'Dm a friend or a server member threw pearl',
  category: 'misc',
};
