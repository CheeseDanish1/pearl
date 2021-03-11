/** @format */

const Creds = require('../database/models/Creds');
const c = require('crypto-js');
const {encrypt, decrypt} = require('../utils/utils');
const passport = require('passport');
const DiscordStrategy = require('passport-discord');
const UserConfig = require('../database/models/UserConfig');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserConfig.findOne({id});
    return user ? done(null, user) : done(null, null);
  } catch (err) {
    console.log(err);
    return done(err, null);
  }
});

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CLIENT_REDIRECT,
      scope: ['identify', 'guilds'],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);

      let {id, username, discriminator, avatar, guilds} = profile;
      const encrypredAccessToken = encrypt(accessToken).toString();
      const encryptedRefreshToken = encrypt(refreshToken).toString();

      try {
        const findUser = await UserConfig.findOneAndUpdate(
          {id},
          {
            name: `${username}#${discriminator}`,
            avatar,
          },
          {new: true}
        );
        const findCreds = await Creds.findOneAndUpdate(
          {id},
          {
            accessToken: encrypredAccessToken,
            refreshToken: encryptedRefreshToken,
          }
        );

        if (!findCreds) {
          await Creds.create({
            accessToken: encrypredAccessToken,
            refreshToken: encryptedRefreshToken,
            id,
          });
        }

        if (findUser) {
          console.log('User exists');
          return done(null, findUser);
        } else {
          const newUser = await User.create({
            id: id,
            name: `${username}#${discriminator}`,
            avatar: avatar,
          });
          return done(null, newUser);
        }
      } catch (err) {
        console.log(err);
        return done(err, null);
      }
    }
  )
);
