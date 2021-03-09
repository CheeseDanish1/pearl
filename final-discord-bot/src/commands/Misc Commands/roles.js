const Discord = require('discord.js');

module.exports.run = (client, message, args) => {

    let start = 0;
    let end = 10;

    const roles = message.guild.roles.cache.map(r => r.toString())

    let embed = new Discord.MessageEmbed()
        .setTitle(`${message.guild.name}'s Roles`)
        .setColor('GREEN')
        .setDescription(roles.slice(start, end).join("\n-----------------------------\n"))

    message.channel.send(embed).then(m => {
        lb(arr)

        function lb(mes) {
            //m.react('◀️').then(me => m.react('▶️'));
            if (mes.length> end) m.react('◀️').then(me => m.react('▶️'));

            const filter = (reaction, user) => user.id == message.author.id;
            //console.log(message.channel.messages.cache)
            /*let backArrow = message.channel.messages.cache.find(m => m.id == message.id).reactions.cache.get('◀️');
            let frontArrow = message.channel.messages.cache.find(m => m.id == message.id).reactions.cache.get('▶️');*/

            const collector = m.createReactionCollector(filter, {
                time: 60000,
            });

            collector.on('collect', async (reaction) => {

                if (reaction.emoji.name === '◀️') {
                    start -= 10
                    end -= 10
                    m.edit(new Discord.MessageEmbed()
                        .setTitle(`${message.guild.name}'s Roles`)
                        .setColor('GREEN')
                        .setDescription(mes.slice(start, end).join("\n"))
                    )
                } else if (reaction.emoji.name === '▶️') {
                    start += 10
                    end += 10
                    m.edit(
                        new Discord.MessageEmbed()
                        .setTitle(`${message.guild.name}'s Roles`)
                        .setColor('GREEN')
                        .setDescription(mes.slice(start, end).join("\n"))
                    )
                }

                /*if (start == 0) backArrow.remove()
                    .catch(error => message.channel.send('Failed to remove reactions: ', error));
                if (start > 0 && !backArrow) m.react('◀️')*/

                //console.log(message.channel.messages.cache.find(m => m.id == message.id).reactions)
            })
        }
    })

}