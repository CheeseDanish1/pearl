const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
    let start = 0;
    let end = 10;
    let mes = message.guild.members.cache.filter(m => !m.user.bot).map(m => m.user.username).sort()
    let embed = new Discord.MessageEmbed()
        .setTitle(`${message.guild.name} Members`)
        .setDescription(mes.slice(start, end).join("\n"))
        .setColor("GREEN")
        .setTimestamp()

    message.channel.send(embed).then(m => {
        lb(mes)
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
                        .setTitle(`${message.guild.name} Members`)
                        .setDescription(mes.slice(start, end).join("\n"))
                        .setColor("GREEN")
                        .setTimestamp())
                } else if (reaction.emoji.name === '▶️') {
                    start += 10
                    end += 10
                    m.edit(new Discord.MessageEmbed()
                        .setTitle(`${message.guild.name} Members`)
                        .setDescription(mes.slice(start, end).join("\n"))
                        .setColor("GREEN")
                        .setTimestamp())
                }

                /*if (start == 0) backArrow.remove()
                    .catch(error => message.channel.send('Failed to remove reactions: ', error));
                if (start > 0 && !backArrow) m.react('◀️')*/

                //console.log(message.channel.messages.cache.find(m => m.id == message.id).reactions)
            })
        }
    })
}