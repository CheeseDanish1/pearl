const mongoose = require('mongoose');

const GuildMemberConfig = new mongoose.Schema(
  {
    id: String,
    guild: String,
    warnings: {
      amount: Number,
      info: [
        {
          warning: Number,
          warnedBy: String,
          reason: String,
        },
      ],
    },
    xp: Number,
    xptimeout: Date,
    messages: Number,
    afk: {
      message: String,
      timestamp: Date,
      status: Boolean,
    },
  },
  {collection: 'GuildMemberConfig'}
);

module.exports = mongoose.model('GuildMemberConfig', GuildMemberConfig);
