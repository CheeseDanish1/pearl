const fetch = require('node-fetch');
const creds = require('../database/models/Creds')
const Crypto = require('crypto-js')
const {getUserToken} = require('./utils');
const key =
  'facfb2e8-2996-4266-a2ac-d770a6f57648-bdb259c7-0ef5-4a89-a195-b2eaabbb4de7';

async function getBotGuilds() {
  const res = await fetch('http://discord.com/api/v6/users/@me/guilds', {
    method: 'GET',
    headers: {
      Authorization: `Bot ${process.env.BOT_TOKEN}`
    },
  });
  console.log('Returned bot guilds');
  return res.json()
}

async function getGuildChannels(id) {
  const res = await fetch(`http://discord.com/api/v6/guilds/${id}/channels`, {
    method: 'GET',
    headers: {
      Authorization: `Bot ${process.env.BOT_TOKEN}`
    },
  });
  return res.json()
}

async function getBot() {
  const res = await fetch('http://discord.com/api/v6/users/@me', {
    method: 'GET',
    headers: {
      Authorization: `Bot ${process.env.BOT_TOKEN}`
    },
  });
  return res.json()
}

async function getGuild(id) {
  const res = await fetch(`http://discord.com/api/v6/guilds/${id}`, {
    method: 'GET',
    headers: {  
      Authorization: `Bot ${process.env.BOT_TOKEN}`
    },
  });
  return res.json()
}

async function getUser(id) {
  const res = await fetch(`http://discord.com/api/v6/users/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bot ${process.env.BOT_TOKEN}`
    },
  });
  return res.json()
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

async function getUserGuilds(id) {
  const realAc = await getUserToken(id);
  const responce = await fetch('http://discord.com/api/v6/users/@me/guilds', {
    method: "GET",
    headers: {
      Authorization: `Bearer ${realAc}`
    }
  })
  console.log('Returned user guilds');
  return responce.json()
}

async function getGuildMembers(id) {
  const res = await fetch(`http://discord.com/api/v6/guilds/${id}/members`, {
    method: 'GET',
    headers: {
      Authorization: `Bot ${process.env.BOT_TOKEN}`,
    },
  });
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
};