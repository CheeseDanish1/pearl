module.exports.run = (client, message, args) => {
  const {channel} = message.member.voice;
  if (!channel)
    return message.channel.send(
      "I'm sorry but you need to be in a voice channel to play music!"
    );
  const serverQueue = client.queue.get(message.guild.id);
  if (!serverQueue || !serverQueue.songs[0])
    return message.channel.send(
      'There is nothing playing that I could skip for you.'
    );
  serverQueue.connection.dispatcher.end();
};

module.exports.info = {
  name: 'Skip',
  alias: ['next'],
  usage: '<p>Skip',
  example: '<p>Skip',
  description: 'Skip the current song playing',
  category: 'music',
};
