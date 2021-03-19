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
    return Math.floor(0.25 * Math.sqrt(xp));
  },
  xpNextLevel: level => {
    return Math.pow((level + 1) * 4, 2);
  },
  xpRequiredTillNextLevel: xp => {
    return Math.pow((Math.floor(0.25 * Math.sqrt(xp)) + 1) * 4, 2) - xp;
  },

  formatDate: function (date) {
    return new Intl.DateTimeFormat('en-US').format(date);
  },
  colourNameToHex: function (colour) {
    let r = colours[colour.toLowerCase] || false;
    return r;
  },
};
