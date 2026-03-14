const express = require("express");
const app = express();
const fetch = require("node-fetch");

app.use(express.json());

const CHANNEL_ACCESS_TOKEN = "jiqhL25McvMiN72YiXodNbeHpFQDK98QK7vu/sHfDHtPNp7/FBwIvK8sh68850Gj795aR/6bzTusrEesEeT99gXrJLeM6RbJ/2LYZdtpkaqz2dUUf0Vw2M4fLJIghmJ0pTr6CMJj9EQXluLI/WW+rgdB04t89/1O/w1cDnyilFU=";

app.post("/webhook", async (req, res) => {
  const events = req.body.events;

  for (const event of events) {
    if (event.type === "message" && event.message.type === "text") {
      
      let replyText = "ลองพิมพ์คำว่า ดูดวง 🔮";

      if (event.message.text === "ดูดวง") {
        const cards = [
          "🔮 The Star — ความหวังใหม่กำลังมา",
          "👑 The Empress — ความอุดมสมบูรณ์กำลังเข้ามา",
          "⚔️ The Fool — การเริ่มต้นใหม่",
          "🌙 The Moon — ฟังเสียงหัวใจตัวเอง",
          "🔥 The Sun — ความสำเร็จกำลังมาถึง"
        ];

        replyText = cards[Math.floor(Math.random() * cards.length)];
      }

      await fetch("https://api.line.me/v2/bot/message/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${CHANNEL_ACCESS_TOKEN}`
        },
        body: JSON.stringify({
          replyToken: event.replyToken,
          messages: [
            {
              type: "text",
              text: replyText
            }
          ]
        })
      });
    }
  }

  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("LINE Tarot Bot is running 🔮");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running on port " + port);
});
