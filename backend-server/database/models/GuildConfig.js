const mongoose = require('mongoose');

let {
  String: MongString,
  Array: MongArray,
  Boolean: MongBool,
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

    ops: {
      adminOnly: MongBool,
      bannedWords: MongArray,
      profanities: MongBool,
      zalgo: MongBool,
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
      },
    ],
    disabledCategories: [],
    disabledCommands: [],
    enabledCommands: [],
  },
  {collection: 'GuildConfig'}
);

module.exports = mongoose.model('GuildConfig', GuildConfig);
