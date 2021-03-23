const path = require('path');
const fs = require('fs').promises;
const {PEARL_TOKEN: pearl, TESTING_BOT_TOKEN: testing} = process.env;

module.exports = function (client) {
  // Register Events, Commands.
  client.login(testing);
  registerEvents(client);
  registerCommands(client);
};

function registerEvents(client) {
  fs.readdir(path.join(__dirname, '..', 'events'))
    .then(files => files.filter(file => file.endsWith('.js')))
    .then(files =>
      files.forEach(file => {
        let eventName = file.substr(0, file.indexOf('.js'));
        let event = require(path.join(__dirname, '..', 'events', eventName));
        client.on(eventName, event.bind(null, client));
      })
    )
    .catch(err => console.log(err));
}

function registerCommands(client) {
  client.commands = new Map();
  recurDir(client, 'commands')
    .then(() => console.log('Commands are done loading'))
    .catch(err => console.log(err));
}

async function recurDir(client, curr) {
  let dirs = await fs.readdir(path.join(__dirname, '..', curr));
  if (dirs.length > 0) {
    await dirs.forEachAsync(client, dirs, curr, fs.lstat); // Iterate through each file in the current directory.
  }
}

Array.prototype.forEachAsync = async (client, dirs, currDir, cb) => {
  for (let i = 0; i < dirs.length; i++) {
    // Call fs.lstat.
    let curr = await cb(path.join(__dirname, '..', currDir, dirs[i]), i, dirs);
    // console.log(curr.isDirectory());
    if (curr.isDirectory()) await recurDir(client, path.join(currDir, dirs[i]));
    else {
      let cmdModule = require(path.join(__dirname, '..', currDir, dirs[i]));
      let cmdName = dirs[i].substring(0, dirs[i].indexOf('.js'));
      let {info} = cmdModule;
      if (!info) continue;
      client.commands.set(cmdName.toLowerCase(), cmdModule);
      // if (info && info.alias && info.alias.length > 0)
      //   info.alias.forEach(d => {
      //     client.commands.set(d.toLowerCase(), {
      //       run: cmdModule.run,
      //       info: {...info, type: 'alias'},
      //     });
      //   });
    }
  }
};
