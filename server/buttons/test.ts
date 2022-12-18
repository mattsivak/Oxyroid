import Button from "../classes/loaders/Button"

export default new Button({
  id: "delete_message",
  execute (interaction) {
    if (interaction.message.deletable) {
      interaction.message.delete()
    }
  }
}) 
