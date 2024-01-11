import { EmbedBuilder } from "discord.js";
import Command from "../classes/loaders/Command";
import ExprEval from "expr-eval";
import Settings from "../classes/Settings";

export default new Command({
  name: "math",
  group: "utility",
  description: "Math command uses **expr-eval** in order to evaluate mathematical expressions.",

  options: [
    {
      name: "expression",
      description: "Mathematical expression",
      type: "string",
      required: true
    }
  ],

  run: async function(_client, message) {
    const expression = message.options.get("expression")?.value as string | undefined
    const output = `${"```" + expression + "```"} = **${ExprEval.Parser.evaluate(expression || "0")}**`

    let embed = new EmbedBuilder().setTitle("Mathematical expression evaluator").setDescription(output).setColor(Settings.colors.info)

    return {
      embeds: [embed]
    }
  }
})
