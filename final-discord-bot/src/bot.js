require('dotenv').config();
require('./database/connection');
require('./createDbBackup');
const discord = require('discord.js');
const client = new discord.Client({
  disableMentions: 'everyone',
  fetchAllMembers: true,
  partials: ['REACTION', 'MESSAGE', 'CHANNEL', 'USER', 'GUILD_MEMBER'],
});
const TicTacToe = require('discord-tictactoe');

new TicTacToe(
  {
    language: 'en',
    command: 'ttt',
  },
  client
);

client.queue = new Map();

require('./config/registry')(client);
