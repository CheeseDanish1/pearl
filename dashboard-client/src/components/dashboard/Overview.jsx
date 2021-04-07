import React, {useState} from 'react';
import Input from '../Input';
import Top from './Top';
import {uic, uim, uir, updatePrefix} from '../../utils/update';

const Overview = ({user, guild, guilds}) => {
  const [ignoredChannels, setIgnoredChannels] = useState(
    guild.config.ignoredStuff.channels
      .filter(c => guild.channels.find(d => d.id === c).type === 0)
      .map(i => ({
        label: guild.channels.find(c => c.id === i).name,
        value: i,
      }))
  );
  const [ignoredRoles, setIgnoredRoles] = useState(
    guild.config.ignoredStuff.roles
      .filter(r => guild.roles.find(d => d.id === r).name !== '@everyone')
      .map(i => ({
        label: guild.roles.find(r => r.id === i).name,
        value: i,
      }))
  );
  const [ignoredMembers, setIgnoredMembers] = useState(
    guild.config.ignoredStuff.people.map(i => ({
      label: guild.members.find(m => m.user.id === i).user.username,
      value: i,
    }))
  );

  return (
    <>
      <Top name="Overview">
        <Input
          onFinish={updatePrefix}
          value={guild.config.prefix}
          name="prefix"
          guild={guild}
          guilds={guilds}
          type="text"
        />
        <Input
          name="Ignored channels"
          guild={guild}
          guilds={guilds}
          type="multi"
          state={ignoredChannels}
          setState={setIgnoredChannels}
          onFinish={uic}
          options={guild.channels
            .filter(c => c.type === 0)
            .map(c => ({
              value: c.id,
              label: c.name,
            }))}
        />
        <Input
          name="Ignored roles"
          guild={guild}
          guilds={guilds}
          type="multi"
          options={guild.roles
            .filter(r => r.name !== '@everyone')
            .map(r => ({value: r.id, label: r.name}))}
          state={ignoredRoles}
          setState={setIgnoredRoles}
          onFinish={uir}
        />
        <Input
          name="Ignored members"
          guild={guild}
          guilds={guilds}
          type="multi"
          options={guild.members
            .filter(m => !m.user.bot && m.user.id !== user.id)
            .map(r => ({
              value: r.user.id,
              label: r.user.username,
            }))}
          state={ignoredMembers}
          setState={setIgnoredMembers}
          onFinish={uim}
        />
      </Top>
    </>
  );
};

export default Overview;
