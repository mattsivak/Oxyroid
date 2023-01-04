import {ButtonBuilder, ButtonInteraction, ButtonStyle} from "discord.js";

export default class Button {
  public builder: ButtonBuilder
  constructor(public params: {
    id: string;
    label: string;
    style: ButtonStyle,
    execute: (bInt: ButtonInteraction) => void;
  }) {
    this.builder = new ButtonBuilder().setCustomId(params.id).setLabel(params.label).setStyle(params.style)
  }
}
