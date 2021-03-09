const Discord = require('discord.js');
const GuildMemberConfig = require('../../database/models/GuildMemberConfig');

module.exports.run = async (client, message, args) => {
    let start = 0;
    let end = 10;
    let i = 1;
    let re = await dbsw("xp_")

    let embed = new Discord.MessageEmbed()
        .setTitle(`${message.guild.name}'s Xp LeaderBoard`)
        .setDescription(re.slice(start, end).join("\n"))
        .setColor('GREEN')
        .setFooter("If you don't see someone on this list it means they don't have any xp")
        .setTimestamp()

    message.channel.send(embed).then(m => {
        lb(re)

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
                        .setTitle(`${message.guild.name}'s Xp LeaderBoard`)
                        .setDescription(re.slice(start, end).join("\n"))
                        .setColor('GREEN')
                        .setFooter("If you don't see someone on this list it means they don't have any xp")
                        .setTimestamp()
                    )
                } else if (reaction.emoji.name === '▶️') {
                    start += 10
                    end += 10
                    m.edit(
                        new Discord.MessageEmbed()
                        .setTitle(`${message.guild.name}'s Xp LeaderBoard`)
                        .setDescription(re.slice(start, end).join("\n"))
                        .setColor('GREEN')
                        .setFooter("If you don't see someone on this list it means they don't have any xp")
                        .setTimestamp()
                    )
                }

                /*if (start == 0) backArrow.remove()
                    .catch(error => message.channel.send('Failed to remove reactions: ', error));
                if (start > 0 && !backArrow) m.react('◀️')*/

                //console.log(message.channel.messages.cache.find(m => m.id == message.id).reactions)
            })
        }
    })

    async function dbsw() {
        let all = (await GuildMemberConfig.collection.find().sort({xp: -1}).toArray()).filter(g => g.guild == message.guild.id)
        // console.log(all)
        return all.map((value, index) => {
            const w = message.guild.members.cache.get(value.id)
            if (!w || value.xp == 0) return;
            return `#${index+1} - ${w.displayName} - ${value.xp}`
        })
        // let all = db.all().filter(d => d.ID.startsWith(wat)).sort((a, b) => b.data - a.data)
        // let mes = [];
        // let j = 0;
        // all.forEach(a => {
        //     let who = client.users.cache.get(a.ID.split("_")[2])
        //     let where = a.ID.split("_")[1]
        //     if (who && where == message.guild.id) {
        //         j++
        //         if (who.id != message.author.id) {
        //             i++;
        //         } else {
        //             level = i;
        //         }
        //         mes.push(`#${j} - ${who.username} - ${a.data}`);
        //     }
        // })
        // return mes
    }

    /*
    var members = [...message.guild.members.cache.array()];
    var membersAmount = members.length;

    let mes = [];

    for (let i = 0; i < membersAmount; i++) {
        var amount = db.fetch(`xp_${message.guild.id}_${members[i].id}`);

        if (amount == null) continue;

        mes.push({
            name: members[i].user.username,
            amount: amount
        });
    }

    mes.sort((a, b) => b.amount - a.amount);

    var realArr = []

    mes.forEach(m => realArr.push(`${m.name} - ${m.amount}`));
    var finalLb = realArr.join("\n")

    let embed = new Discord.MessageEmbed()
        .setTitle(`**${message.guild.name}** xp LeaderBoard`)
        .setDescription(finalLb)
        .setFooter("If you don't see someone on this list it means they don't have any xp")
        .setColor("RANDOM")

    message.channel.send(embed)*/
};