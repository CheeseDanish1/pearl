const {Client, Message, MessageEmbed} = require('discord.js');

/**
 * 
 * @param {Message} message 
 * @param {string[]} args 
 */

module.exports.run = async (client, message, args, ops) => {

  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You dont have permission to use this command")
  if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send("I dont have permission to use this command")

  const {GuildConfig: Guild} = ops
  const currBanWords = Guild.ops.bannedWords
  let word = args[0]

  if (!word) {
    if (!currBanWords.length) return message.channel.send("There are no banned words in this server")

    const _ = new MessageEmbed()
      .setTitle(`${message.guild.name}'s banned words`)
      .setColor("RANDOM")
      .setDescription(currBanWords.join(", "))
      .setTimestamp()

    return message.author.send(_)
  }

  word = word.toLowerCase()

  if (currBanWords && currBanWords.includes(word)) {
    await Guild.updateOne({"$pull": {"ops.bannedWords": word}})
    let newArr = currBanWords.filter(d => d != word)
    // db.set(`bannedwords_${message.guild.id}`, newArr)
    return message.channel.send(`Removed that word from list of banned words`)
  } 

  // db.push(`bannedwords_${message.guild.id}`, word)
  await Guild.updateOne({"$push": {"ops.bannedWords": word}})

  return message.channel.send(`Added that word to list of banned word`)
}