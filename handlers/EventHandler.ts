import fs from "fs"
import path from "path";
import Amayi from "../structures/CTFBot";
import { BotEvent } from "../structures/Event";

export default async function build(client: Amayi, dir: string) {
    try {
        const filePath = path.join(__dirname, dir);
        const files = await fs.promises.readdir(filePath);
        for (const file of files) {
            const stat = await fs.promises.lstat(path.join(filePath, file))
            if (stat.isDirectory()) build(client, path.join(dir, file));
            if (file.endsWith(".ts") || file.endsWith(".js")) {
                const event = (await import(path.join(filePath, file))).default;
                if (event.prototype instanceof BotEvent) {
                    const ev = new event(client)
                    if (ev.once) {
                        client.once(ev.name, ev.run.bind(ev))
                    } else {
                        client.on(ev.name, ev.run.bind(ev))
                    }
                }
            }
        }
    } catch (e) {
        console.log(e)
    }
}

// client.guilds.cache.get("")?.commands.create()
// client.application?.commands.create()