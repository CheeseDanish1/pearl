module.exports.run = (client, message, args) => {
  const serverQueue = client.queue.get(message.guild.id);
  if (!serverQueue || !serverQueue.songs[0])
    return message.channel.send('There is nothing playing.');
  return message.channel.send(
    `🎶 Now playing: **${serverQueue.songs[0].title}**`
  );
};

module.exports.info = {
  name: 'np',
  alias: ['nowplaying'],
  usage: '<p>np',
  example: '<p>np',
  description: 'Get the song currently playing',
  category: 'music',
};
