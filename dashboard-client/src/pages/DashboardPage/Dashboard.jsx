import React, {useState, useEffect} from 'react';
import {getUserDetails, getGuild, getGuildsWithPerms} from '../../utils/api';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import {Redirect} from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './Dashboard.css';

const Dashboard = ({match, history}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [guild, setGuild] = useState(null);
  const [guilds, setGuilds] = useState(null);

  const {guildId: id} = match.params;

  useEffect(() => {
    Promise.all([getUserDetails(), getGuild(id), getGuildsWithPerms()])
      .then(res => {
        let u = res[0].data;
        let g = res[1].data;
        let gs = res[2].data;

        setUser(u);
        setGuild(g);
        setGuilds(gs);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        history.push('/');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loading && !guilds.find(g => g.id === id))
    return <Redirect to="/menu" />;

  if (loading) return <Loading />;
  if (!loading) console.log(guild);

  return (
    !loading && (
      <>
        <div className="dash-container">
          <div className="dash-box">
            <Header isLoggedIn={true} loading={false} shadow={true} />
            <Sidebar guild={guild} />
            <div className="dash-work1">
              <div className="dash-idk1">
                <div className="dash-work2">
                  <div className="dash-idk2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Dashboard;

/* import React, {useState, useEffect} from 'react';
import {getUserDetails, getGuild, getGuildsWithPerms} from '../../utils/api';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import {Redirect} from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './Dashboard.css';

const Dashboard = ({match, history}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [guild, setGuild] = useState(null);
  const [guilds, setGuilds] = useState(null);

  const {guildId: id} = match.params;

  useEffect(() => {
    Promise.all([getUserDetails(), getGuild(id), getGuildsWithPerms()])
      .then(res => {
        let u = res[0].data;
        let g = res[1].data;
        let gs = res[2].data;

        setUser(u);
        setGuild(g);
        setGuilds(gs);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        history.push('/');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loading && !guilds.find(g => g.id === id))
    return <Redirect to="/menu" />;

  if (loading) return <Loading />;
  if (!loading) console.log(guild);

  return (
    !loading && (
      <>
        <div
          className="dash-container"
          style={{
            minHeight: '100%',
          }}
        >
          <div className="dash-box" style={{height: '100vh', maxWidth: '100%'}}>
            <Header isLoggedIn={true} loading={false} shadow={true} />
            <Sidebar guild={guild} style={{zIndex: '1'}} />

            <div
              className="dash-work1"
              style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                height: '100%',
              }}
            >
              <div
                style={{
                  width: 'calc(100% - 250px)',
                }}
              >
                <div
                  className="dash-work2"
                  style={{
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <div
                    style={{
                      height: 'calc(100% - 62px)',
                      width: '100%',
                      backgroundColor: '#34373d',
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Dashboard;
*/
