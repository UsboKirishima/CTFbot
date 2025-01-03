import { Interaction } from "discord.js";
import CTFBot from "../../structures/CTFBot";
import { BotEvent } from "../../structures/Event";
import type { CTFEvent, Partecipant } from "../../typings/ctfevent";

export default class ButtonInteractionEvent extends BotEvent {
    constructor(client: CTFBot) {
        super(client, {
            name: "interactionCreate",
        });
    }

    async run(interaction: Interaction): Promise<void> {
        if (!interaction.isButton()) return;

        if (interaction.customId === "join_button") {

            let newPartecipant: Partecipant = {
                id: interaction.user.id,
                solves: [],
                event: (await (this.client as CTFBot)
                    .db.getCTFEventFromGuildId(interaction.guildId as string)) as CTFEvent
            }

            await (this.client as CTFBot)
                .db.addUserToCTFEvent(interaction.guildId as string, newPartecipant)
                .then(async (ctfEvent: CTFEvent | null) => {
                    await interaction.reply({
                        content: "You have successfully joined!",
                        ephemeral: true,
                    });
                })
                .catch(async (err) => {
                    await interaction.reply({
                        content: `${err}`,
                        ephemeral: true,
                    });
                })


        }
    }
}
