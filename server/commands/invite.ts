import { Client, Interaction, EmbedBuilder } from "discord.js";
import Command from "../classes/loaders/Command";
import ping from "ping";
import Settings from "../classes/Settings"
export default new Command(
  {
    name: "invite",
    description: "Invite link",
    group: "random"
  },
  async (client: Client, message: Interaction) => {
    if (!message) return "Some error occured"
    if (!message.guild) return "Some error occured";

    const embed = new EmbedBuilder()
      .setTitle("Invite link")
      .setDescription(
        `[Invite bot](https://discord.com/api/oauth2/authorize?client_id=1016991726935736392&permissions=8&scope=bot%20applications.commands)`
      )
      .setColor(Settings.successColor);

    return embed;
  }
)
