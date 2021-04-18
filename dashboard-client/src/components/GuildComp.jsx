import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'antd';

const GuildComp = ({guild}) => {
  return (
    <>
      <div className="guild">
        <div className="guild-info">
          <img
            alt="server img"
            src={
              guild.icon
                ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`
                : 'https://discordapp.com/assets/1cbd08c76f8af6dddce02c5138971129.png'
            }
          />
          <h3>{guild.name}</h3>
        </div>

        <div className="guild-button">
          {guild.hasPearl ? idk1(guild) : idk2(guild)}
        </div>
      </div>
      <br />
      {/* <br /> */}
    </>
  );
};

const idk1 = guild => {
  return (
    <Link to={`/dashboard/${guild.id}/overview`}>
      <Button type="primary" style={{zIndex: '10'}}>
        View Configerations
      </Button>
    </Link>
  );
};

const idk2 = guild => {
  return (
    <Button
      className="guild-invite-button"
      type="ghost"
      onClick={() => {
        window.location.replace(
          `https://discord.com/oauth2/authorize?client_id=732334443196317879&scope=bot%20applications.commands&guild_id=${guild.id}&response_type=code&redirect_uri=http://localhost:3001/auth/invite/redirect&permissions=8`
        );
      }}
    >
      <div className="guild-invite">
        <p>Invite Pearl</p>
      </div>
    </Button>
  );
};

export default GuildComp;
