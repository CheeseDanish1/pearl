import React, {useState} from 'react';
import {Switch, message} from 'antd';
import {toggleCommand} from '../utils/api';

function Command({name, info, styledName, guild, guilds, setGuild, enabled}) {
  const [checked, setChecked] = useState(enabled);
  const {prefix} = guild.config;

  if (!styledName)
    styledName =
      styledName ||
      name
        .split(' ')
        .map(d => d[0].toUpperCase() + d.toLowerCase().substring(1))
        .join(' ');

  const onChange = async enabled => {
    setChecked(enabled);
    const res = await toggleCommand(guild.id, {
      command: styledName,
      guilds,
      enabled,
    });
    setGuild(prev =>
      res.data.error ? prev : {...prev, config: {...res.data.result}}
    );
    message[res.data.error ? 'warning' : 'success'](res.data.msg);
  };

  return (
    <div className="command">
      <div className="command-info">
        <span className="command-name">{prefix + styledName}</span>
        <span className="command-desc">{info}</span>
      </div>
      <Switch
        className="command-switch"
        onChange={onChange}
        checked={checked}
      />
    </div>
  );
}

export default Command;
