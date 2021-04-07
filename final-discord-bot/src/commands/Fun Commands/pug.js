const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');

module.exports.run = async (client, message, args) => {
  const res = await fetch('https://reddit.com/r/pugs/random/.json');
  const json = await res.json();
  const {
    url,
    title,
    ups,
    num_comments,
    gallery_data,
  } = json[0].data.children[0].data;
  const embed = new MessageEmbed()
    .setTitle(title)
    .setURL(url)
    .setImage(gallery_data ? gallery_data.items[0] : '')
    .setColor('GREEN')
    .setFooter(`👍 ${ups} 📄 ${num_comments}`);

  try {
    message.channel.send(embed);
  } catch (e) {
    message.channel.send(`An error occurred\n${e}`);
  }
};

module.exports.info = {
  name: 'pug',
  alias: [],
  usage: '<p>Pug',
  example: '<p>Pug',
  description: 'Get a random post from r/pugs',
  category: 'fun',
};
