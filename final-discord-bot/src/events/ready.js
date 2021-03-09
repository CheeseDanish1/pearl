module.exports = (client) => {

    client.user.setStatus('online'); //dnd, idle, online, invisible
    client.user.setActivity('>Help || Use the Feedback Command To Give Me Feedback');

    console.log(client.user.username + " has logged in.");


    // db.set(`cmd_per_min`, 0)
    // db.set(`cmd_per_day`, 0)
    
    // setInterval(() => {
    //     db.set(`cmd_per_min`, 0)
    // }, 3600000);

    // setInterval(() => {
    //     db.set(`cmd_per_day`, 0)
    // }, 86400000);

}