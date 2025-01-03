import { QuickDB, IQuickDBOptions } from "quick.db";
import type { CTFEvent, Partecipant } from "../typings/ctfevent";

export default class CTFDatabase extends QuickDB {

    public constructor(options?: IQuickDBOptions) {
        super(options);
    }

    public createNewEvent =
        async (event: CTFEvent): Promise<CTFEvent> => await this.set(`events.${event.guildId}`, event);

    public getCTFEventFromGuildId =
        async (guildId: string): Promise<CTFEvent | null> => await this.get(`events.${guildId}`);

    public addUserToCTFEvent = async (guildId: string, partecipant: Partecipant): Promise<CTFEvent | null> => {
        const event = await this.getCTFEventFromGuildId(guildId);
        if (!event) {
            throw new Error(`No CTF Event found for guild ID: ${guildId}`);
        }

        const isAlreadyAdded = event.partecipants.some(p => p.id === partecipant.id);
        if (isAlreadyAdded) {
            throw new Error(`Partecipant with ID: ${partecipant.id} is already in the event.`);
        }

        event.partecipants.push(partecipant);

        await this.set(`events.${guildId}`, event);

        return event;
    };
    /**
     * Dangerous function
     * @returns number
     */
    public eraseAllData =
        async (): Promise<number> => await this.deleteAll();

}