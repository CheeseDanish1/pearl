module.exports.run = (client, message, args) => {
  const serverQueue = client.queue.get(message.guild.id);
  if (serverQueue && !serverQueue.playing) {
    serverQueue.playing = true;
    serverQueue.connection.dispatcher.resume();
    return message.channel.send('▶ Resumed the music for you!');
  }
  return message.channel.send('There is nothing playing.');
};

module.exports.info = {
  name: 'resume',
  alias: ['rs'],
  usage: '<p>Resume',
  example: '<p>Resume',
  description: 'Resume a paused song',
  category: 'music',
};
