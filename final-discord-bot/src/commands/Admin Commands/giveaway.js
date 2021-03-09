const {
  MessageEmbed
} = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  //Make sure the user has pemission touse this command
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You don't have permission to use this command")

  //Make sure they put a time 
  if (!args[0]) return message.channel.send(`You did not specify your time!`);

  //Makes sure the put th etime with the rigt foratting
  if (!/^(\d+(m|h|s|d))+$/ig.test(args[0])) return message.channel.send("The time you provided is invalid")


  //Makes sure that they put a number
  if (isNaN(args[0][0])) return message.channel.send(`That is not a number!`);

  //Set'sthe chane to he first chanel the metion or the chanel they are in
  let channel = message.mentions.channels.first() || message.channel;

  //Set's the prize to thlat in they put
  let prize = args.slice(2).join(" ");

  //Makes sure they put a prize
  if (!prize) return message.channel.send(`No prize specified!`);

  //Confirms tha giveawy has been mad
  let mes = await message.channel.send(`*Giveaway created in ${channel}*`);

  //Thisis the description of the giveaway
  var mesEmbDes = `The user ${message.author} is hosting a giveaway for the prize of \n**${prize}**`

  //This is the giveaway embed
  let Embed = new MessageEmbed()
    .setTitle(`New giveaway!`)
    .setDescription(mesEmbDes)
    .setTimestamp(new Date(new Date().getTime() + ms(args[0])))
    .setColor('RANDOM')

  //Send the embed and collect the reactions
  let m = await channel.send(Embed);
  m.react("🎉");
  setTimeout(() => {
    //Make sure enough people reacted
    if (m.reactions.cache.get("🎉").count <= 1) {
      message.channel.send(`Reactions: ${m.reactions.cache.get("🎉").count}`);
      return message.channel.send(`Not enough people reacted for me to start draw a winner!`);
    }

    //Choose and send the winner
    let winner = m.reactions.cache
      .get("🎉")
      .users.cache.filter((u) => !u.bot)
      .random();
    channel.send(`The winner of the giveaway for **${prize}** is... ${winner}`);
  }, ms(args[0]));
}