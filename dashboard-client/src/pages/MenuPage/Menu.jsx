import React, {useState, useEffect} from 'react';
import {getGuildsWithPerms} from '../../utils/api';
import Header from '../../components/Header';
import GuildComp from '../../components/GuildComp';
import GuildCompSkeleton from '../../components/GuildCompSkeleton';
import Br from '../../components/Br';

let howManySkeletonsToLoad = 5;
let arr = Array.from(Array(howManySkeletonsToLoad).keys());

const Menu = ({history}) => {
  const [guilds, setGuilds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGuildsWithPerms()
      .then(({data}) => {
        setGuilds(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        history.push('/');
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        className="container"
        style={{
          backgroundColor: '#2f3237',
          minHeight: '100%',
          overflowX: 'hidden',
        }}
      >
        <div className="box" style={{height: '100vh', maxWidth: '100%'}}>
          <Header isLoggedIn={!!guilds} loading={loading} />
          <center>
            {/* <br />
            <br />
            <br /> */}
            <div className="text">
              <p
                style={{
                  color: 'white',
                  fontFamily: 'Poppins, Helvetica, arial, sans-serif',
                  textTransform: 'uppercase',
                  padding: '20px 0 10px 0',
                  fontWeight: '700',
                  fontSize: '24px',
                }}
              >
                Select a server
              </p>
            </div>
            <br />
            <div
              className="guilds"
              style={{
                minHeight: '100%',
                backgroundColor: '#2f3237',
              }}
            >
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
