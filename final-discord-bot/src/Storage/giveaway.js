module.exports = {startGiveaway, drawWinner, addVars, endGiveaway};
const {Timer} = require('goodtimer');
const {endGiveaway: end} = require('../Storage/database');

async function startGiveaway(giveaway, client) {
  giveaway = await addVars(giveaway, client);
  startTimer(giveaway);
}

async function addVars(giveaway, client) {
  let guild = client.guilds.cache.get(giveaway.guild);
  let channel = guild.channels.cache.get(giveaway.channel);
  let message = await channel.messages.fetch(giveaway.mes, true, true);
  giveaway.message = message;

  return giveaway;
}

function startTimer(giveaway) {
  new Timer(giveaway.ends - +new Date(), () => endGiveaway(giveaway), {
    onInterval: () => updateGiveaway(giveaway),
    interval: giveaway.interval,
  });
}

async function endGiveaway(giveaway) {
  if (!giveaway.message) giveaway = await addVars(giveaway, giveaway.client);

  giveaway.message.edit(giveaway.message.embeds[0].setFooter(`Giveaway ended`));

  if (giveaway.message.reactions.cache.get('🎉').count <= 1) {
    return giveaway.message.channel.send(
      `Not enough people reacted for me to draw a winner!`
    );
  }

  let winner = await drawWinner(giveaway);

  giveaway.winner = {username: winner.username, id: winner.id};
  giveaway.message.channel.send(
    `The winner of **${giveaway.prize}** is... ${winner}`
  );
  end(giveaway);
}

async function drawWinner(giveaway) {
  let users = await giveaway.message.reactions.cache.get('🎉').users.fetch();
  return users.filter(u => !u.bot).random();
}

function updateGiveaway(giveaway) {
  giveaway.message.edit(
    giveaway.message.embeds[0].setFooter(
      `Giveaway ends in ${formatTime(giveaway.ends - +new Date())}`
    )
  );
}

function formatTime(t) {
  return require('pretty-ms')(round(t), {verbose: true});
}

function round(d) {
  return Math.round(d / 15000) * 15000;
}
