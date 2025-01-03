import { ButtonBuilder, ButtonStyle, ActionRowBuilder, Interaction, ChatInputCommandInteraction } from "discord.js";

export const JoinButton = {
  button: () => {
    return new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId("join_button")
        .setLabel("Join!")
        .setStyle(ButtonStyle.Primary)
    );
  },
  run: async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply({
      content: "You have successfully joined!",
      ephemeral: true,
    });
  },
};
