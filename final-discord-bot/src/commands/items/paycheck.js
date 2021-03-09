module.exports.run = (client, message, args, db) => {

    if (!db.get) return message.channel.send(`Command doesn't exist.`)

    let randomAmount = getRndInteger(300, 800)
    db.add('money_'+message.author.id, randomAmount)
    message.channel.send("You used your paycheck, and got "+randomAmount)
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }