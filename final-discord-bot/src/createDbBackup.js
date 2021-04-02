const fs = require('fs');
const gc = require('./database/models/GuildConfig');
const gmc = require('./database/models/GuildMemberConfig');
const uc = require('./database/models/UserConfig');
(async function () {
  const gcres = await gc.find({});
  fs.writeFile(
    __dirname + '/backup/GuildConfigBackup.txt',
    gcres,
    (err, content) => {
      if (err) console.log(err);
    }
  );

  const gmcres = await gmc.find({});
  fs.writeFile(
    __dirname + '/backup/GuildMemberConfigBackup.txt',
    gmcres,
    (err, content) => {
      if (err) console.log(err);
    }
  );

  const ucres = await uc.find({});
  fs.writeFile(
    __dirname + '/backup/UserConfigBackup.txt',
    ucres,
    (err, content) => {
      if (err) console.log(err);
    }
  );
  console.log('Database backup made');
})();
