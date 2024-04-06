const Discord = require("discord.js-selfbot-v13");
const { Client } = require('discord.js-selfbot-v13');
const client = new Discord.Client({
    checkUpdate: false
});
const express = require('express')
const app = express();
const port = 8000;

const largeImages = [
    'https://media.discordapp.net/attachments/1219958499304542209/1226161649350742117/cat1.gif?ex=6623c306&is=66114e06&hm=7660c23cd7cd533b5d71ce4b6c0303ed61dbfa59bf18b70994d806c4b89035c1&=',
    'https://media.discordapp.net/attachments/1219958499304542209/1226161649728225441/cat4.gif?ex=6623c306&is=66114e06&hm=e40d7e9fe419f730cf975d71e7b235c0de187aa1d9011ba33cb5173a245e7c42&=',
    'https://media.discordapp.net/attachments/1219958499304542209/1226161650252648539/cat3.gif?ex=6623c306&is=66114e06&hm=ee9f73f47d39e97f2c9ec88938d9d99b7fd7a9f746cb33b517c9f75e9eae5bd9&=',
    'https://media.discordapp.net/attachments/1219958499304542209/1226161650596450344/cat2.gif?ex=6623c306&is=66114e06&hm=747e0fd6fc98ad9f50f8f67486f7c5be1ccb81f02c7b4204f0cf585c54936895&='
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
