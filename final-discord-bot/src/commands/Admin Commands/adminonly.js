module.exports.run = async (client, message, args, ops) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You don\'t have permission to use this command');

    const {id} = message.guild
    const Guild = ops.GuildConfig

    let status = Guild.ops.adminOnly

    if (!status) {
        await Guild.updateOne({"ops.adminOnly": true})
        // db.set(`adminonly_${message.guild.id}`, "true");
        message.channel.send("Enabled admin only mode");
    } else if (status == "true" || status == true) {
        // db.set(`adminonly_${message.guild.id}`, "false");
        await Guild.updateOne({"ops.adminOnly": false})
        message.channel.send("Disabled admin only mode");
    } else {
        message.channel.send("Error, please report this with this feedback command");
    }
}