const Discord = require('discord.js');
module.exports.run = (client, message, args) => {
    const cubes = require("scrambler-util");
  
    var result = "";
    result += `2x2. ${cubes('222', '1')}`
    result += "\n\n"
    result += `3x3. ${cubes('333', '1')}`
    result += "\n\n"
    result += `4x4. ${cubes('444', '1')}`
    result += "\n\n"
    result += `5x5. ${cubes('555', '1')}`
    result += "\n\n"
    result += `Oh. ${cubes('333', '1')}`
    result += "\n\n"
    result += `Mega. ${cubes('mega', '1')}`
    result += "\n\n"
    result += `Clock. ${cubes('clock', '1')}`
    result += "\n\n"
    result += `Pyra. ${cubes('pyra', '1')}`
    result += "\n\n"
    result += `Skewb. ${cubes('skewb', '1')}`
    result += "\n\n"
    result += `Square 1. ${cubes('sq1', '1')}`
  
    let embed = new Discord.MessageEmbed()
      .setTitle("Mini Guilford")
      .setColor("Green")
      .setDescription(result)
      .setTimestamp()
    message.channel.send(embed)
  };
  