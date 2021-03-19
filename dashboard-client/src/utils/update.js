import {updateGuildPrefix, updateIgnored} from './api';
import {message} from 'antd';

export const uic = async (state, guild, guilds) => {
  let ignored = state.map(i => i.value);
  if (arraysEqual(guild.config.ignoredStuff.channels, ignored)) return;
  guild.config.ignoredStuff.channels = ignored;
  let o = {ignored, guilds};
  const res = await updateIgnored(guild.id, o, 'channels');
  message[!res.data.error ? 'success' : 'error'](res.data.msg);
};

export const uir = async (state, guild, guilds) => {
  let ignored = state.map(i => i.value);
  if (arraysEqual(guild.config.ignoredStuff.roles, ignored)) return;
  guild.config.ignoredStuff.roles = ignored;
  let o = {ignored, guilds};
  const res = await updateIgnored(guild.id, o, 'roles');
  message[!res.data.error ? 'success' : 'error'](res.data.msg);
};

export const uim = async (state, guild, guilds) => {
  let ignored = state.map(i => i.value);
  if (arraysEqual(guild.config.ignoredStuff.people, ignored)) return;
  guild.config.ignoredStuff.people = ignored;
  let o = {ignored, guilds};
  const res = await updateIgnored(guild.id, o, 'people');
  message[!res.data.error ? 'success' : 'error'](res.data.msg);
};

export const updatePrefix = async (e, guild, guilds) => {
  let prefix = e.target.value;
  let oldPrefix = guild.config.prefix;
  if (prefix === oldPrefix) return;
  else if (!prefix) {
    e.target.value = oldPrefix;
    return message.error('You must provide a prefix');
  } else if (prefix.length > 4) {
    e.target.value = oldPrefix;
    return message.error('Your prefix cant be longer than 4 characters');
  }
  guild.config.prefix = prefix;
  let res = await updateGuildPrefix(guild.id, {prefix, guilds});
  message[!res.data.error ? 'success' : 'error'](res.data.msg);
};

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;
  a = a.sort();
  b = b.sort();
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
