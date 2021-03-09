const randomPuppy = require('random-puppy');
const got = require('got')
const { MessageEmbed } = require('discord.js');

module.exports.run = (client, message, args) => {

    let memereddits = [
        'meme',
        'memes',
        'animemes',
        'dankmemes',
        'dankmeme',
        'wholesomememes',
        'MemeEconomy',
        'techsupportanimals',
        'meirl',
        'me_irl',
        '2meirl4meirl',
        'AdviceAnimals',
        'ComedyCemetery',
        'PrequelMemes',
    ];

    let memesubreddit = memereddits[Math.floor(Math.random() * memereddits.length)];
    /*message.channel.send(`Meme From r/${memesubreddit}`);

    randomPuppy(memesubreddit)
        .then(async (url) => {
            await message.channel
                .send({
                    files: [{
                        attachment: url,
                        name: 'meme.png',
                    }, ],
                });
        }).catch((err) => {
            console.error(
                `Error in server ${message.guild.name} on channel ${message.channel.name}\n` +
                err
            );
            message.channel.send(
                'Error. Failed to send image. File size is too large'
            );
        });*/

    let embed = new MessageEmbed
    got(`https://www.reddit.com/r/${memesubreddit}/random/.json`).then(res => {
        let content = JSON.parse(res.body)
        let permalink = content[0].data.children[0].data.permalink
        let url = `https://reddit.com${permalink}`
        let image = content[0].data.children[0].data.url
        let title = content[0].data.children[0].data.title
        let upvotes = content[0].data.children[0].data.ups
        let downvotes = content[0].data.children[0].data.downs
        let numOfComments = content[0].data.children[0].data.num_comments
        
        embed
            .setTitle(`${title}`)
            .setURL(`${url}`)
            .setImage(image)
            .setDescription(`Meme from r/${memesubreddit}`)
            .setColor("RANDOM")
            .setFooter(`👍 ${upvotes} 👎 ${downvotes}`)
        message.channel.send(embed)
    })

}