const {MessageEmbed} = require('discord.js');
const got = require('got');

module.exports.run = (client, message, args) => {
  const fp = 'facepalm';
  let embed = new MessageEmbed();
  got(`https://www.reddit.com/r/${fp}/random/.json`).then(res => {
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
      .setColor('RANDOM')
      .setFooter(`👍 ${upvotes} 👎 ${downvotes}`);
    message.channel.send(embed);
  });
};

module.exports.info = {
  name: 'facepalm',
  alias: ['fp'],
  usage: '<p>Facepalm',
  example: '<p>Facepalm',
  description: 'Get a random post from r/facepalm',
  category: 'fun',
};
