module.exports.run = (client, message, args) => {
  const {channel} = message.member.voice;
  if (!channel)
    return message.channel.send(
      "I'm sorry but you need to be in a voice channel to play music!"
    );
  const serverQueue = client.queue.get(message.guild.id);
  if (!serverQueue || !serverQueue.songs[0])
    return message.channel.send('There is nothing playing.');
  if (!args[0])
    return message.channel.send(
      `The current volume is: **${serverQueue.volume}**`
    );
  if (isNaN(args[0]))
    return message.channel.send('What you are providing should be a number');
  if (args[0] > 10)
    return message.channel.send('I dont think you want to go that high');
  serverQueue.volume = args[0]; // eslint-disable-line
  serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
  return message.channel.send(`I set the volume to: **${args[0]}**`);
};

module.exports.info = {
  name: 'volume',
  alias: [],
  usage: '<p>Volume [Amount 1-10]',
  example: '<p>Volume 6',
  description: 'Change the volume of the music playing',
  category: 'music',
};
