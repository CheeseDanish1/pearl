module.exports.run = (client, message, args) => {
  const cubes = require("scrambler-util");

  switch (args[0]) {
    case "3x3":
      var cube = "333";
      break;
    case "4x4":
      var cube = "444";
      break;
    case "5x5":
      var cube = "555";
      break;
    case "6x6":
      var cube = "666";
      break;
    case "7x7":
      var cube = "777";
      break;
    case "2x2":
      var cube = "222";
      break;
    case "1x1":
      var cube = "111";
      break;
    case "skewb":
      var cube = "skewb";
      break;
    case "pyraminx":
      var cube = "pyraminx";
      break;
    case "2x2":
      var cube = "222";
      break;
    default:
      message.channel.send(
        `The cube you provided (${args[0]}) is not a supported cube.`
      );
      break;
  }

  var scrambles = args[1];

  if (!scrambles || scrambles == null || scrambles == undefined) scrambles = 1;

  if (isNaN(scrambles))
    return message.channel.send("You need to provide a number");

  var result = cubes(cube, scrambles).join("\n");

  message.channel.send(result);
};
