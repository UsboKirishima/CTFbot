import { EventData } from "../declarations";
import CTFBot from "./CTFBot";

export class BotEvent {
  client: CTFBot;
  name: string;

  constructor (client: CTFBot, data: EventData) {
    this.client = client
    this.name = data.name
  }

  async run(...args: any[]) {
    throw new Error(`The command "${this.name}" does not provide a run method.`)
  }
}