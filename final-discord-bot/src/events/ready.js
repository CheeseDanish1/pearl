const {getGiveaways, endGiveaway} = require('../Storage/database');
const {drawWinner, addVars, startGiveaway} = require('../Storage/giveaway');

module.exports = async client => {
  setInterval(() => {
    client.user.setStatus('online');
    client.user.setActivity(
      '>Help || Use the Feedback Command To Give Me Feedback'
    );
  }, 1000 * 60 * 60);

  console.log(client.user.username + ' has logged in.');

  // Resume giveaways or declare ended giveaways
  let giveaways = await getGiveaways();
  giveaways.forEach(g => {
    if (g.ends - +new Date() > 0) return startGiveaway(g, client);
    if (!g.ended) {
      addVars(g, client).then(gf => {
        drawWinner(gf).then(winner => {
          gf.message.channel.send(
            `The winner of **${gf.prize}** is... ${winner}`
          );
          gf.message.edit(gf.message.embeds[0].setFooter('Giveaway ended'));
          return endGiveaway(g);
        });
      });
    }
  });
};
