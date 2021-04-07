import React, {useState, useEffect} from 'react';
import {getGuildsWithPerms} from '../../utils/api';
import Header from '../../components/Header';
import GuildComp from '../../components/GuildComp';
import GuildCompSkeleton from '../../components/GuildCompSkeleton';
import './Menu.css';

let howManySkeletonsToLoad = 5;
let arr = Array.from(Array(howManySkeletonsToLoad).keys());

const Menu = ({history}) => {
  const [guilds, setGuilds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.time('load servers');
    getGuildsWithPerms()
      .then(({data}) => {
        setGuilds(data);
        setLoading(false);
        console.timeEnd('load servers');
      })
      .catch(err => {
        console.log(err);
        history.push('/');
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="menu-container">
        <div className="box" style={{height: '100vh', maxWidth: '100%'}}>
          <Header isLoggedIn={!!guilds} loading={loading} />
          <center>
            <div className="text">
              <p className="menu-instructions">Select a server</p>
            </div>
            <br />
            <div className="guilds">
              {loading
                ? arr.map(i => <GuildCompSkeleton key={i} />)
                : promote(guilds).map(guild => (
                    <GuildComp key={guild.id} guild={guild} />
                  ))}
            </div>
          </center>
        </div>
      </div>
    </>
  );
};

function promote(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].hasPearl === true) {
      var a = arr.splice(i, 1);
      arr.unshift(a[0]);
    }
  }
  return arr;
}

export default Menu;
