const colours = require('./colors');
const help = require('./onMesInfo');

module.exports = {
  onMes: async function (GuildMember) {
    const vars = help.onMesVars(GuildMember);
    const {id, guild} = GuildMember;
    help.addXp(id, guild, vars.timeout, vars.xpTimout, vars.randomXp);
    help.addXpg(id, guild, vars.timeout, vars.xpTimout, vars.randomXp);
    help.mes(id, guild);
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
