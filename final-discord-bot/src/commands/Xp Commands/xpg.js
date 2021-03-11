const Canvas = require('canvas');
const Discord = require('discord.js');
const {level} = require('../../Storage/functions');
const UserConfig = require('../../database/models/UserConfig');

const applyText = (canvas, text, re = 70) => {
  const ctx = canvas.getContext('2d');

  // Declare a base size of the font
  let fontSize = re;

  do {
    // Assign the font to the context and decrement it so it can be measured again
    ctx.font = `${(fontSize -= 10)}px sans-serif`;
    // Compare pixel width of the text to the canvas minus the approximate avatar size
  } while (ctx.measureText(text).width > canvas.width - 300);

  // Return the result to use in the actual canvas
  return ctx.font;
};

module.exports.run = async (client, message, args) => {
  let person = message.mentions.users.first() || message.author;

  if (person.bot)
    return message.channel.send(
      `This user is a bot, so does not have any stats`
    );
  let name = `${message.author.username}#${message.author.discriminator}`;
  let config =
    (await UserConfig.findOne({id: person.id})) ||
    (await UserConfig.create({
      id: person.id,
      name,
      avatar: message.author.avatar,
    }));

  let xp = config.xpg;
  let mes = config.messages;
  let lev = await getRankGlobal();
  const canvas = Canvas.createCanvas(1000, 250);
  const ctx = canvas.getContext('2d');
  const background = await Canvas.loadImage('src/image/black.jpg');
  let levelN = level(xp);

  if (xp == null) {
    xp = 0;
    levelN = 0;
    mes = 0;
  }

  if (lev == undefined) lev = 0;

  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#000000';
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // Slightly smaller text placed above the member's display name
  ctx.font = applyText(canvas, `${person.username}'s Global Xp And Stuff,`);
  ctx.fillStyle = '#ffffff';

  ctx.fillText(
    `${person.username}'s Global Xp And Stuff,`,
    canvas.width / 4.0,
    100
  );

  // Add an exclamation point here and below
  ctx.font = `26px sans-serif`;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(
    `Xp: ${xp}, Level: ${levelN}, Messages Sent: ${mes}, Rank: #${lev}`,
    canvas.width / 4.0,
    180
  );

  ctx.beginPath();
  ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  const avatar = await Canvas.loadImage(
    person.displayAvatarURL({format: 'jpg'})
  );
  ctx.drawImage(avatar, 25, 25, 200, 200);

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    'gxp.png'
  );

  message.channel.send(attachment);

  async function getRankGlobal() {
    let r = await UserConfig.collection.find().sort({xpg: -1}).toArray();

    return r.indexOf(r.find(g => g.id == message.author.id)) + 1;
  }
};
