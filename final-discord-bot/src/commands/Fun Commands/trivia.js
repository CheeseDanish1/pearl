const Discord = require('discord.js');
const ms = require('pretty-ms');
const parse = require('parse-ms');
const fetch = require('got');
const {setTimeout, addMoney, removeMoney} = require('../../Storage/database');

async function getQuestion(d) {
  if (d != 'easy' && d != 'medium' && d != 'hard') d = null;
  let url = `https://opentdb.com/api.php?amount=1&type=multiple&encode=url3986${
    d ? `&difficulty=${d}` : ''
  }`;

  const body = JSON.parse((await fetch(url)).body);
  const results = body.results[0];
  const {question, correct_answer, incorrect_answers, difficulty} = results;
  const choices = [...incorrect_answers, correct_answer];
  const shuffledChoices = shuffleArray(choices.map(c => decodeURIComponent(c)));
  const timeDifficulty = {easy: 10000, medium: 15000, hard: 20000};

  return {
    title: decodeURIComponent(question),
    options: shuffledChoices,
    // category,
    difficulty,
    time: timeDifficulty[difficulty],
    correct: shuffledChoices.indexOf(decodeURIComponent(correct_answer)) + 1,
  };
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

module.exports.run = async (bot, message, args, {UserConfig}) => {
  let timeout = 10000;
  let triviaTimeout = UserConfig.timeout.trivia;

  if (triviaTimeout !== null && timeout - (Date.now() - triviaTimeout) > 0) {
    let time = parse(timeout - (Date.now() - triviaTimeout));
    message.channel.send(
      `You have to wait to do more trivia. \nYou can do trivia again in **${time.seconds}s**!`
    );
    return;
  }
  await setTimeout('trivia', message.author.id);

  //Get the questions
  let difficulty = args[0] ? args[0].toLowerCase() : null;
  let q = await getQuestion(difficulty);
  let i = 0;

  //Get the time
  const prettyTime = ms(q.time, {
    verbose: true,
  });

  //Make The Embed And Send It
  const Embed = new Discord.MessageEmbed()
    .setTitle(q.title)
    .setDescription(
      q.options.map(opt => {
        i++;
        return `${i} - ${opt}\n`;
      })
    )
    .setColor(`GREEN`)
    .setFooter(
      `Reply to this message with the correct question number! You have ${prettyTime}.\nDifficulty: ${q.difficulty}`
    );

  message.channel.send(Embed);

  try {
    //Get the users nessages
    let msgs = await message.channel.awaitMessages(
      u2 => u2.author.id === message.author.id,
      {
        time: q.time,
        max: 1,
        errors: ['time'],
      }
    );

    //Check's if the user sent the right message
    if (parseInt(msgs.first().content) == q.correct) {
      message.channel.send(`You got it correct! Plus 15$`);
      addMoney(15, message.author.id);
      return;
    } else {
      message.channel.send(
        `Incorrect! The correct answer was \`${
          q.options[q.correct - 1]
        }\`. Minus 5$`
      );
      removeMoney(5, message.author.id);
      return;
    }
  } catch (e) {
    message.channel.send(`You did not answer. Minus 1$`);
    removeMoney(1, message.author.id);
    return;
  }
};

module.exports.info = {
  name: 'trivia',
  alias: [],
  usage: '<p>Trivia (difficulty)',
  example: '<p>Trivia medium',
  description:
    'Test your knowledge on a variety of different things with some trivia1',
  category: 'fun',
};
