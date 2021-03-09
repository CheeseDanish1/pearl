const got = require('got')

module.exports.run = (client, message, args) => {
    const c = 'copypasta';
    re()

    function re() {
        console.log("Ran")
        got(`https://www.reddit.com/r/${c}/random/.json`).then(res => {
            let content = JSON.parse(res.body)
            let text = content[0].data.children[0].data.selftext
            if (text.length < 1999) {
                message.channel.send('```' + text + '```')
            } else {
                re()
            }
        })
    }
};