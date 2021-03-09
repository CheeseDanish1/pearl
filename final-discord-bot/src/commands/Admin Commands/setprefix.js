const GuildConfigs = require('../../database/models/GuildConfig')

module.exports.run = async (client, message, args, {GuildConfig}) => {
    var prefix = args[0];
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You do not have permission to use this command");
    if (!prefix) return message.channel.send("Please give the new prefix you want to set");
    if (args[1]) return message.channel.send("You can not have a double prefix");
    if (prefix.length > 4) return message.channel.send(`Your prefix can't be more than 4 characters`);

    // var oldPrefix = db.fetch(`prefix_${message.guild.id}`);
    // if (oldPrefix == null) oldPrefix = `>`;

    // db.delete(`prefix_${message.guild.id}`);
    // db.set(`prefix_${message.guild.id}`, newPrefix);

    await GuildConfig.updateOne({prefix}, {new: true})
    
    const _ = `Successfully updated server prefix to **${prefix}**`
    message.channel.send(_)

    // let embed = new Discord.MessageEmbed()
    //     .setTitle(`${message.guild.name} Set A New Prefix`)
    //     .addFields(
    //         { name: "Who Set It", value: message.author.tag },
    //         { name: "Old Prefix", value: oldPrefix }, 
    //         { name: "New Prefix", value: newPrefix }, 
    //         { name: "Status", value: "Success" }
    //     )
    //     .setTimestamp();

    // message.channel.send(embed);
};