import React, {useState} from 'react';
import {isLoggedIn} from '../../utils/api';
import {Button} from 'antd';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import './Landing.css';

const Landing = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  React.useEffect(() => {
    isLoggedIn()
      .then(({data}) => {
        setLoggedIn(data);
      })
      .catch(err => {
        console.log(err);
        setLoggedIn(false);
      });
  }, []);

  return (
    <div className="landing-container">
      <div className="landing-box">
        <Header isLoggedIn={loggedIn} />
        <center>
          <div className="landing-main">
            <div className="landing-p">
              <div className="landing-idk">
                <div className="landing-img">
                  <img
                    alt="logo"
                    src="https://cdn.discordapp.com/avatars/732334443196317879/135f558e4b20cd040cd8dd224f6fa688.png?size=256"
                  ></img>
                </div>
                <div className="landing-space" />
                <div className="landing-info">
                  <h1>Pearl</h1>
                  <h4>
                    The Only Discord Bot <br />
                    Your Server Needs
                  </h4>
                </div>
              </div>
              <div className="landing-buttons">
                <div className="landing-contain">
                  <Button
                    type="primary"
                    onClick={() => {
                      if (loggedIn === true)
                        window.location.href = 'http://localhost:3000/menu';
                      else
                        window.location.href =
                          'http://localhost:3001/auth/discord';
                    }}
                  >
                    <div>Manage Servers</div>
                  </Button>
                  <Button
                    className="landing-button-secondary"
                    onClick={() =>
                      (window.location.href =
                        'https://discord.com/oauth2/authorize?client_id=732334443196317879&scope=bot&permissions=8')
                    }
                    type="primary"
                  >
                    Invite To Server
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </center>
      </div>
    </div>
  );
};

export default Landing;
