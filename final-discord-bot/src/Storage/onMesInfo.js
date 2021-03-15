const {addXp, addXpg, mes} = require('../Storage/database');

module.exports = {
  onMesVars: function (GuildMember) {
    let re = {
      timeout: 60000,
      xpTimout: GuildMember.xptimeout,
      randomXp: Math.floor(Math.random() * (25 - 15 + 1)) + 15,
    };
    return re;
  },

  addXp: async function (userId, guild, timeout, xpTimout, RandomXp) {
    if (!(xpTimout && timeout - (Date.now() - xpTimout) > 0)) {
      // 0
      addXp(userId, guild, RandomXp);
    }
  },

  addXpg: async function (userId, guild, timeout, xpTimeout, RandomXp) {
    if (!(xpTimeout && timeout - (Date.now() - xpTimeout) > 0)) {
      addXpg(userId, guild, RandomXp);
    }
  },
  mes: async function (userId, guild) {
    mes(userId, guild);
  },
};
