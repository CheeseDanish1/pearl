/** @format */

module.exports.run = (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_MESSAGES'))
    return message.channel.send(
      "You don't have Permission to use this command"
    );
  if (!message.guild.me.hasPermission('MANAGE_MESSAGES'))
    return message.chaesnnel.send("I don't have Permission to manage messages");
  if (!args[0])
    return message.channel.send(
      'Please provide a number of messages to delete'
    );

  let i = 0;

  switch (args[0]) {
    case 'user':
      if (!args[1])
        return message.channel.send(
          'Please provide the amount of messages you would like for me to delete'
        );
      if (!args[2])
        return message.channel.send(
          'Please provide the person whos messages you want to delete'
        );

      let messageCount = parseInt(args[1]);

      let who =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[2]);

      if (!who)
        return message.channel.send(
          'You did not mention anyone, or the id you provided was invalid'
        );
      who = who.user;

      if (Number.isInteger(messageCount)) {
        if (messageCount > 100 || messageCount <= 1) {
          message.channel.send('Please Write a valid number (1-100)');
        } else if (messageCount <= 100 && messageCount > 1) {
          message.delete();
        } else {
          message.channel.send('Error');
        }
      } else {
        message.channel.send('Please enter a valid number');
      }

      message.channel.messages.fetch().then(messages => {
        messages.forEach(mes => {
          if (i >= messageCount) return;
          if (mes.author != who) return;
          mes.delete();
          i++;
        });
      });

      break;

    case 'startswith':
      if (!args[1])
        return message.channel.send(
          'Please provide the amount of messages you would like for me to delete'
        );
      if (!args[2])
        return message.channel.send(
          'Please provide the text of the messages you want to delete'
        );

      let amount = parseInt(args[1]);
      let text = args.slice(2).join(' ');

      if (Number.isInteger(amount)) {
        if (amount > 100 || amount <= 1) {
          message.channel.send('Please Write a valid number (1-100)');
        } else if (amount <= 100 && amount > 1) {
          message.delete();
        } else {
          message.channel.send('Error');
        }
      } else {
        message.channel.send('Please enter a valid number');
      }

      message.channel.messages.fetch().then(messages => {
        messages.forEach(mes => {
          if (i >= amount) return;
          if (!mes.content.toLowerCase().startsWith(text.toLowerCase())) return;
          mes.delete();
          i++;
        });
      });

      break;

    case 'endswith':
      if (!args[1])
        return message.channel.send(
          'Please provide the amount of messages you would like for me to delete'
        );
      if (!args[2])
        return message.channel.send(
          'Please provide the text of the messages you want to delete'
        );

      let amount2 = parseInt(args[1]);
      let text2 = args.slice(2).join(' ');

      if (Number.isInteger(amount2)) {
        if (amount2 > 100 || amount2 <= 1) {
          message.channel.send('Please Write a valid number (1-100)');
        } else if (amount2 <= 100 && amount2 > 1) {
          message.delete();
        } else {
          message.channel.send('Error');
        }
      } else {
        message.channel.send('Please enter a valid number');
      }

      message.channel.messages.fetch().then(messages => {
        messages.forEach(mes => {
          if (i >= amount2) return;
          if (!mes.content.toLowerCase().endsWith(text2.toLowerCase())) return;
          mes.delete();
          i++;
        });
      });

      break;

    default:
      m2essageCount = parseInt(args[0]);

      if (Number.isInteger(m2essageCount)) {
        if (m2essageCount > 100 || m2essageCount <= 1) {
          message.channel.send('Please Write a valid number (1-100)');
        } else if (m2essageCount <= 100 && m2essageCount > 1) {
          message.delete();
          message.channel.bulkDelete(m2essageCount).catch(err => {
            message.channel.send(`There was an error \n${err}`);
          });
        } else {
          message.channel.send('Error');
        }
      } else {
        message.channel.send('Please enter a valid number');
      }

      break;
  }
};

module.exports.info = {
  name: 'clear',
  alias: ['purge', 'clean'],
  usage: '<p>Clear [Amount]',
  example: '<p>Clear 100',
  description: 'Mass delete a channels messages',
  category: 'admin',
};
