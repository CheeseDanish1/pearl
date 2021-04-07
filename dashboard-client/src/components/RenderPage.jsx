import Pages from './dashboard/export';
import {Redirect} from 'react-router-dom';

const RenderPage = ({page, user, guild, guilds}) => {
  let Render = Pages[page] || <Redirect to="/menu" />;
  return <Render user={user} guild={guild} guilds={guilds} />;
};
// Pages[page]({user, guild, Guild: guild, guilds});

export default RenderPage;
