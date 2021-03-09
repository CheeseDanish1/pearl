const ms = require('parse-ms');

module.exports.run = async (client, message, args, {UserConfig}) => {
  const celeb = [
    'Mickey Mouse',
    'Ariana Grande',
    'Docter Strange',
    'Taylor Swift',
    'Docter Who',
    'Tyler Joseph',
    'Josh Dunn',
    'Miley Cyrus',
    'Kim Kardashian',
    'Kayne West',
    'George Washington',
    'Ghandi',
    'Christopher Columbus',
    'Justin Beiber',
    'Lady Gaga',
    'Katy Perry',
    'Justin Timberlake',
    'Jay Leno',
    'David Letterman',
    'Elle McPherson',
    'Jennifer Aniston',
    'Donald Duck',
    'Goofy',
    'Johnny Depp',
    'Brittney Spears',
    'Hugh Jackman',
    'Vladimir Putin',
    'Daniel Radcliffe',
    'Eminem',
    'Helen Keller',
    'Robin Williams',
    'Steve Martin',
    'Fred Astaire',
    'Whoopi Goldberg',
    'Jane Austen',
    'Bob Hope',
    'Jessica Simpson',
    'Frank Lloyd Wright',
    'Pamela Anderson',
    'Susan Boyle',
    'Mae West',
    'Snoopy',
    'Jim Carrey',
    'Michael J Fox',
  ];

  const randomNumber = Math.floor(Math.random() * (celeb.length + 1));
  const randomCeleb = celeb[randomNumber];
  const amount = Math.floor(Math.random() * (50 - 30)) + 30;
  const timeout = 60000;
  let begTimeout = UserConfig.timeout.beg;

  if (begTimeout !== null && timeout - (Date.now() - begTimeout) > 0) {
    let time = ms(timeout - (Date.now() - begTimeout));

    message.channel.send(
      `You have been begging to much lately! \nYou can start beggining again in **${time.seconds}** seconds!`
    );
  } else {
    message.channel.send(`${randomCeleb} gave you ${amount}$`);

    await UserConfig.updateOne({$inc: {'economy.balance': amount}});
    await UserConfig.updateOne({$set: {'timeout.beg': Date.now()}});
    // db.add(`money_${message.author.id}`, amount);
    // db.set(`begtimeout_${message.author.id}`, Date.now());
  }
};
