const mongoose = require('mongoose');

const UserConfig = new mongoose.Schema(
  {
    id: String,
    xpg: Number,
    messages: Number,
    economy: {
      balance: Number,
      bank: Number,
      inventory: [
        {
          name: String,
          lowercaseName: String,
          price: Number,
          description: String,
          sellPrice: Number,
          emoji: String,
        },
      ],
    },
    timeout: {
      rob: Date,
      beg: Date,
      daily: Date,
      weekly: Date,
      trivia: Date,
    },
    lastCmdRanDate: Date,
    lastCmdRanName: String,
  },
  {collection: 'UserConfig'}
);

module.exports = mongoose.model('UserConfig', UserConfig);
