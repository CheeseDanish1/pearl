const {evaluate} = require('mathjs')

module.exports.run = (client, message, args) => {
    let form = args.join(" ")
    let res = evaluate(form)
    message.channel.send(res)
}