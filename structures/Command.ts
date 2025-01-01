import { ApplicationCommandData, ApplicationCommandType, AutocompleteInteraction, Client, Interaction, PermissionResolvable } from "discord.js";
import { CommandData } from "../declarations";
import CTFBot from "./CTFBot";

export class Command {
  client: Client;

  name: string;
  description?: string;
  category?: string;
  data: ApplicationCommandData

  botPermissions?: PermissionResolvable | null
  guilds?: string[] | null

  constructor (client: Client, data: CommandData) {
    this.client = client
    this.data = data as ApplicationCommandData

    this.botPermissions = data.botPermissions
    this.guilds = data.guilds

    this.name = data.name
    if (data.type == ApplicationCommandType.ChatInput || !data.type) {
      this.description = data.description
      this.category = this.category ?? "General"
    }
  }

  async run(interaction: Interaction) {
    throw new Error(`The command "${this.name}" does not provide a run method.`)
  }

  async autocomplete(interaction: AutocompleteInteraction) {
    throw new Error(`The command "${this.name}" does not provide a run method.`)
  }
}