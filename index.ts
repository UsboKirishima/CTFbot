import { GatewayIntentBits, Partials } from "discord.js"
import CTFBot from "./structures/CTFBot";

// const { generateDependencyReport } = require('@discordjs/voice');
// console.log(generateDependencyReport());

export const client = new CTFBot({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildVoiceStates
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.Reaction
  ]
});

client.login();
