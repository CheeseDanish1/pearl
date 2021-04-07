const fetch = require('node-fetch')

module.exports.run = (client, message, args) => {
  const subreddit = 'rarepuppers';
  const res = await fetch(`https://reddit.com/r/${subreddit}/top/.json?t=day`);
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
  name: 'pupper',
  alias: [],
  usage: '<p>Pupper',
  example: '<p>Pupper',
  description: 'Get a cute dog image from r/RarePuppers',
  category: 'fun',
};
