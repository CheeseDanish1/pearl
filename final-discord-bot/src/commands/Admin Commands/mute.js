module.exports.run = (client, message, args) => {

    if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send("You don't have Permission to use this command");


    if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send('I do not have permission to mute people.');
    
    const user = message.mentions.members.first();

    if (!user) return message.channel.send('Please mention the member to who you want to mute');

    if (user.id === message.author.id) return message.channel.send("I won't mute you -_-");

    let muterole = message.guild.roles.cache.find((x) => x.name === 'Muted');
    if (!muterole) return message.channel.send('This server do not have role with name `Muted`');
    
    if (user.roles.cache.has(muterole)) return message.channel.send('Given User is already muted');
    
    user.roles.add(muterole);
    const reason = message.content.split(' ').slice(2).join(' ');
    message.channel.send(`You muted **${message.mentions.users.first().username}** For \`${reason}\``);

    user.send(`You are muted in **${message.guild.name}** For \`${reason}\``).catch(err => message.channel.send(`Error\n${err}`))

}