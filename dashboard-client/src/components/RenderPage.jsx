import Pages from './dashboard/export';

const RenderPage = ({page, user, guild}) => Pages[page]({user, guild});

export default RenderPage;
