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

export function updateIgnored(id, ops, what) {
  return axios.put(
    `http://localhost:3001/api/bot/guilds/id/${id}/ignored/${what}`,
    ops,
    {withCredentials: true}
  );
}

export function toggleCommand(id, {command, guilds, enabled}) {
  if (enabled) {
    return axios.put(
      `http://localhost:3001/api/bot/guilds/id/${id}/enableCommand`,
      {command, guilds},
      {withCredentials: true}
    );
  } else {
    return axios.put(
      `http://localhost:3001/api/bot/guilds/id/${id}/disableCommand`,
      {command, guilds},
      {withCredentials: true}
    );
  }
}

export function updateLoggingChannel(id, ops) {
  return axios.put(
    `http://localhost:3001/api/bot/guilds/id/${id}/logging/channel`,
    ops,
    {withCredentials: true}
  );
}

export function setPunishments(id, ops) {
  return axios.post(
    `http://localhost:3001/api/bot/guilds/id/${id}/automod/punishments`,
    ops,
    {withCredentials: true}
  );
}
