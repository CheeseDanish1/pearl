const db = require('../../database/connection')
const mongoose = require('mongoose')
const Client = require('discord.js').Client
const Message = require('discord.js').Message
const itemMadeSoFar = require('../../Storage/items')

/**
 * 
 * @param {Client} botClient 
 * @param {Message} message 
 * @param {string[]} args 
 */

module.exports.run = async (botClient, message, args) => {
    if (message.author.id != "327896498639470595") return message.channel.send("Command doesn't exist.")

    let col = mongoose.connection.db.collection('items')
    col.deleteMany({}, (err, res) => console.log("Reset db"))
    col.insertMany(itemMadeSoFar, (err, res) => {
        if (err) throw err;
        console.log("Inserted items")
    })



    // const client = new MongoClient(uri, {
    //     useUnifiedTopology: true
    // })

    // await client.connect()
    // const db = client.db('discord')
    // const collection = db.collection('items')


    // collection.drop(function(err, delOK) {
    //     if (err) throw err;
    //     if (delOK) console.log("Collection deleted");
    //   })
    // collection.insertMany(itemMadeSoFar)
    // console.log(itemMadeSoFar)
    // message.channel.send("Success")

}