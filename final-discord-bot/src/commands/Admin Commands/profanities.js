const GuildConfig = require('../../database/models/GuildConfig');

module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You do not have permission to use this command");

    const {id} = message.guild
    const Guild = await GuildConfig.findOne({id})
    let status = "Enabled"

    if (Guild.ops.profanities) {
        await Guild.updateOne({"ops.profanities": false})
        status = "Disabled"
    } 
    else await Guild.updateOne({"ops.profanities": true})

    message.channel.send(`${status} swear detection accross the server`)
}