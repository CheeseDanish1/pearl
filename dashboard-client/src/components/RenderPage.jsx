import Pages from './dashboard/export';

const RenderPage = ({page, user, guild, guilds}) =>
  Pages[page]({user, guild, guilds});

export default RenderPage;
