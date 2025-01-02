import { ChatInputCommandInteraction } from "discord.js";
import { Command } from "../../structures/Command";
import CTFBot from "../../structures/CTFBot";

export default class EraseCommand extends Command {
  public constructor (client: CTFBot) {
    super(client, {
      name: "erase",
      description: "!!ATTENTION!! Erase all database. (Admins Only)",
      category: 'test'
    })
  }

  async run(interaction: ChatInputCommandInteraction): Promise<void> {
        let isAdmin: boolean = await (this.client as CTFBot).config.admins.includes(interaction.user.id);

        if(!isAdmin) return void await interaction.reply('You are not an admin.')

        await (this.client as CTFBot).db.eraseAllData().then((n) => {
            return void interaction.reply(`Erased al data Return code: \`${n}\``);
        })
  }
}