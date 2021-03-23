const {setPunishment, mes} = require('../../Storage/database');
const Punishments = ['ban', 'mute', 'kick', 'softban'];
const ms = require('ms');

module.exports.run = (client, message, args, {GuildConfig, prefix}) => {
  if (!message.member.hasPermission('MANAGE_GUILD'))
    return message.channel.send('You dont have permission to use this command');

  if (!args[0] || !args[1])
    return message.channel.send(
      GuildConfig.automod.punishments.length
        ? `${GuildConfig.automod.punishments
            .map(
              r =>
                `Warning: \`${r.strike}\`, Action: \`${r.action}\` ${
                  r.time ? `, Time: \`${ms(r.time, {long: true})}\`` : ''
                }`
            )
            .join('\n')}`
        : `There are no punishments currently set for the server\nDo \`${prefix}Help Punishment\` for info on how to set one`
    );

  const Warnings = parseInt(args[0]);
  if (isNaN(parseInt(Warnings)))
    return message.channel.send(`The amount of warnings needs to be a number`);
  if (Warnings < 1 || Warnings > 100)
    return message.channel.send(
      `The amount of warnings must be between 0 and 100`
    );
  const Punishment = args[1].toLowerCase();
  if (!Punishments.includes(Punishment.toLowerCase()))
    return message.channel.send(
      `What you provided is not a valid punishment\nValid punishments are ${Punishments.map(
        d => `\`${d}\``
      ).join(', ')}`
    );

  let Time = args[2] || null;
  let checkTime = !!args[2];
  if ((Punishment == 'kick' || Punishment == 'softban') && Time)
    checkTime = false;
  if (checkTime) Time = ms(Time);
  if (
    (checkTime && !Time) ||
    (checkTime && !/(min|d|se|w)/.test(ms(Time, {long: true})))
  )
    return message.channel.send(
      `The time you provided is not valid\nValid times are \`5m\` \`4d\` \`6h\``
    );

  if (checkTime && Time > 1209600000)
    return message.channel.send(`The time cant be greater than 2 weeks`);

  let info = {
    strike: Warnings,
    action: Punishment,
    time: Time,
  };

  message.channel.send(
    `Added automod punishment to \`${Punishment}\`${
      checkTime ? `for \`${ms(Time, {long: true})}\` ` : ' '
    }after \`${Warnings}\` warnings`
  );
  setPunishment(info, GuildConfig);
};

module.exports.info = {
  name: 'punishment',
  alias: ['punishments'],
  usage: '<p>Punishment [Amount Of Warnings] [Punishment] (Time)',
  example: '<p>Punishment 4 Ban\n<p>Punishment 3 Mute 30m',
  description:
    'Set a punishment to be automatically given to member when the reach a warning threshhold',
  category: 'moderation',
};
