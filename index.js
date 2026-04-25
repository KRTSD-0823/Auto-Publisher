const config = require("./config.json");
const { Client, GatewayIntentBits, Events, ChannelType } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ]
});

client.on(Events.ClientReady, readyClient => {
  console.log(`${client.user.tag}にログインしました。`);
});

client.on(Events.MessageCreate, async message => {
  // アナウンスチャンネルか判定
  if (message.channel.type === ChannelType.GuildAnnouncement) {
    // 公開可能か判定
    if (message.crosspostable) {
      try {
      await message.crosspost();
      } catch(error) {
        console.error("エラーが発生しました: ", error);
      }
    }
  }
})

client.login(config.token);