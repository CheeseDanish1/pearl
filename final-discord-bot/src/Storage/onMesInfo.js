module.exports = {
    onMesVars: function (GuildMember) {
        let re = {
            timeout: 60000,
            xpTimout: GuildMember.xptimeout,
            RandomXp: Math.floor(Math.random() * (25 - 15 + 1)) + 15
        }
        return re;
    },

    addXp: async function (GuildMemberConfig, timeout, xpTimout, RandomXp) {
        if (xpTimout && timeout - (Date.now() - xpTimout) > 0) timeout
        else {
            await GuildMemberConfig.updateOne({$inc: {"xp": RandomXp}})
            await GuildMemberConfig.updateOne({$set: {"xptimeout": Date.now()}})
        }
    },

    addXpg: async function (User, timeout, xpTimeout, RandomXp) {
        if (xpTimeout && timeout - (Date.now() - xpTimeout) > 0) timeout
        else {
            // db.add(`xpg_${message.author.id}`, RandomXp)
            // db.set(`xpgtimeout_${message.author.id}`, Date.now())
            await User.updateOne({$inc: {xpg: RandomXp}})
        }
    },
    mes: async function (GuildMemberConfig, User) {
        // db.add(`messages_${message.guild.id}_${message.author.id}`, 1)
        await GuildMemberConfig.updateOne({$inc: {messages: 1}})
        // db.add(`messagesg_${message.author.id}`, 1)
        await User.updateOne({$inc: {messages: 1}})
    },
    updateBotInfo: function (message, db, prefix) {
        if (message.content.startsWith(prefix) && !message.content.startsWith(`${prefix} `)) {
            db.add(`cmd_per_min`, 1)
            db.add(`cmd_per_day`, 1)
            db.add(`cmd_per_all`, 1)
        }
    }
}