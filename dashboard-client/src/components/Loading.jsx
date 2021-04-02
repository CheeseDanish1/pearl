import {Spin} from 'antd';
import React from 'react';
import Header from './Header';

const Loading = () => {
  return (
    <div
      className="loading-container"
      style={{
        height: '100vh',
        width: '100%',

        backgroundColor: '#34373d',
      }}
    >
      <Header shadow={true} isLoggedIn={false} />
      <div
        className="loading-box"
        style={{
          position: 'absolute',
          bottom: '0',
          height: 'calc(100vh - 64px)',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          <Spin
            style={{marginBottom: '150px'}}
            spinning={true}
            size={'large'}
          />
        </div>
      </div>
    </div>
    // <div className="loading">
    //   <p>Loading</p>
    // </div>
  );
};

export default Loading;
