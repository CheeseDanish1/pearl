module.exports.run = (client, message, args) => {
  const serverQueue = client.queue.get(message.guild.id);
  if (!serverQueue || !serverQueue.songs[0])
    return message.channel.send('There is nothing playing.');
  return message.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Now playing:** ${serverQueue.songs[0].title}
    `);
};

module.exports.info = {
  name: 'queue',
  alias: [],
  usage: '<p>queue',
  example: '<p>queue',
  description: 'Get the current queue of songs',
  category: 'music',
};
