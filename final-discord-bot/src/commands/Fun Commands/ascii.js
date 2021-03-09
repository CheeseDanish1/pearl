const figlet = require('figlet');

module.exports.run = (client, message, args) => {

    let realargs = message.content.split(' ').slice(1).join(' ');

    if (realargs == undefined || !realargs) return message.channel.send('Please specify texts for the ascii conversion');


    figlet(realargs, 'standard' /*'big'*/ , function (err, text) {
        if (err) {
            message.channel.send('something went wrong...');
            message.channel.send(err);
            return;
        }
        message.channel.send('\n```' + text + '```\n');
    });

}