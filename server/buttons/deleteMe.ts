import { ButtonStyle } from "discord.js"
import Button from "../classes/loaders/Button"

export default new Button({
  id: "delete_message",
  label: "Delete me!",
  style: ButtonStyle.Danger,
  execute (interaction) {
    if (interaction.message.deletable) {
      interaction.message.delete()
    }
  }
}) 
