const ms = require('ms');
const prettyMilliseconds = require('pretty-ms');

module.exports.run = (client, message, args) => {
  let time = args[0];
  if (!time) return message.channel.send('Please provide a time');
  if (!/^(\d+(m|h|s|d))+$/gi.test(time))
    return message.channel.send('The time you provided is invalid');

  let realtime = ms(time);
  let reason = args.slice(1).join(' ');
  if (!reason) {
    return message.channel.send(`Please provide something to remind you about`);
  }

  message.channel.send(
    `Reminding you to **${reason}** in **${prettyMilliseconds(realtime, {
      verbose: true,
    })}**`
  );

  setTimeout(() => {
    message.author.send(`Don't forgot to **${reason}**`);
  }, realtime);
};

module.exports.info = {
  name: 'remind',
  alias: [],
  usage: '<p>Remind [Time] [Message]',
  example: '<p>Remind 10m Join zoom meeting\n<p>Remind 32m Bump server',
  description: 'Set a reminder to yourself for later',
  category: 'misc',
};
