import { Snowflake } from "discord-api-types";
import { Client } from "discord.js";

export default class Data {
  static clientId: Snowflake = "";
  static client: Client;
}
