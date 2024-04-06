const Discord = require("discord.js-selfbot-v13");
const { Client } = require('discord.js-selfbot-v13');
const client = new Discord.Client({
    checkUpdate: false
});
const express = require('express')
const app = express();
const port = 8000;

const largeImages = [
    'https://images-ext-1.discordapp.net/external/YkT5BJz7k9mOFU35oDO8EZNgVbYyEsVCihyOU4Hjz0E/https/media.tenor.com/9KMPpoEXWBYAAAAM/cat-walking.gif',
    'https://images-ext-1.discordapp.net/external/pp7Yr62xeLfQ4Ev1i45NQCq2_MSKUFC9wN7VSdfyyOY/https/media.tenor.com/jTw3YLgPkKMAAAAM/angry-black-cat-meme.gif',
    'https://images-ext-1.discordapp.net/external/161tYEQ396fl6AHgY5ZchUacFP__Pzd3CtN2b4fpABM/https/media.tenor.com/gZU3n_9Nv2EAAAAM/cat-cat-stare.gif',
    'https://images-ext-1.discordapp.net/external/HC_TctzmHggmX2ohkTb48Da7zUw2czYtM2SvHFPqhFA/https/media.tenor.com/47qpxBq_Tw0AAAAM/cat-cat-meme.gif'
    // Add more large image URLs as needed
];

const stateTexts = [
    '꒰ おだいじに ꒱'
    // Add more state texts as needed
];

const nameTexts = [
  '꒰ おだいじに ꒱',
  // Add more state texts as needed
];


let currentStateIndex = 0; // Index to track the current state text

let currentLargeImageIndex = 0;

let currentnameTextsIndex = 0;

app.get('/', (req, res) => res.send('ทำงานเรียบร้อยแล้ว'))
app.listen(port, () =>
  console.log(`Your app is listening at http://localhost:${port}`)
);

client.on("ready", async () => {
  var startedAt = Date.now();
  console.log(`${client.user.username} เม็ดม่วงทำงานเรียบร้อยแล้ว !`);

  setInterval(() => {
      const currentTime = getCurrentTime();
      const currentDate = getCurrentDate();

      const r = new Discord.RichPresence()
          .setApplicationId('1121867777867788309')
          .setType('STREAMING')
          .setURL('https://www.youtube.com/watch?v=Wr0-GXVGp-E')
          .setState(stateTexts[currentStateIndex])
          .setName(nameTexts[currentnameTextsIndex])
          .setDetails(` ꒰ ⌚ ${currentTime} | 💬 ${client.user.username} ꒱ `)
          .setStartTimestamp(startedAt)
          .setAssetsLargeText(`꒰ 📅 ${currentDate}  | 🛸 0 m/s ꒱`)
          .setAssetsLargeImage(largeImages[currentLargeImageIndex])
          .setAssetsSmallText('🦊')
          .addButton('🎧', 'https://youtu.be/Wr0-GXVGp-E?si=QzaQG4Am8cFTp7wR')
          .addButton('IG', 'https://www.instagram.com/_chai7z/')

      client.user.setActivity(r);

      currentLargeImageIndex = (currentLargeImageIndex + 1) % largeImages.length;
      currentStateIndex = (currentStateIndex + 1) % stateTexts.length;
      currentnameTextsIndex = (currentnameTextsIndex + 1) % nameTexts.length;
  }, 10000); // Change large image and state text every 1 second
});

function getCurrentDate() {
  const a = new Date(Date.now());
  const c = { timeZone: "Asia/Bangkok", day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = a.toLocaleDateString("en-US", c);
  const [month, day, year] = formattedDate.split('/');
  return `${day}/${month}/${year}`;
}

function getCurrentTime() {
  const a = new Date(Date.now());
  const c = { timeZone: "Asia/Bangkok", hour: "numeric", minute: "numeric", hour12: false };
  return a.toLocaleTimeString("th-TH", c);
}

client.login(process.env.token);
