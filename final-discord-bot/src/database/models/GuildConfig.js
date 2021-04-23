const mongoose = require('mongoose');

let {
  String: MongString,
  Array: MongArray,
  Boolean: MongBool,
  Number: MongNumber,
} = mongoose.SchemaTypes;

const GuildConfig = new mongoose.Schema(
  {
    id: {
      type: MongString,
      required: true,
      unique: true,
    },
    prefix: {
      type: MongString,
      default: '>',
      required: true,
    },
    welcome: {
      channel: MongString,
      message: MongString,
      dm: Boolean,
    },
    logging: {
      channel: MongString,
      events: MongArray,
    },
    autorole: {
      type: MongArray,
      default: [],
      required: true,
    },

    automod: {
      adminOnly: MongBool,
      bannedWords: MongArray,
      profanities: MongNumber,
      zalgo: MongNumber,
      mentions: {
        max: MongNumber,
        warnings: MongNumber,
      },
      invite: MongNumber,
      caps: {
        percent: MongNumber,
        warnings: MongNumber,
      },
      punishments: [
        {
          strike: MongNumber,
          action: MongString,
          time: MongNumber,
        },
      ],
    },
    customCommands: [
      {
        command: MongString,
        content: MongString,
      },
    ],
    ignoredStuff: {
      channels: MongArray,
      people: MongArray,
      roles: MongArray,
    },
    reactionRoles: [
      {
        MessageId: MongString,
        Reaction: MongString,
        Role: MongString,
        Channel: MongString,
      },
    ],
    disabledCategories: [],
    disabledCommands: [],
    giveaways: [
      {
        prize: MongString,
        ends: Date,
        channel: MongString,
        mes: MongString,
        interval: MongString,
        length: MongString,
        guild: MongString,
        ended: MongBool,
        winner: {
          username: MongString,
          id: MongString,
        },
      },
    ],
    levelRoles: [
      {
        level: MongNumber,
        roles: [{name: MongString, id: MongString}],
      },
    ],
    xp: {
      cooldown: {
        default: 60000,
        type: MongNumber,
        required: true,
      },
      minxp: {
        default: 15,
        type: MongNumber,
        required: true,
      },
      maxxp: {
        default: 25,
        type: MongNumber,
        required: true,
      },
      multiplier: {
        default: 1,
        type: MongNumber,
        required: true,
      },
    },
    levelup: {
      message: {
        type: MongString,
        default: 'Congrats to {mention} for getting to level {level}',
        required: true,
      },
      channel: {
        type: MongString,
        default: 'channel',
        required: true,
      },
    },
  },
  {collection: 'GuildConfig'}
);

module.exports = mongoose.model('GuildConfig', GuildConfig);
