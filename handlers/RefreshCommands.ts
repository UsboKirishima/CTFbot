import fs from "fs";
import path from "path";
import { Command } from "../structures/Command";
import CTFBot from "../structures/CTFBot";

export default async function refreshCommands(client: CTFBot) {
  if (!client.application) throw new Error(`Could not find client application!`);

  try {
    const commandPath = path.join(__dirname, "../commands");
    const files = await fs.promises.readdir(commandPath);

    for (const file of files) {
      const stat = await fs.promises.lstat(path.join(commandPath, file));
      if (stat.isDirectory()) await refreshCommands(client);
      if (file.endsWith(".ts") || file.endsWith(".js")) {
        const command = (await import(path.join(commandPath, file))).default;
        if (command.prototype instanceof Command) {
          const cmd = new command(client);
          client.commands.set(cmd.name, cmd);
        }
      }
    }

    const commands = client.commands.filter(value => !value.guilds).map(value => value.data);
    await client.application.commands.set(commands);

  } catch (error) {
    console.error("Error refreshing commands:", error);
  }
}
