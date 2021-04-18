const fetch = require('node-fetch');
const {getUserToken} = require('./utils');

async function getBotGuilds() {
  const res = await fetch('http://discord.com/api/v6/users/@me/guilds', {
    method: 'GET',
    headers: {
      Authorization: `Bot ${process.env.BOT_TOKEN}`,
    },
  });
  return res.json();
}

async function getGuildChannels(id) {
  const res = await fetch(`http://discord.com/api/v6/guilds/${id}/channels`, {
    method: 'GET',
    headers: {
      Authorization: `Bot ${process.env.BOT_TOKEN}`,
    },
  });
  return res.json();
}

async function getBot() {
  const res = await fetch('http://discord.com/api/v6/users/@me', {
    method: 'GET',
    headers: {
      Authorization: `Bot ${process.env.BOT_TOKEN}`,
    },
  });
  return res.json();
}

async function getGuild(id) {
  const res = await fetch(`http://discord.com/api/v6/guilds/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bot ${process.env.BOT_TOKEN}`,
    },
  });
  return res.json();
}

async function getUser(id) {
  const res = await fetch(`http://discord.com/api/v6/users/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bot ${process.env.BOT_TOKEN}`,
    },
  });
  return res.json();
}

async function joinGuild({userId, guildId}) {
  const ac = await getUserToken(userId);
  const res = await fetch(
    `https://discord.com/api/v6/guilds/${guildId}/members/${guildId}`,
    {
      method: 'PUT',
      body: JSON.stringify({
        access_token: ac,
      }),
      headers: {
        Authorization: `Bot ${process.env.BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );
  let finalRes = res.statusText == 'No Content' ? [] : res.json();
  return finalRes;
}

async function authorized(req) {
  if (!req.user) return false;
  const accessToken = await getUserToken(req.user.id);
  const responce = await fetch('http://discord.com/api/v6/users/@me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  let json = await responce.json();
  console.log(json.code, json.code != 0);
  return json.code != 0;
}

async function getUserGuilds(id) {
  const realAc = await getUserToken(id);
  const responce = await fetch('http://discord.com/api/v6/users/@me/guilds', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${realAc}`,
    },
  });
  return responce.json();
}

async function getGuildMembers(id) {
  const res = await fetch(
    `http://discord.com/api/v6/guilds/${id}/members?limit=1000`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bot ${process.env.BOT_TOKEN}`,
      },
    }
  );
  return res.json();
}

module.exports = {
  guilds: getBotGuilds,
  bot: getBot,
  guild: getGuild,
  getUser,
  getGuildChannels,
  getUserGuilds,
  getGuildMembers,
  authorized,
};
