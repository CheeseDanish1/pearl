const Canvas = require('canvas');
const {level, xpForLevel, xpNextLevel} = require('../../Storage/functions');
const Discord = require('discord.js');
const {getGuildMember, getUser} = require('../../Storage/database');
const spw = require('string-pixel-width');

module.exports.run = async (client, message, args, {GuildMemberConfig}) => {
  let person = message.mentions.users.first() || message.author;
  if (person.bot)
    return message.channel.send(
      `This user is a bot, so does not have any stats`
    );

  message.channel.startTyping();

  let config = await getGuildMember(person.id, message.guild.id);
  let userConfig = await getUser(person);
  let xp = config.xp;
  let mes = config.messages;
  let lev = await getRankLevels();
  const color = userConfig.xpcolor || '#c21135';
  // Canvas.registerFont('./src/Storage/fonts/mont/Montserrat-Medium.ttf', {
  //   family: 'Montserrat',
  //   weight: 'medium',
  // });
  const canvas = Canvas.createCanvas(1000, 250);
  const ctx = canvas.getContext('2d');
  let levelN = level(xp);

  if (xp == null) {
    xp = 0;
    levelN = 0;
    mes = 0;
  }

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.fillStyle = '#22272a';
  ctx.lineTo(1000, 0);
  ctx.lineTo(1000, 250);
  ctx.lineTo(0, 250);
  ctx.lineTo(0, 0);
  ctx.fill();
  ctx.closePath();

  const avatar = await Canvas.loadImage(
    person.displayAvatarURL({format: 'png'})
  );

  ctx.drawImage(avatar, 25, 25, 200, 200);

  ctx.beginPath();
  ctx.fillStyle = '#e3e3e3';
  ctx.font = '65px Montserrat';
  ctx.fillText(`${person.username}#${person.discriminator}`, 270, 80);
  ctx.closePath();

  ctx.beginPath();
  const n = `${person.username}#${person.discriminator}`;

  ctx.moveTo(270, 100);
  ctx.font = '69px Montserrat';
  ctx.lineWidth = 5;
  ctx.strokeStyle = color;
  ctx.lineTo(ctx.measureText(n).width * 140, 100);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.font = '30px Montserrat';
  ctx.fillStyle = '#e3e3e3';
  ctx.fillText(
    `Level: ${levelN}  XP: ${xp}  Rank: ${lev[0]}/${lev[1]}`,
    270,
    145
  );
  ctx.closePath();

  ctx.beginPath();
  ctx.lineWidth = 45;
  ctx.strokeStyle = 'white';
  ctx.moveTo(270, 200);
  ctx.lineTo(950, 200);
  ctx.stroke();
  ctx.closePath();

  let percentDoneWithCurrLev =
    ((xp - xpForLevel(levelN)) / (xpNextLevel(levelN) - xpForLevel(levelN))) *
    100;
  let len = (Math.round(percentDoneWithCurrLev) / 100) * 680 + 270;
  // console.log(
  //   xp,
  //   xpForLevel(levelN),
  //   xpNextLevel(levelN),
  //   xp - xpForLevel(levelN),
  //   xpNextLevel(levelN) - xpForLevel(levelN),
  //   ((xp - xpForLevel(levelN)) / (xpNextLevel(levelN) - xpForLevel(levelN))) *
  //     100,
  //   (percentDoneWithCurrLev / 100) * 950
  // );
  ctx.beginPath();
  ctx.lineWidth = 45;
  ctx.strokeStyle = color;
  ctx.moveTo(270, 200);
  ctx.lineTo(len, 200);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.font = '35px arial';
  ctx.fillStyle = 'black';
  ctx.fillText(
    `${Math.round(percentDoneWithCurrLev)}%`,
    len - 80 < 270 ? 290 : len - 80,
    210
  );
  ctx.closePath();

  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'xp.png');

  message.channel.send(attachment);
  return message.channel.stopTyping();

  async function getRankLevels() {
    let r = await GuildMemberConfig.collection
      .find({guild: message.guild.id})
      .sort({
        xp: -1,
      })
      .toArray();
    // console.log(r);
    return [r.indexOf(r.find(g => g.id == person.id)) + 1, r.length];
  }
};

module.exports.info = {
  name: 'xp',
  alias: [],
  usage: '<p>Xp (person)',
  example: '<p>Xp @Jimmy#7932',
  description: 'Get a persons server stats and rankings',
  category: 'xp',
};
