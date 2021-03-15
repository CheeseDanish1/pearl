import React, {useState, useEffect} from 'react';
import {
  getUserDetails,
  getGuild,
  getGuildsWithPerms,
  createGuildConfig,
} from '../../utils/api';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import {Redirect} from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './Dashboard.css';
import Pages from '../../components/RenderPage';
import Expand from '../../utils/sidebar-expand';

let places = [
  'overview',
  'moderation',
  'economy',
  'level',
  'music',
  'welcome',
  'fun',
  'misc',
];

const Dashboard = ({match, history}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [guild, setGuild] = useState(null);
  const [guilds, setGuilds] = useState(null);

  const {guildId: id} = match.params;

  let place = places.find(p => p === window.location.href.split('/')[5]);
  place = place[0].toUpperCase() + place.substring(1);

  useEffect(() => {
    Promise.all([getUserDetails(), getGuild(id), getGuildsWithPerms()])
      .then(async res => {
        let u = res[0].data;
        let g = res[1].data;
        let gs = res[2].data;
        // u.guild = g;

        if (!g.config) g.config = (await createGuildConfig(id, g)).data;

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

  if ((!loading && !guilds.find(g => g.id === id)) || !place)
    return <Redirect to="/menu" />;

  if (loading) return <Loading />;
  if (!loading) setTimeout(() => Expand(), 100);

  return (
    !loading && (
      <>
        <div className="dash-container">
          <div className="dash-box">
            <Header isLoggedIn={true} loading={false} shadow={true} />
            <Sidebar guild={guild} />
            <div className="dash-work1">
              <div className="dash-idk1">
                <Pages page={place} guild={guild} guilds={guilds} user={user} />
              </div>
              <div className="sidebar-background"></div>
            </div>
            <br />
          </div>
        </div>
      </>
    )
  );
};

export default Dashboard;
