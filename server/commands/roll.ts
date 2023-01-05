import Command from "../classes/loaders/Command";
import randomNumber from "../utils/randomNumber"

export default new Command({
  name: "roll",
  description: "You can roll what ever you wan't",
  group: "fun",

  options: [
    {
      name: "roll",
      type: "string",
      description: "Roll that looks like 4d6 or 2d20",
      required: true
    }
  ],

  async run(client, interaction) {
      const roll = interaction.options.get("roll")?.value as string

      const regex = /(?:[1-9][0-9]*)?d[0-9]+/i;
  
      if (regex.test(roll)) {
        const [count, cube] = roll.split("d")
        let throws: Array<number> = []

        for (let i = 0; i < (!parseInt(count) ? 1 : parseInt(count)); i++) {
          throws.push(randomNumber(1, parseInt(cube)))
        }

        return `You asked for: ${"```[" + roll + "]```"} Roll: ${"```[" + throws + "]```"} Result: ${"```" + throws.reduce((partialSum, a) => partialSum + a, 0) + "```"}`
      } else {
        return "Sorry, some error occurred."
      }
    },
})