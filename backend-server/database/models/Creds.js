const mongoose = require('mongoose');

const CredsSchema = new mongoose.Schema(
  {
    accessToken: String,
    refreshToken: String,
    id: String,
  },
  {collection: 'Oauth2Creds'}
);

module.exports = mongoose.model('Oauth2Creds', CredsSchema);
