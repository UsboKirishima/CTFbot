import { ApplicationCommandOptionType, CategoryChannel, ChannelType, ChatInputCommandInteraction, Colors, CommandInteraction, Interaction, Role, StringSelectMenuInteraction, TextChannel } from "discord.js";
import { Command } from "../../structures/Command";
import CTFBot from "../../structures/CTFBot";
import type { CTFEvent } from "../../typings/ctfevent";
import { JoinButton } from "../../components/JoinButton";

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
            ]
        });
    }

    async run(interaction: ChatInputCommandInteraction): Promise<void> {
        const eventName = interaction.options.getString("name", true);

        if (
            await (this.client as CTFBot)
                .db.getCTFEventFromGuildId(interaction.guildId as string)
        ) return void await interaction.reply({
            content: "❌ **Another event is already open**",
            ephemeral: true,
        });

        //Create Category & General Channel 
        const category = await interaction.guild?.channels.create({
            name: `${eventName}`,
            type: ChannelType.GuildCategory,
        });

        let channel: TextChannel | undefined = undefined;

        if (category instanceof CategoryChannel) {
            channel = await interaction.guild?.channels.create({
                name: "general",
                type: ChannelType.GuildText,
                parent: category.id,
            });

            if (channel instanceof TextChannel) {
                console.log(`Created channel ${channel.name} under category ${category.name}`);
            }
        } else {
            console.error("Failed to create category");
        }

        //Create Role
        const role = await interaction.guild?.roles.create({
            name: eventName,
            color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`,
        })

        const member = await interaction.guild?.members.fetch(interaction.user.id);
        await member?.roles.add(role as Role);

        const newEvent: CTFEvent = {
            guildId: interaction.guild?.id as string,
            partecipants: [],
            solves: [],
            channelId: channel?.id as string,
            roleId: role?.id as string
        };

        try {
            await (this.client as CTFBot).db.createNewEvent(newEvent);

            await interaction.reply({
                embeds: [
                    {
                        title: "🎉 New CTF Event Created!",
                        description: `**Event Name:** ${eventName}\n**Channel:** <#${channel?.id}>`,
                        color: 0x00ff00,
                        footer: {
                            text: "CTF Event Manager",
                        },
                    }
                ],
                ephemeral: true,
            });

            const joinButton = JoinButton.button();

            return void await channel?.send({
                content: `🚀 A new CTF event **${eventName}** has been created! Join now!`,
                components: [joinButton]
            });
        } catch (error) {
            console.error("Error creating event:", error);
            return void await interaction.reply({
                content: "❌ An error occurred while creating the event. Please try again later.",
                ephemeral: true,
            });
        }
    }
}
