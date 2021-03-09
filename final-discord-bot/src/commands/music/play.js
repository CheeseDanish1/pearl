/*

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: '8974021e8c904585a716906af1a014e7',
    clientSecret: 'f8b1a7c9f8084392b0ce700798bf07f6',
})

module.exports.run = async (client, message, args) => {

    let spotRegEx = new RegExp(/^(https:\/\/[a-z]+\.spotify\.com\/(playlist|track|album)\/.+)+$/g)

    if (spotRegEx.test(args.join(" "))) {
        let type = args.join(" ").split(".com/")[1].split("/")[0]
        spotifyApi.clientCredentialsGrant().then(
            function (data) {
                spotifyApi.setAccessToken(data.body.access_token)

                let w = args.join(" ").split(".com/")[1].split("/")[1].split("?")[0]
                let songArr = []

                if (type == "playlist") {
                    spotifyApi.getPlaylistTracks(w, {}, (err, data) => {
                        if (err) throw err
                        if (!data) return message.channel.send("The link you provided was invalid")
                        data.body.items.forEach(item => songArr.push(item.track.name))
                        spotty(songArr)
                    })
                } else if (type == "track") {
                    spotifyApi.getTrack(w).then(res => {
                        if (!res) return message.channel.send("The link you provided was invalid")
                        songArr.push(res.body.name)
                        spotty(songArr)
                    })
                } else if (type == "album") {
                    spotifyApi.getAlbumTracks(w, {}, (err, data) => {
                        if (err) throw err
                        if (!data) return message.channel.send("The link you provided was invalid")
                        data.body.items.forEach(item => songArr.push(item.name))
                        spotty(songArr)
                    })
                } else message.channel.send("error")
            },
            function (err) {
                console.log(
                    'Something went wrong when retrieving an access token',
                    err.message
                );
            }
        );
        return;
    }

    */


const {
    Util,
    Message,
} = require('discord.js')
const ytdl = require('ytdl-core')
const yts = require('yt-search')

// const SpotifyWebApi = require('spotify-web-api-node');

// const spotifyApi = new SpotifyWebApi({
//     clientId: '8974021e8c904585a716906af1a014e7',
//     clientSecret: 'f8b1a7c9f8084392b0ce700798bf07f6',
// })

/**
 * 
 * @param {Message} message 
 * @param {string[]} args 
 */

module.exports.run = async (client, message, args) => {
    const {
        channel
    } = message.member.voice;
    if (!channel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
    const permissions = channel.permissionsFor(client.user);
    if (!permissions.has('CONNECT')) return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
    if (!permissions.has('SPEAK')) return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
    if (!args[0]) return message.channel.send("Please provide what you want to play")

    // let spotRegEx = new RegExp(/^(https:\/\/[a-z]+\.spotify\.com\/(playlist|track|album)\/.+)+$/g)

    // if (spotRegEx.test(args.join(" "))) {
    //     let type = args.join(" ").split(".com/")[1].split("/")[0]
    //     spotifyApi.clientCredentialsGrant().then(
    //         function (data) {
    //             spotifyApi.setAccessToken(data.body.access_token)

    //             let w = args.join(" ").split(".com/")[1].split("/")[1].split("?")[0]
    //             let songArr = []

    //             if (type == "playlist") {
    //                 spotifyApi.getPlaylistTracks(w, {}, (err, data) => {
    //                     if (err) throw err
    //                     if (!data) return message.channel.send("The link you provided was invalid")
    //                     data.body.items.forEach(item => songArr.push(item.track.name))
    //                     spotty(songArr)
    //                 })
    //             } else if (type == "track") {
    //                 spotifyApi.getTrack(w).then(res => {
    //                     if (!res) return message.channel.send("The link you provided was invalid")
    //                     songArr.push(res.body.name)
    //                     spotty(songArr)
    //                 })
    //             } else if (type == "album") {
    //                 spotifyApi.getAlbumTracks(w, {}, (err, data) => {
    //                     if (err) throw err
    //                     if (!data) return message.channel.send("The link you provided was invalid")
    //                     data.body.items.forEach(item => songArr.push(item.name))
    //                     spotty(songArr)
    //                 })
    //             } else message.channel.send("error")
    //         },
    //         function (err) {
    //             console.log(
    //                 'Something went wrong when retrieving an access token',
    //                 err.message
    //             );
    //         }
    //     );
    //     channel.join()
    //     return;
    // }

    if (!message.guild.me.voice.channel) channel.join()

    let vid = await yts(args.join(" "))
    console.log(vid.all[0])
    vid = vid.all[0].videoId

    if (!vid) return message.channel.send("I could not find any videos that match that title")

    const serverQueue = client.queue.get(message.guild.id);
    const songInfo = await ytdl.getInfo(vid.replace(/<(.+)>/g, '$1'));
    const song = {
        id: vid,
        title: Util.escapeMarkdown(songInfo.videoDetails.title),
        url: songInfo.videoDetails.video_url
    };

    console.log(songInfo.videoDetails.video_url)

    if (serverQueue) {
        serverQueue.songs.push(song);
        return message.channel.send(`✅ **${song.title}** has been added to the queue!`);
    }

    const queueConstruct = {
        textChannel: message.channel,
        voiceChannel: channel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true,
        loop: false,
    };

    client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    const play = async song => {
        const queue = client.queue.get(message.guild.id);
        if (!song) {
            queue.voiceChannel.leave();
            client.queue.delete(message.guild.id);
            return;
        }

        const dispatcher = queue.connection.play(ytdl(song.url))
            .on('finish', () => {
                if (!queue.loop) queue.songs.shift();
                play(queue.songs[0]);
            })
            .on('error', error => message.channel.send(error+""));
        dispatcher.setVolumeLogarithmic(queue.volume / 5);
        queue.textChannel.send(`🎶 Start playing: **${song.title}**`);
    };

    try {
        const connection = await channel.join();
        queueConstruct.connection = connection;
        play(queueConstruct.songs[0]);
    } catch (error) {
        console.error(`I could not join the voice channel: ${error}`);
        client.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel.send(`I could not join the voice channel: ${error}`);
    }
}