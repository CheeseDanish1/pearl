module.exports.run = (client, message, args) => {
    message.channel.send({
        files: [{
            attachment: 'src/image/scrambler-info.PNG',
            name: 'cubing-info.png'
        }]
    })
}