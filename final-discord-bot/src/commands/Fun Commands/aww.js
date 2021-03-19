const fetch = require('node-fetch');
const {MessageEmbed} = require('discord.js');

module.exports.run = async (client, message, args) => {
  const res = await fetch('https://reddit.com/r/aww/top/.json?t=day');
  const json = await res.json();
  const {
    url,
    title,
    ups,
    num_comments,
    url_overridden_by_dest,
  } = json.data.children[Math.floor(Math.random() * 25)].data;

  const embed = new MessageEmbed()
    .setTitle(title)
    .setURL(url)
    .setImage(url_overridden_by_dest)
    .setColor('GREEN')
    .setFooter(`👍 ${ups} 📄 ${num_comments}`);

  try {
    message.channel.send(embed);
  } catch (e) {
    message.channel.send(`An error occurred\n${e}`);
  }
};

module.exports.info = {
  name: 'aww',
  alias: [],
  usage: '<p>Aww',
  example: '<p>Aww',
  description: 'Get an image from r/aww',
  category: 'fun',
};
