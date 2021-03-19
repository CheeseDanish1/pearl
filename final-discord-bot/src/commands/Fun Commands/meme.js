const randomPuppy = require('random-puppy');
const got = require('got');
const {MessageEmbed} = require('discord.js');

module.exports.run = (client, message, args) => {
  let memereddits = [
    'meme',
    'memes',
    // 'animemes',
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

  let memesubreddit =
    memereddits[Math.floor(Math.random() * memereddits.length)];

  let embed = new MessageEmbed();
  got(`https://www.reddit.com/r/${memesubreddit}/random/.json`).then(res => {
    let content = JSON.parse(res.body);
    let permalink = content[0].data.children[0].data.permalink;
    let url = `https://reddit.com${permalink}`;
    let image = content[0].data.children[0].data.url;
    let title = content[0].data.children[0].data.title;
    let upvotes = content[0].data.children[0].data.ups;
    let downvotes = content[0].data.children[0].data.downs;
    let numOfComments = content[0].data.children[0].data.num_comments;

    embed
      .setTitle(`${title}`)
      .setURL(`${url}`)
      .setImage(image)
      .setDescription(`Meme from r/${memesubreddit}`)
      .setColor('RANDOM')
      .setFooter(`👍 ${upvotes} 👎 ${downvotes}`);
    message.channel.send(embed);
  });
};

module.exports.info = {
  name: 'meme',
  alias: [],
  usage: '<p>Meme',
  example: '<p>Meme',
  description: 'Get a great meme from a variety of meme subreddits',
  category: 'fun',
};
