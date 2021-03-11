const GuildConfig = require('../database/models/GuildConfig');
const Discord = require('discord.js');

module.exports = async (client, oldPresence, newPresence) => {
  let embed = new Discord.MessageEmbed();
  let who = newPresence.guild.members.cache.get(newPresence.userID);
  if (!who) return;
  const Guild =
    (await GuildConfig.findOne({id: newPresence.guild.id})) ||
    (await GuildConfig.create({id: newPresence.guild.id}));

  let x = Guild.logging.channel;
  x = newPresence.guild.channels.cache.get(x);
  if (!x) return;
  let y = Guild.logging.events.includes('Status changes');
  if (!y) return;
  const change = {
    other: 0,
    status: 1,
    activity: 2,
  };

  if (!oldPresence || !newPresence) return;

  if (!oldPresence.status || !newPresence.status) return;

  /*let actOld = oldPresence.activities[0]
    let actNew = newPresence.activities[0]

    let newActName, oldActName, newActType, oldActType, newActDet, oldActDet, newActState, oldActState

    if (actNew && !actOld) {
        newActName = actNew.name;
        oldActName = "None Set";
        newActType = actNew.type;
        oldActType = "None";
        if (actNew.details == undefined || actNew.details == null) {
            newActDet = "None";
        } else if (actNew.details) {
            newActDet = actNew.details;
        } else {
            newActDet = "None"
        }
        oldActDet = "None";
        newActState = actNew.state;
        oldActState = "None";
    } else if (!actNew && !actOld) {
        newActName = "None Set";
        oldActName = "None Set";
        newActType = "None";
        oldActType = "None";
        newActDet = "None";
        oldActDet = "None";
        newActState = "None";
        oldActState = "None";
    } else if (!actNew && actOld) {
        newActName = "None Set";
        oldActName = actOld.name;
        newActType = "None";
        oldActType = actOld.type;
        if (actOld.details) {
            oldActDet = actNew.details;
        } else {
            oldActDet = "None";
        }
        newActState = "None";
        oldActState = actOld.state;
    } else if (actNew && actOld) {
        newActName = actNew.name;
        oldActName = actOld.name;
        newActType = actNew.type;
        oldActType = actOld.type;
        newActDet = actNew.details;
        oldActDet = actOld.details;
        newActState = actNew.state;
        oldActState = actOld.state;
    }*/
  /*if (!newActName) newActName = "None Set"
    if (!oldActName) oldActName = "None Set"
    if (!newActType) newActType = "None"
    if (!oldActType) oldActType ="None"
    if (!newActDet) newActDet = "None"
    if (!oldActDet) oldActDet = "None"
    if (!newActState) newActState = "None"
    if (!oldActState) oldActState = "None"*/

  let changes = change.other;
  if (oldPresence.status != newPresence.status) {
    changes = change.status;
  }

  /*if (actOld != actNew) {
        changes = change.activity
        embed.setTitle("Activity Changed")
            .setDescription(`**${newPresence.user.username}** Changed Their Activity`)
            .setFooter(`User Id ${newPresence.userID}`)
            .setTimestamp()
            .setColor("GREEN")

        if (oldActName != newActName) {
            embed.addFields({name: "Old Name", value: oldActName, inline: true}, {name: "New Name", value: newActName, inline: true},{ name: '\u200B', value: '\u200B', inline: true})
        }
        if (newActType != oldActType) {
            embed.addFields({name: "Old Type", value: oldActType, inline: true}, {name: "New Type", value: newActType, inline: true},{ name: '\u200B', value: '\u200B', inline: true})
        }
        if (newActDet != oldActDet) {
            embed.addFields({name: "Old Details", value: oldActDet, inline: true}, {name: "New Details", value: newActDet, inline: true},{ name: '\u200B', value: '\u200B', inline: true})
        }
        if (newActState != oldActState) {
            embed.addFields({name: "Old State", value: oldActState, inline: true}, {name: "New State", value: newActState, inline: true},{ name: '\u200B', value: '\u200B', inline: true})
        }
    }*/

  switch (changes) {
    case 1:
      embed
        .setTitle('User Status Changed')
        .setDescription(
          `**${newPresence.user.username}** changed status from **${oldPresence.status}** to **${newPresence.status}**`
        )
        .setFooter(`User Id ${newPresence.userID}`)
        .setTimestamp()
        .setColor('GREEN');
      x.send(embed);
      break;
    case 2:
      x.send(embed);
      break;

    default:
      break;
  }
};
