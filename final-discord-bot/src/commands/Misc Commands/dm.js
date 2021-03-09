module.exports.run = (client, message, args) => {

    let user = message.mentions.members.first() || client.users.cache.get(args[0])

    if (!user) return message.channel.send(`You did not mention a user, or you gave an invalid id`);
    if (!args.slice(1).join(" ")) return message.channel.send("You did not specify your message");

    if (user == message.mentions.members.first()) {
        user.user.send(args.slice(1).join(" "))
            .catch(() => message.channel.send("That user could not be DMed!"))
            .then(() => message.channel.send(`Sent a message to ${user.user.tag}`));
        return;
    }
    if (user == client.users.cache.get(args[0])) {
        user.send(`Message from ${message.author.username}\n\n${args.slice(1).join(" ")}`)
        .catch(() => message.channel.send("That user could not be DMed!"))
        .then(() => message.channel.send(`Sent a message to ${user.tag}`));
    return;
    }
}