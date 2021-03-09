/** @format */

module.exports.run = (client, message, args) => {
  const {channel} = message.member.voice;
  if (!channel) return message.channel.send("I'm sorry but your not in a vc!");
  if (!message.guild.me.voice.channel)
    return message.channel.send("I'm not in a vc");
  if (channel != message.guild.me.voice.channel)
    return message.channel.send('We are not in the same vc');

  const serverQueue = client.queue.get(message.guild.id)
  if (!serverQueue || !serverQueue.songs[0]) return message.channel.send("There is nothing playing");

  serverQueue.loop = !serverQueue.loop;
  message.channel.send(`Loop is **${serverQueue.loop ? "Enabled" : "Disabled"}**`)
  // console.log(serverQueue)
};
