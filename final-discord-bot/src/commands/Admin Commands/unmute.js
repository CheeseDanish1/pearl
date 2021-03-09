module.exports.run = (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_ROLES')) {
        message.channel.send(
            "You don't have Permission to use this command"
        );
        return;
    }
    if (!message.guild.me.hasPermission('MANAGE_ROLES')) {
        message.channel.send('I do not have permission to manage roles.');
        return;
    }
    const user = message.mentions.members.first();

    if (!user) {
        message.channel.send(
            'Please mention the member to who you want to unmute'
        );
        return;
    }
    let muterole = message.guild.roles.cache.find(
        (x) => x.name === 'Muted'
    );

    if (user.roles.cache.has(muterole)) {
        message.channel.send(
            'Given User does not have mute role, so what i am suppose to take'
        );
        return;
    }
    user.roles.remove(muterole);

    message.channel.send(
        `**${message.mentions.users.first().username}** is unmuted`
    );

    user.send(`You are now unmuted from **${message.guild.name}**`);
}