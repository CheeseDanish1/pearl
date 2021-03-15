import axios from 'axios';

export function createGuildConfig(id, guild) {
  return axios.put(
    `http://localhost:3001/api/bot/guilds/config/create`,
    {id, guild},
    {
      withCredentials: true,
    }
  );
}

export function getUserDetails() {
  return axios.get('http://localhost:3001/api/bot/users/me/', {
    withCredentials: true,
  });
}

export function isLoggedIn() {
  return axios.get('http://localhost:3001/api/isLoggedIn', {
    withCredentials: true,
  });
}

export function getMutualGuilds() {
  return axios.get('http://localhost:3001/api/bot/guilds/mutual', {
    withCredentials: true,
  });
}

export function getGuildsWithPerms() {
  return axios.get('http://localhost:3001/api/bot/guilds/perms', {
    withCredentials: true,
  });
}

export function getGuild(id) {
  return axios.get(`http://localhost:3001/api/bot/guilds/id/${id}`, {
    withCredentials: true,
  });
}

export function getGuildConfig(id) {
  return axios.get(`http://localhost:3001/api/bot/guilds/id/${id}/config`, {
    withCredentials: true,
  });
}

export function getUserGuilds(id) {
  return axios.get(`http://localhost:3001/api/bot/guilds/me`, {
    withCredentials: true,
  });
}

export function updateGuildPrefix(id, ops) {
  return axios.put(
    `http://localhost:3001/api/bot/guilds/id/${id}/prefix`,
    ops,
    {withCredentials: true}
  );
}
