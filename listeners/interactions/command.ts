import { Interaction } from "discord.js";
import CTFBot from "../../structures/CTFBot";
import { BotEvent } from "../../structures/Event";

export default class SlashCommandEvent extends BotEvent {
  constructor(client: CTFBot) {
    super(client, {
      name: "interactionCreate"
    })
  }

  async run(interaction: Interaction): Promise<void> {
    if (!interaction.isChatInputCommand()) return;
    const command = this.client.commands.get(interaction.commandName)
    if (!command) throw new Error(`${interaction.commandName} is not a valid command!`)
    await command.run(interaction)
  }
}