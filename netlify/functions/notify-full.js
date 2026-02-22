const fetch = require("node-fetch");

exports.handler = async () => {
  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;
  const msg = "🚨 Dustbin is FULL!\nPlease check the dashboard.";

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(msg)}`;

  try {
    await fetch(url);
    return { statusCode: 200, body: "Notification sent" };
  } catch (err) {
    return { statusCode: 500, body: "Telegram error" };
  }
};
