import Pages from './dashboard/export';

const RenderPage = ({page, user, guild, guilds}) =>
  Pages[page]({user, guild, Guild: guild, guilds});

export default RenderPage;
