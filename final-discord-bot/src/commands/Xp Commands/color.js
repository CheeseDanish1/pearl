const {colourNameToHex} = require('../../Storage/functions');
const {setXpColor} = require('../../Storage/database');
const Canvas = require('canvas');
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  if (!args || !args.length || !args[0])
    return message.channel.send(`You need to provide a color`);
  const isHex = /^(#)?([a-f0-9]{6}|[a-f0-9]{3})$/i.test(args[0]);
  const color = isHex ? args[0] : colourNameToHex(args.join(' '));
  const realColor = isHex
    ? parseHex(color)
    : color
    ? color.toLowerCase()
    : color;
  if (!realColor)
    return message.channel.send(`The color you provided is invalid`);

  const canvas = Canvas.createCanvas(100, 100);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = realColor;
  ctx.moveTo(0, 0);
  ctx.lineTo(100, 0);
  ctx.lineTo(100, 100);
  ctx.lineTo(0, 100);
  ctx.lineTo(0, 0);
  ctx.fill();

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    'color.png'
  );

  const check = '✅';
  const x = '❌';
  const mes = await message.channel.send(
    'This is the color you selected, would you like to continue?',
    attachment
  );
  await mes.react(check);
  await mes.react(x);

  const collected = mes.createReactionCollector(
    (r, u) =>
      u.id == message.author.id && [check, x].some(f => f == r.emoji.name),
    {max: 1, time: 20000}
  );
  collected.on('collect', r => {
    if (r.emoji.name == check) {
      message.channel.send(`Updated color to \`${realColor}\``);
      return setXpColor(message.author.id, realColor);
    } else {
      message.channel.send('Canceling changes');
    }
  });
  collected.on('end', c =>
    c.size == 0 ? message.channel.send('You took to long to respond') : ''
  );

  function parseHex(h) {
    if (h.startsWith('#')) return h;
    return `#${h}`;
  }
};

module.exports.info = {
  name: 'color',
  alias: [],
  usage: '<p>Color <Hex Value>',
  example: '<p>Color #41b2b0',
  description: 'Change the color of the xp menus',
  category: 'xp',
};
