const {addXp, mes} = require('../Storage/database');

module.exports = {
  onMesVars: function (GuildMember, Guild) {
    const xp = Guild.xp || {
      minxp: 15,
      maxxp: 25,
      cooldown: 60000,
      multiplier: 1,
    };
    const minXp = xp.minxp;
    const maxXp = xp.maxxp;
    const timeout = xp.cooldown;
    const multiplier = xp.multiplier;

    let re = {
      timeout: timeout,
      xpTimout: GuildMember.xptimeout,
      randomXp:
        (Math.floor(Math.random() * (maxXp - minXp + 1)) + minXp) * multiplier,
    };
    return re;
  },

  addXp: async function (userId, guild, timeout, xpTimout, RandomXp) {
    if (xpTimout && timeout - (Date.now() - xpTimout) <= 0) {
      addXp(userId, guild, RandomXp);
    }
  },
  mes: async function (userId, guild) {
    mes(userId, guild);
  },
  checkLevelUp: async (guild, member, xp, message, sax) => {
    if (!member || !xp || !message || !sax) return;
    const level = xp => Math.floor(0.25 * Math.sqrt(xp));
    const oldLevel = level(member.xp);
    const newLevel = level(member.xp + xp);
    if (newLevel > oldLevel) {
      const channel = guild.levelup && guild.levelup.channel;
      if (!channel) return;
      const mes = guild.levelup && guild.levelup.message;
      if (!mes) return;
      const mess = mes
        .replace(/{level}/, newLevel)
        .replace(/{mention}/, message.author.toString())
        .replace(/{username}/, message.author.username);
      if (channel === 'channel') message.channel.send(mess);
      else {
        const chan = message.guild.channels.cache.get(channel);
        if (!chan) return;
        chan.send(mess);
        console.log(`Sent`);
      }
    }
  },
};
