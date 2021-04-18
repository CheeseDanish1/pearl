import {Switch, Route} from 'react-router-dom';
import {Landing, Menu, Dashboard} from './pages/index';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact={true} component={Landing} />
        <Route path="/menu" exact={true} component={Menu} />
        <Route path="/dashboard/:guildId" exact={false} component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
