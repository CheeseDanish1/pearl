module.exports.run = (client, message, args) => {
  const serverQueue = client.queue.get(message.guild.id);
  if (serverQueue && serverQueue.playing) {
    serverQueue.playing = false;
    serverQueue.connection.dispatcher.pause();
    return message.channel.send('⏸ Paused the music for you!');
  }
  return message.channel.send('There is nothing playing.');
};

module.exports.info = {
  name: 'pause',
  alias: ['p'],
  usage: '<p>Pause',
  example: '<p>Pause',
  description: 'Pause the current song playing',
  category: 'music',
};
