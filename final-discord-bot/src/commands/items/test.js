module.exports.run = (client, message, args, db) => {

    if (!db.get) return message.channel.send(`Command doesn't exist.`)

    let rand = getRndInteger(1, 50)
    console.log(rand)
    if (rand <= 49) return message.channel.send("This does nothing!")
    else {
        message.channel.send("Here, take 10,000 and dont tell anyone, okay?")
        db.add(`money_${message.author.id}`, 10000)
        return
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }