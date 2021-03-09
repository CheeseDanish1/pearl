const {Client, Message} = require('discord.js')

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {string[]} args 
 */

module.exports.run = (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_EMOJIS'))
    return message.channel.send(
      "You don't have Permission to use this command"
    );
  if (!message.guild.me.hasPermission('MANAGE_EMOJIS'))
    return message.channel.send(
      '**' +
        message.author.username +
        "**I don't have permission use this command"
    );

  let attachment = message.attachments;

  if (attachment.size > 0) {
    if (attachment.every(attachIsImage)) {
      let name = args[0];
      if (!name)
        return message.channel.send(
          'Please include a name to name this new emoji'
        );
      else {
        if (message.guild.emojis.cache.find(e => e.name == name))
          return message.channel.send(
            'There is already an emoji with that name'
          );

        message.guild.emojis
          .create(message.attachments.map(a => a.url)[0], name)
          .then(emoji =>
            message.channel.send(`Created new emoji with name ${emoji.name}`)
          )
          .catch(er => message.channel.send(`There was an error, if it is a problem with the bot go report it with the feedback command\n\nError Message: ${er}`));
      }
    }
  } else {
    message.channel.send(
      'Please include an image you would like to turn your emoji into'
    );
  }

  function attachIsImage(msgAttach) {
    var url = msgAttach.url;
    //True if this url is a png image.
    return (
      url.indexOf('png', url.length - 'png'.length /*or 3*/) !== -1 ||
      url.indexOf('jpeg', url.length - 'jpeg'.length /*or 4*/) !== -1 ||
      url.indexOf('jpg', url.length - 'jpg'.length /*or 3*/) !== -1
    );
  }
};
