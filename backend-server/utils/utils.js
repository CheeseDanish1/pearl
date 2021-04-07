const Crypto = require('crypto-js');
const key = process.env.ENCRYPTION_KEY;
const creds = require('../database/models/Creds');

function getMutualGuilds(usersGuilds, botsGuilds) {
  return usersGuilds.filter(
    guild =>
      botsGuilds.find(botGuild => botGuild.id == guild.id) &&
      (guild.permissions & 0x20) === 0x20
  );
}

async function getUserToken(id) {
  const Creds = await creds.findOne({id});
  if (!Creds) throw Error('No credential');
  const ac = Creds.accessToken;
  const decrypred = decrypt(ac);
  const realAc = decrypred.toString(Crypto.enc.Utf8);
  return realAc;
}

function allGuildsThatTheUserHasPermsIn(usersGuilds, botGuilds) {
  return usersGuilds
    .filter(guild => (guild.permissions & 0x20) === 0x20)
    .map(g => ({...g, hasPearl: !!botGuilds.find(b => b.id === g.id)}));
}

function encrypt(token) {
  return Crypto.AES.encrypt(token, key);
}

function decrypt(token) {
  return Crypto.AES.decrypt(token, key);
}

module.exports = {
  getMutualGuilds,
  idk: allGuildsThatTheUserHasPermsIn,
  encrypt,
  decrypt,
  getUserToken,
};
