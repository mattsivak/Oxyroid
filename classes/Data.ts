import { Snowflake } from "discord.js";
import { Client } from "discord.js";

export default class Data {
  static clientId: Snowflake = "";
  static client: Client;
}
