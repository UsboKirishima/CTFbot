import { ChatInputCommandInteraction } from "discord.js";
import { Command } from "../../structures/Command";
import CTFBot from "../../structures/CTFBot";

export default class PingCommand extends Command {
  constructor (client: CTFBot) {
    super(client, {
      name: "ping",
      description: "get the bots ping"
    })
  }

  async run(interaction: ChatInputCommandInteraction): Promise<void> {
    interaction.reply({ content: "Pong!" })
  }
}