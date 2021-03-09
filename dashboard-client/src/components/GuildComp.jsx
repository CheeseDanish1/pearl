import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'antd';

const GuildComp = ({guild}) => {
  return (
    <>
      <div
        className="guild"
        style={{
          maxWidth: '720px',
          height: '60px',
          border: 'black',
          width: '100%',
          padding: '5px 10px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: '',
            width: '100%',
            minWidth: '200px',
          }}
        >
          <img
            alt="server img"
            src={
              guild.icon
                ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`
                : 'https://discordapp.com/assets/1cbd08c76f8af6dddce02c5138971129.png'
            }
            style={{
              marginRight: '10px',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
            }}
          />
          <h3
            style={{
              fontSize: '20px',
              color: '#d3d3d3',
              fontWeight: '400px',
              fontFamily: 'arial',
              marginTop: '7px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {guild.name}
          </h3>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: '',
          }}
        >
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
      type="ghost"
      style={{
        border: 'none',
        backgroundColor: '#43505c',
        paddingRight: '25px',
        paddingLeft: '25px',
        zIndex: '0',
      }}
      onClick={() => {
        window.location.replace(
          `https://discord.com/oauth2/authorize?client_id=732334443196317879&scope=bot&guild_id=${guild.id}&response_type=code&redirect_uri=http://localhost:3001/auth/invite/redirect&permissions=8`
        );
      }}
    >
      <div
        className="invite"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: '0',
        }}
      >
        <p style={{color: 'white'}}>Invite Pearl</p>
      </div>
    </Button>
  );
};

export default GuildComp;
