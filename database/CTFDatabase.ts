import { QuickDB, IQuickDBOptions } from "quick.db";
import type { CTFEvent } from "../typings/ctfevent";

export default class CTFDatabase extends QuickDB {

    public constructor(options?: IQuickDBOptions) {
        super(options);
    }

    public createNewEvent =
        async (event: CTFEvent): Promise<CTFEvent> => await this.set(`events.${event.guildId}`, event);

    public getCTFEventFromGuildId =
        async (guildId: string): Promise<CTFEvent | null> => await this.get(`events.${guildId}`);
    
    /**
     * Dangerous function
     * @returns number
     */
    public eraseAllData = 
        async (): Promise<number> => await this.deleteAll();

}