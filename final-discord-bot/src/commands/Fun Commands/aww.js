const randomPuppy = require('random-puppy');

module.exports.run = (client, message, args) => {
    const subreddit = 'aww';
    randomPuppy(subreddit)
        .then(async (url) => {
            await message.channel
                .send({
                    files: [{
                        attachment: url,
                        name: `${subreddit}.png`,
                    }, ],
                }).catch((err) => {
                    console.error(
                        `Error in server ${message.guild.name} on channel ${message.channel.name}\n` +
                        err
                    );
                    message.channel.send(
                        'Error. Failed to send image. File size is too large'
                    );
                });
        })
        .catch((err) => console.error(err));
};