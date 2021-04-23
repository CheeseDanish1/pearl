const {getGiveaways, endGiveaway} = require('../Storage/database');
const {drawWinner, addVars, startGiveaway} = require('../Storage/giveaway');

module.exports = async client => {
  setInterval(() => {
    client.user.setStatus('online');
    client.user.setActivity(
      '>Help || Use the Feedback Command To Give Me Feedback'
    );
  }, 1000 * 60 * 60);

  // Resume giveaways or declare ended giveaways
  let giveaways = await getGiveaways();
  giveaways.forEach(async g => {
    if (g.ends - +new Date() > 0) return startGiveaway(g, client);
    if (!g.ended) {
      const gf = await addVars(g, client);
      const winner = await drawWinner(gf);
      gf.message.channel.send(`The winner of **${gf.prize}** is... ${winner}`);
      gf.message.edit(gf.message.embeds[0].setFooter('Giveaway ended'));
      return endGiveaway(g);
    }
  });

  // Set invite uses
  client.guilds.cache.forEach(async guild => {
    const guildInvites = await guild.fetchInvites();
    const newGuildInvites = new Map();
    [...guildInvites.entries()].forEach(gi => {
      newGuildInvites.set(gi[1].code, {uses: gi[1].uses});
    });
    client.invites.set(guild.id, newGuildInvites);
  });

  console.log(client.user.username + ' has logged in.');
};
