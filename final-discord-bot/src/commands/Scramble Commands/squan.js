module.exports.run = (client, message, args) => {
    const cubes = require("scrambler-util");
    
    let scrambles = args[0]

    if (!scrambles || scrambles == null || scrambles == undefined) scrambles = 1

    if (isNaN(scrambles))
      return message.channel.send("You need to provide a number");
  
    var result = cubes('sq1', scrambles).join("\n\n");
  
    message.channel.send(result);
  };
  