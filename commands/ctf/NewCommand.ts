import { ApplicationCommandOptionType, ChatInputCommandInteraction, TextChannel } from "discord.js";
import { Command } from "../../structures/Command";
import CTFBot from "../../structures/CTFBot";
import type { CTFEvent } from "../../typings/ctfevent";

export default class NewCommand extends Command {
    public constructor(client: CTFBot) {
        super(client, {
            name: "new",
            description: "Create a new CTF event!",
            botPermissions: ['ManageChannels', 'ManageRoles'],
            defaultMemberPermissions: 'Administrator',
            category: 'ctf',
            options: [
                {
                    name: "name",
                    description: `Specify the event name (e.g., "Bird CTF ${new Date().getFullYear()}").`,
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "channel",
                    description: "Specify the channel where the invite to join will be posted.",
                    type: ApplicationCommandOptionType.Channel,
                    required: true
                }
            ]
        });
    }

    async run(interaction: ChatInputCommandInteraction): Promise<void> {
        const eventName = interaction.options.getString("name", true);
        const channel = interaction.options.getChannel("channel", true) as TextChannel;

        if (
            await (this.client as CTFBot)
                .db.getCTFEventFromGuildId(interaction.guildId as string)
        ) return void await interaction.reply({
            content: "❌ **Another event is already open**",
            ephemeral: true,
        });

        if (!channel.isTextBased()) {
            return void await interaction.reply({
                content: "Please specify a valid text channel for the event.",
                ephemeral: true,
            });
        }

        const newEvent: CTFEvent = {
            guildId: interaction.guild?.id as string,
            partecipants: [],
            solves: [],
            channelID: channel.id,
        };

        try {
            await (this.client as CTFBot).db.createNewEvent(newEvent);

            await interaction.reply({
                embeds: [
                    {
                        title: "🎉 New CTF Event Created!",
                        description: `**Event Name:** ${eventName}\n**Channel:** <#${channel.id}>`,
                        color: 0x00ff00,
                        footer: {
                            text: "CTF Event Manager",
                        },
                    }
                ],
                ephemeral: true,
            });

            await channel.send({
                content: `🚀 A new CTF event **${eventName}** has been created! Join now!`,
            });
        } catch (error) {
            console.error("Error creating event:", error);
            await interaction.reply({
                content: "❌ An error occurred while creating the event. Please try again later.",
                ephemeral: true,
            });
        }
    }
}
