import {ButtonInteraction} from "discord.js";

export default class Button {
  constructor(public params: {
    id: string;
    execute: (bInt: ButtonInteraction) => void;
  }) {
  }
}
