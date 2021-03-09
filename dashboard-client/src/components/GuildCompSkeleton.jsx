import React from 'react';
import {Skeleton} from 'antd';

const GuildCompSkeleton = () => {
  return (
    <>
      <div
        className="guild"
        style={{
          maxWidth: '720px',
          height: '60px',
          border: 'black',
          width: '100%',
          padding: '5px 10px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: '',
            width: '100%',
            minWidth: '200px',
          }}
        >
          <Skeleton.Avatar
            shape="circle"
            active
            style={{
              marginRight: '10px',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
            }}
          />
          <div className="w-40" style={{width: '40%'}}>
            <Skeleton
              loading
              title
              paragraph={false}
              style={{width: '200px'}}
              active
            />
          </div>
        </div>

        <div style={{display: 'flex', alignItems: 'center', flexWrap: ''}}>
          <Skeleton.Button active style={{width: '150px'}}></Skeleton.Button>
        </div>
      </div>
      <br />
    </>
  );
};

export default GuildCompSkeleton;
