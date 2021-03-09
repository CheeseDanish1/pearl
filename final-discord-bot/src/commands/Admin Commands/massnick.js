
module.exports.run = (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send("You don't have Permission to use this command");
    if (!message.guild.me.hasPermission('MANAGE_GUILD')) return message.channel.send('**' + message.author.username + "**I don't have permission To Ban People");
    let nickname = args.join(" ")
    if (nickname.toLowerCase() == "reset") message.guild.members.cache.forEach(m => { if(m.nickname == null) return; m.setNickname(null)})
    else {
        message.guild.members.cache.forEach(m => { m.setNickname(nickname)})
    }
    
    
}