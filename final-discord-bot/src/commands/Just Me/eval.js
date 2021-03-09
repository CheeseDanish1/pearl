module.exports.run = async (client, message, args) => {
  if (!message.guild) return;
  message.delete();

  let codein = args.slice(0).join(' ');
  if (
    message.author.id != '327896498639470595' &&
    message.author.id != '498281480133279746'
  )
    return;
  try {
    let code = eval(codein);

    if (codein.length < 1 && !codein) {
      return message.channel.send(`\`\`\`javascript\nundefined\n\`\`\``);
    }
    if (typeof code !== 'string')
      code = require('util').inspect(code, {
        depth: 0,
      });

    message.channel.send(
      `\`\`\`javascript\n${
        code.length > 1024 ? 'Character Over!' : code
      }\n\`\`\``
    );
  } catch (e) {
    message.channel.send(
      `\`\`\`javascript\n${e.length > 1024 ? 'Character Over!' : e}\n\`\`\``
    );
  }
};
