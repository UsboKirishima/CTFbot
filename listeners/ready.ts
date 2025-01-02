import build from "../handlers/CommandHandler";
import CTFBot from "../structures/CTFBot";
import { BotEvent } from "../structures/Event";

export default class InitializeEvent extends BotEvent {
  constructor(client: CTFBot) {
    super(client, {
      name: "ready",
      once: true
    })
  }

  async run(): Promise<void> {
    await build(this.client, "../commands")

    this.client.user?.setPresence({
      status: 'online',
      activities: [
        {
          name: ".help",
          type: 1,
          url: 'https://twitch.tv/random'
        }
      ]
    });

    console.log("Successfully deployed commands and logged in as " + (this.client.user?.tag ?? "an unknown user."))
  }
}