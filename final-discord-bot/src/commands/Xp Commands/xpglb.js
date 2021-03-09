const Discord = require('discord.js');
const UserConfig = require('../../database/models/UserConfig');

module.exports.run = async (client, message, args) => {
    let start = 0;
    let end = 10;
    let res = await dbsw()
    let embed = new Discord.MessageEmbed()
        .setTitle("Global Xp LeaderBoard")
        .setDescription(res.slice(start, end).join("\n"))
        .setColor('GREEN')
        .setFooter("If you don't see someone on this list it means they don't have any xp")
        .setTimestamp()

    message.channel.send(embed).then(m => {
        lb(res)

        function lb(mes) {
            //m.react('◀️').then(me => m.react('▶️'));
            if (mes.length > end) m.react('◀️').then(me => m.react('▶️'));

            const filter = (reaction, user) => user.id == message.author.id;

            const collector = m.createReactionCollector(filter, {
                time: 60000,
            });

            collector.on('collect', async (reaction) => {
                //console.log(start, end, mes.length)
                if (reaction.emoji.name === '◀️') {
                    if (start != 0) {
                        start -= 10
                        end -= 10
                        m.edit(new Discord.MessageEmbed()
                            .setTitle("Global Xp LeaderBoard")
                            .setDescription(res.slice(start, end).join("\n"))
                            .setColor('GREEN')
                            .setFooter("If you don't see someone on this list it means they don't have any xp")
                            .setTimestamp()
                        )
                    }
                } else if (reaction.emoji.name === '▶️') {
                    start += 10
                    end += 10
                    m.edit(
                        new Discord.MessageEmbed()
                        .setTitle("Global Xp LeaderBoard")
                        .setDescription(res.slice(start, end).join("\n"))
                        .setColor('GREEN')
                        .setFooter("If you don't see someone on this list it means they don't have any xp")
                        .setTimestamp()
                    )

                }
            })
        }
    })

    async function dbsw() {
        let all = await UserConfig.collection.find().sort({xpg: -1}).toArray()
        return all.map((value, index) => {
            const w = client.users.cache.get(value.id)
            if (!w || value.xpg == 0) return;
            return `#${index+1} - ${w.username} - ${value.xpg}`
        })
        // let mes = [];
        // let j = 0;
        // all.forEach(a => {
        //     let who = client.users.cache.get(a.ID.split("_")[1])
        //     if (who) {
        //         j++
        //         mes.push(`#${j} - ${who.username} - ${a.data}`);
        //     }
        // })
        // return mes
    }
};