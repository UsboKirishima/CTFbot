import { ChatInputCommandInteraction } from "discord.js";
import { Command } from "../../structures/Command";
import CTFBot from "../../structures/CTFBot";
import refreshCommands from "../../handlers/RefreshCommands";

export default class RefreshCommand extends Command {
  public constructor (client: CTFBot) {
    super(client, {
      name: "refresh",
      description: "!!ATTENTION!! Refresh and register all the commands. (Admins Only)",
      category: 'test'
    })
  }

  async run(interaction: ChatInputCommandInteraction): Promise<void> {
        let isAdmin: boolean = await (this.client as CTFBot).config.admins.includes(interaction.user.id);

        if(!isAdmin) return void await interaction.reply('You are not an admin.')

        await refreshCommands(this.client as CTFBot).then(async (): Promise<void> => {
            return void await interaction.reply(`Refreshed commands`);
        })
  }
}