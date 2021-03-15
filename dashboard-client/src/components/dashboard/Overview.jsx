import React from 'react';
import Form from '../Form';
import {updateGuildPrefix} from '../../utils/api';
import Input from '../Input';

const Overview = ({user, guild, guilds}) => {
  return (
    <>
      <div
        className="border"
        style={{
          paddingRight: '15px',
          marginRight: 'auto',
          paddingLeft: '15px',
          marginLeft: 'auto',
          marginTop: '15px',
        }}
      >
        <h2
          className="name"
          style={{fontFamily: 'arial', fontSize: '32px', color: 'white'}}
        >
          Overview
        </h2>
        <hr />
        <Form
          onSubmit={async r => {
            r = {...r, guilds};
            let result = (await updateGuildPrefix(guild.id, r)).data;
            console.log(result);
          }}
          initialValues={{prefix: guild.config.prefix}}
        >
          {formik => {
            return (
              <>
                <Input formik={formik} name="prefix" />
                <button type="submit">Submit</button>
              </>
            );
          }}
        </Form>
      </div>
    </>
  );
};

export default Overview;
