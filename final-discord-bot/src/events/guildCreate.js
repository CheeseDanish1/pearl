/** @format */

const {getGuild} = require('../Storage/database');

module.exports = async (client, guild) => {
  console.log(`Joined a new guild`);

  let muRole = guild.roles.cache.find(r => r.name.toLowerCase() == 'muted');

  if (!muRole) {
    //Creates a Muted Role
    muRole = await guild.roles
      .create({
        data: {
          name: 'Muted',
          color: 'GREY',
          permissions: [],
        },
        reason: 'Need A Muted Role for muting people',
      })
      .catch(err => console.error(err));
  }

  const firstChannel = guild.channels.cache
    .filter(c => c.type === 'text')
    .find(x => x.position == 0);

  const Guild = await getGuild(guild.id);

  const prefix = Guild.prefix;

  let mes = `Thank you for inviting Pearl to your server!\n`;
  mes += `My prefix is **${prefix}** but you can change it any time you like using the command ${prefix}SetPrefix <prefix>\n`;
  mes += `If you have any problems with the bot join the Pearl Official Support server (https://discord.gg/NGS6DmA)\n`;
  mes += `Thank you for supporting me and thank you for using Pearl`;

  firstChannel.send(mes);

  let invite = firstChannel.createInvite({
    temporary: false,
    reason: 'test',
  });

  console.log(
    `Guild Owner Name: ${guild.owner.user.tag}\nGuild Owner Id: ${guild.owner.user.id}\nGuild Id: ${guild.id}\nGuild mc: ${guild.memberCount}\nGuild Name: ${guild.name}\nGuild Invite: ${invite.url}`
  );
};
