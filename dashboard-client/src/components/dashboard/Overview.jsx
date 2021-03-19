import React from 'react';
import Input from '../Input';
import Top from './Top';
import './Overview.css';
import {uic, uim, uir, updatePrefix} from '../../utils/update';

const Overview = ({user, guild, guilds}) => {
  window.guild = guild;
  window.guild = guild;
  window.user = user;
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
          initalState={guild.config.ignoredStuff.channels.map(i => ({
            label: guild.channels.find(c => c.id === i).name,
            value: i,
          }))}
          onFinish={uic}
          options={guild.channels.map(c => ({
            value: c.id,
            label: c.name,
          }))}
        />
        <Input
          name="Ignored roles"
          guild={guild}
          guilds={guilds}
          type="multi"
          options={guild.roles.map(r => ({value: r.id, label: r.name}))}
          initalState={guild.config.ignoredStuff.roles.map(i => ({
            label: guild.roles.find(r => r.id === i).name,
            value: i,
          }))}
          onFinish={uir}
        />
        <Input
          name="Ignored members"
          guild={guild}
          guilds={guilds}
          type="multi"
          options={guild.members
            .filter(m => !m.user.bot)
            .map(r => ({
              value: r.user.id,
              label: r.user.username,
            }))}
          initalState={guild.config.ignoredStuff.people.map(i => ({
            label: guild.members.find(m => m.user.id === i).user.username,
            value: i,
          }))}
          onFinish={uim}
        />
      </Top>
    </>
  );
};

export default Overview;
