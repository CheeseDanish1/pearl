import React, {useState} from 'react';
import Input from '../Input';
import Top from './Top';
import Command from '../Command';
import {ulc} from '../../utils/update';
import PunishmentTable from '../PunishmentTable';

const automodOptions = [
  {label: 'Disabled', value: null},
  {label: 'Warn Member', value: 'warn'},
  {label: 'Mute Member', value: 'mute'},
  {label: 'Delete Message', value: 'delete'},
  {label: 'Warn & Delete', value: 'warn delete'},
  {label: 'Warn & Mute', value: 'warn mute'},
  {label: 'Mute & Delete', value: 'mute delete'},
];

const Moderation = ({user, guild, guilds}) => {
  const [loggingChannel, setLoggingChannel] = useState(
    guild.config && guild.config.logging && guild.config.logging.channel
      ? {
          value: `${guild.config.logging.channel}`,
          label:
            '#' +
            guild.channels.find(c => c.id === guild.config.logging.channel)
              .name,
        }
      : null
  );

  guild.config.automod.caps = {
    action: 'warn',
    time: null,
    warnings: 1,
    percent: 80,
    allowedChannels: [
      {name: '#spam', id: 893782098432},
      {name: '#idk', id: 937208732981},
    ],
    allowedRoles: [
      {name: 'Admin', id: 90328409823432},
      {name: 'Owner', id: 83289749327239},
    ],
  };

  let a = guild.config.automod.caps.action;
  const [capSpam, setCapSpam] = useState({
    label: !a ? 'Disabled' : a[0].toUpperCase() + a.substring(1),
    value: a || null,
  });

  return (
    <>
      <Top name="Moderation">
        <br />

        <Input
          type="input"
          guild={guild}
          guilds={guilds}
          onFinish={e => console.log(e)}
          onChange={e => console.log(e)}
          options={automodOptions}
          name={`Cap Spam (${guild.config.automod.caps.percent || 70}%)`}
          state={capSpam}
          setState={setCapSpam}
        />
        <PunishmentTable guilds={guilds} guild={guild} />

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <Input
          type="input"
          guild={guild}
          guilds={guilds}
          state={loggingChannel}
          name="Logging Channel"
          setState={setLoggingChannel}
          onFinish={(e, guild, guilds) => ulc(e, guild, guilds)}
          options={guild.channels
            .filter(c => c.type === 0)
            .map(c => ({value: c.id, label: '#' + c.name}))}
        />

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <h1 style={{color: 'white'}}>Commands</h1>
        <div
          className="commands"
          style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}
        >
          <C
            name="adminonly"
            styledName="AdminOnly"
            info="Only admins can send commands"
          />
          <C name="banword" info="Ban word or phrase from being sent " />
          <C
            name="capsspam"
            info="Delete messages that have a lot of caps"
            styledName="CapsSpam"
          />
          <C name="kick" info="Temporarily remove user from server" />
          <C
            name="massmentions"
            styledName="MassMentions"
            info="Prevent user from mass pinging roles or other users"
          />
          <C name="mute" info="Prevent someone from sending messages" />
          <C name="pardon" info="Remove warnings from user" />
          <C name="profanities" info="Swear word detection and removal" />
          <C name="punishments" info="Set automatic punishments" />
          <C
            name="removeinvites"
            styledName="RemoveInvites"
            info="Automatically remove invites to other servers"
          />
          <C name="settings" info="View your servers configurations" />
          <C name="slowmode" info="Set a slowmode for a channel" />
          <C
            name="tempmute"
            styledName="TempMute"
            info="Temporarily mute someone in your server"
          />
          <C name="unban" info="Unban someone from your server" />
          <C name="unmute" info="Unmute someone in your server" />
          <C name="warn" info="Warn someone" />
          <C name="warnings" info="View someones warnings" />
          <C name="zalgo" info="Detect and delete zalgo" />
        </div>
      </Top>
    </>
  );

  function C({name, info, styledName}) {
    return (
      <Command
        name={name}
        info={info}
        styledName={styledName}
        guild={guild}
        guilds={guilds}
        enabled={!guild.config.disabledCommands.includes(name)}
      />
    );
  }
};

export default Moderation;
