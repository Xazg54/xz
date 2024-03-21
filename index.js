const Discord = require("discord.js-selfbot-v13");
const { Client } = require('discord.js-selfbot-v13');
const client = new Discord.Client({
    checkUpdate: false
});
const express = require('express')
const app = express();
const port = 8000;

const largeImages = [
    'https://media.discordapp.net/attachments/1219958499304542209/1220359198290870282/ppx.webp?ex=660ea712&is=65fc3212&hm=b14a88e647e9a4fbebe97fa7ef767feb44a515b7578761bf65937dfeac022d1e&=&format=webp',
    'https://media.discordapp.net/attachments/1219958499304542209/1220359198576087191/ppx1.gif?ex=660ea712&is=65fc3212&hm=16c2da801bc31fe540e1f1efcbf02bf8452799b0ce4b3111f1fe8b69866ae6a8&=',
    'https://media.discordapp.net/attachments/1219958499304542209/1220359199125536818/ppx2.gif?ex=660ea712&is=65fc3212&hm=8724a19ae4b841a5084d4db0939f32bd9616588c245a8152386aeaf516136815&=',
    'https://media.discordapp.net/attachments/1219958499304542209/1220359199507222559/ppx3.gif?ex=660ea712&is=65fc3212&hm=8862744382fa7e0e40149a3fe9baacea291fee12705f7a56e5f361083c73b50d&='
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
