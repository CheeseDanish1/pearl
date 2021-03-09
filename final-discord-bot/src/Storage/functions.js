const colours = require('./colors');
const help = require('./onMesInfo');
const {MessageEmbed} = require('discord.js');

module.exports = {
  onMes: async function ({GuildMember, User}) {
    // help.updateBotInfo(message, db, prefix);

    const vars = help.onMesVars(GuildMember);
    const xp = vars.RandomXp;
    
    help.addXp(GuildMember, vars.timeout, vars.xpTimout, xp);
    help.addXpg(User, vars.timeout, vars.xpTimout, xp);

    help.mes(GuildMember, User);
  },

  level: function (xp) {
    remaining_xp = xp;
    level = 0;
    while (remaining_xp >= getLevelXp(level)) {
      remaining_xp -= getLevelXp(level);
      level += 1;
    }
    return level;

    function getLevelXp(n) {
      return 5 * (n ^ 2) + 50 * n + 100;
    }
  },

  formatDate: function (date) {
    return new Intl.DateTimeFormat('en-US').format(date);
  },
  colourNameToHex: function (colour) {
    if (typeof colours[colour.toLowerCase()] != 'undefined')
      return colours[colour.toLowerCase()];

    return false;
  },
  closeTicket: async function (guild, channel) {
    let closedTicketCategory = guild.channels.cache.find(
      c => c.name.toLowerCase() == 'closed tickets'
    );

    if (!closedTicketCategory) {
      let roles = guild.roles.cache.filter(x =>
        x.permissions.has('MANAGE_CHANNELS')
      );
      let perms = [];

      roles.forEach(role => {
        perms.push({
          id: role.id,
        });
      });

      closedTicketCategory = await guild.channels.create('Closed Tickets', {
        type: 'category',
        permissionOverwrites: [
          {
            id: guild.id,
            deny: ['VIEW_CHANNEL'],
          },
        ],
      });

      perms.forEach(p =>
        closedTicketCategory.createOverwrite(p.id, {
          VIEW_CHANNEL: true,
        })
      );
    }

    channel.setParent(closedTicketCategory.id);

    channel.setName(`[CLOSED]-${channel.name}`);
    const _ = new MessageEmbed()
      .setTitle('Ticket closed')
      .setDescription('This ticket has been closed')
      .setColor('RANDOM');
    channel.send(_);
  },
};