module.exports.run = (client, message, args, db) => {

    if (!db.get) return message.channel.send(`Command doesn't exist.`)

    let randomAmount = getRndInteger(1, 10000)

    if (randomAmount <= 9999) {
        return message.channel.send("Sorry, but you lost the lottery, better luck next time")
    }

    db.add('money_' + message.author.id, 10000)
    return message.channel.send("You won 10000$ in the lottery. Congrats!")
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}