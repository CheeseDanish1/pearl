const randomPuppy = require('random-puppy');

module.exports.run = (client, message, args) => {
  const subreddit = 'rarepuppers';
  randomPuppy(subreddit)
    .then(async url => {
      await message.channel
        .send({
          files: [
            {
              attachment: url,
              name: `${subreddit}.png`,
            },
          ],
        })
        .catch(err => {
          console.error(
            `Error in server ${message.guild.name} on channel ${message.channel.name}\n` +
              err
          );
          message.channel.send(
            'Error. Failed to send image. File size is too large'
          );
        });
    })
    .catch(err => console.error(err));
};

module.exports.info = {
  name: 'pupper',
  alias: [],
  usage: '<p>Pupper',
  example: '<p>Pupper',
  description: 'Get a cute dog image from r/RarePuppers',
  category: 'fun',
};
