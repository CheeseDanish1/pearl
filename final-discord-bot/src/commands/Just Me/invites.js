const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
  if (message.author.id === '327896498639470595') {
    let num = 0;
    client.guilds.cache.forEach(guild => {
      num++;
      const firstChannel = guild.channels.cache
        .filter(c => c.type === 'text')
        .find(x => x.position == 0);

      firstChannel
        .createInvite({
          temporary: false,
          reason: 'test',
        })
        .then(invite => {
          if (
            message.member.nickname === null ||
            message.member.nickname === undefined ||
            !message.member.nickname
          ) {
            var nicknames = 'No Nickname Set';
          } else {
            var nicknames = guild.owner.nickname;
          }

          let embed = new Discord.MessageEmbed()
            .setTitle('Guild Name: ' + guild.name)
            .addFields(
              {
                name: 'Guild Owner Name: ',
                value: guild.owner.user.tag,
              },
              {
                name: 'Guild Owner Nick Name: ',
                value: nicknames,
              },
              {
                name: 'Guild Owner Id: ',
                value: guild.owner.user.id,
              },
              {
                name: 'Guild Id: ',
                value: guild.id,
              },
              {
                name: 'Guild Member Count: ',
                value: guild.memberCount,
              },
              {
                name: 'Guild Region: ',
                value: guild.region,
              },
              {
                name: 'Guild Invite: ',
                value: invite.url,
              }
            )
            .setColor('Random');
          message.channel.send(embed);
        });
    });
    message.channel.send(`I am in ${num} guild(s)`);
  } else message.channel.send("Command doesn't exist.");
};
