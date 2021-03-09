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
};
