import { BaseApplicationCommandData, ButtonStyle, ClientEvents, Events, LocalizationMap, PermissionResolvable } from "discord.js"
import { ApplicationCommandOptionData, ApplicationCommandType } from "discord.js"


declare interface ConfigCategoryData {
  name: string
  description?: string
  category: string
}

declare interface EventData {
  name: keyof ClientEvents | Events
  once?: boolean
}

declare type CommandData = 
  | ChatInputCommandData
  | UserCommandData
  | MessageCommandData

declare interface BaseCommandData extends BaseApplicationCommandData {
  botPermissions?: PermissionResolvable | null
  guilds?: string[] | null
}

declare interface ChatInputCommandData extends BaseCommandData {
  type?: ApplicationCommandType.ChatInput

  description: string
  descriptionLocatilizations?: LocalizationMap
  category?: string | null

  options?: ApplicationCommandOptionData[];
  dmPermission?: boolean
}

declare interface UserCommandData extends BaseCommandData {
  type: ApplicationCommandType.User
}

declare interface MessageCommandData extends BaseCommandData {
  type: ApplicationCommandType.Message
}