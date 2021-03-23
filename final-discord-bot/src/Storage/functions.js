const message = require('../events/message');
const colours = require('./colors');
const {addWarnings} = require('./database');
const help = require('./onMesInfo');

module.exports = {
  onMes: async function (GuildMember) {
    const vars = help.onMesVars(GuildMember);
    const {id, guild} = GuildMember;
    help.addXp(id, guild, vars.timeout, vars.xpTimout, vars.randomXp);
    help.addXpg(id, guild, vars.timeout, vars.xpTimout, vars.randomXp);
    help.mes(id, guild);
  },

  level: function (xp) {
    return Math.floor(0.25 * Math.sqrt(xp));
  },
  xpNextLevel: level => {
    return Math.pow((level + 1) * 4, 2);
  },
  xpRequiredTillNextLevel: xp => {
    return Math.pow((Math.floor(0.25 * Math.sqrt(xp)) + 1) * 4, 2) - xp;
  },

  formatDate: function (date) {
    return new Intl.DateTimeFormat('en-US').format(date);
  },
  colourNameToHex: function (colour) {
    let r = colours[colour.toLowerCase] || false;
    return r;
  },
  automod: ({Guild, message, GuildMember}) => {
    /**
     * Ignored
     *
     * Swear Words
     *
     * Zalgo
     *
     * Admin Only
     *
     * Banned Words
     *
     * Containes invites
     *
     * Mass Mentions
     *
     * Custom Commands
     *
     * Cap Detection
     *
     */

    const {ignoredStuff, automod, customCommands, prefix} = Guild;
    const {channels, people, roles} = ignoredStuff;
    const {zalgo, bannedWords, adminOnly, caps} = automod;
    const {mentions, invite, profanities} = automod;
    const amount = GuildMember.warnings.amount || 0;
    const c =
      message.content.startsWith(prefix) &&
      !message.content.startsWith(prefix + ' ');

    // Swear word detection
    if (profanities && profanities > 0) {
      const swearWordRegex = require('./curseRegex');
      if (
        !message.member.hasPermission('MANAGE_GUILD') &&
        message.content.match(swearWordRegex)
      ) {
        message.delete();
        message.reply(
          `Added \`${profanities}\` warning${
            profanities == 1 ? '' : 's'
          } for swearing\nYou now have \`${amount + profanities}\` warning${
            amount == 1 ? '' : 's'
          }`
        );

        addWarnings({amount: profanities, reason: 'Swearing', message});
        // return 'return';
        return 'return';
      }
    }

    // Zalgo detection
    if (zalgo && zalgo > 0 && !message.member.hasPermission('MANAGE_GUILD')) {
      const hasZalgo = /%CC%/g.test(encodeURIComponent(message.content));
      if (hasZalgo) {
        message.delete();
        message.reply(
          `Added \`${zalgo}\` warning${
            zalgo == 1 ? '' : 's'
          } for \`Sending zalgo\`\nYou now have \`${amount + zalgo}\` warning${
            amount == 1 ? '' : 's'
          }`
        );
        addWarnings({amount: zalgo, reason: 'Sending zalgo', message});
        return 'return';
      }
    }

    // Admin Only
    if (adminOnly && !message.member.hasPermission('ADMINISTRATOR')) {
      if (c) {
        send(`You cant use commands because admin only mode is on`);
        return 'return';
      }
    }

    // Contains banned words
    if (bannedWords && bannedWords.length) {
      let ret = false;
      bannedWords.forEach(bw => {
        if (
          message.content.toLowerCase().includes(bw) &&
          !message.member.hasPermission('MANAGE_GUILD')
        ) {
          message.delete();
          send(`Your message contains custom banned words`);
          // return 'return';
          ret = true;
        }
      });
      if (ret) return 'return';
    }

    if (
      message.content.length > 12 &&
      !message.member.hasPermission('MANAGE_GUILD') &&
      'percent' in caps &&
      'warnings' in caps &&
      caps.warnings > 0
    ) {
      const totCaps = message.content
        .split('')
        .filter(c => c.toUpperCase() == c)
        .join('').length;

      const percent = (totCaps / message.content.length) * 100;
      if (percent >= caps.percent) {
        message.delete();
        send(
          `You were given \`${caps.warnings}\` warning${
            caps.warnings > 1 ? 's' : ''
          } for \`Spammin caps\`\nYou now have \`${
            amount + caps.warnings
          }\` warning${amount + caps.warnings == 1 ? '' : 's'}`
        );
        addWarnings({
          amount: caps.warnings,
          reason: 'Spamming caps',
          message,
        });
        return 'return';
      }
    }

    // Contains invite
    const inviteRegex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|(discordapp|discord)\.com\/invite)\/.+[a-z]/gim;
    if (
      invite &&
      message.content.match(inviteRegex) &&
      !message.member.hasPermission('MANAGE_GUILD')
    ) {
      let ret = false;
      message.guild.fetchInvites().then(invites => {
        if (
          invites.find(
            invite =>
              invite.code ==
              message.content.match(inviteRegex)[0].split('/').slice(-1)
          )
        )
          return;
        message.delete();
        // send(`You are not allowed to send invite links`);
        send(
          `You were given \`${invite}\` warning${
            invite > 1 ? 's' : ''
          } for \`Sending invites to other servers\`\nYou now have \`${
            amount + invite
          }\` warning${amount + invite == 1 ? '' : 's'}`
        );
        addWarnings({
          amount: invite,
          reason: 'Sending invites to other servers',
          message,
        });
        ret = true;
      });
      if (ret) return 'return';
    }

    if ('max' in mentions && 'warnings' in mentions && mentions.warnings > 0) {
      const len =
        message.mentions.users.array().length +
        message.mentions.roles.array().length;
      if (len >= mentions.max) {
        message.delete();
        send(
          `You were warned \`${mentions.warnings}\` time${
            mentions.warnings == 1 ? '' : 's'
          } for \`Mass pinging\`\nYou now have \`${
            amount + mentions.warnings
          }\` warning${amount == 1 ? '' : 's'}`
        );
        addWarnings({
          amount: mentions.warnings,
          reason: 'Mass pinging',
          message,
        });
      }
    }

    // Check if users is being ignored
    if (channels.length && channels.includes(message.channel.id)) {
      if (c) send('Commands are disabled in this channel');
      return 'return';
    } else if (people.length && people.includes(message.author.id)) {
      if (c)
        send(
          `I am set to ignore you, if you think this is a mistake, please contact the server owner`
        );
      return 'return';
    } else if (roles.length && hasIgnoredRoles()) {
      if (c)
        send(
          `I am set to ignore people with the role ${ignoredRole()}\nIf you think this is a mistake, please contact the server owner`
        );
      return 'return';
    }

    if (customCommands.length) {
      const cc = customCommands.find(
        c => c.commands == message.content.toLowerCase()
      );
      if (cc) {
        message.channel.send(cc.content);
        return 'return';
      }
    }

    return 'Done';

    function send(con) {
      message.channel.send(con);
    }

    function ignoredRole() {
      return message.guild.roles.cache
        .get(
          roles.find(role => message.member.roles.cache.array().includes(role))
        )
        .toString();
    }

    function hasIgnoredRoles() {
      return roles.some(role =>
        message.member.roles.cache
          .array()
          .map(r => r.id)
          .includes(role)
      );
    }
  },

  getMostLikely: async function (val, arr) {
    return getMostSimilar(val, arr);

    function getMostSimilar(val, arr) {
      return arr
        .map(a => [p(a), similarity(val, a)])
        .sort((a, b) => b[1] - a[1]);
    }
    function p(str) {
      return str[0].toUpperCase() + str.toLowerCase().substring(1);
    }
    function similarity(s1, s2) {
      var longer = s1;
      var shorter = s2;
      if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
      }
      var longerLength = longer.length;
      if (longerLength == 0) {
        return 1.0;
      }
      return (
        (longerLength - editDistance(longer, shorter)) /
        parseFloat(longerLength)
      );
    }

    function editDistance(s1, s2) {
      s1 = s1.toLowerCase();
      s2 = s2.toLowerCase();

      var costs = new Array();
      for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
          if (i == 0) costs[j] = j;
          else {
            if (j > 0) {
              var newValue = costs[j - 1];
              if (s1.charAt(i - 1) != s2.charAt(j - 1))
                newValue =
                  Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
              costs[j - 1] = lastValue;
              lastValue = newValue;
            }
          }
        }
        if (i > 0) costs[s2.length] = lastValue;
      }
      return costs[s2.length];
    }
  },
};
