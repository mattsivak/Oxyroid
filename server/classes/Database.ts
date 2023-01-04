import Settings from "./Settings";
import mongoose from "mongoose";
import Logger from "./Logger";



export default class DB {
  private static _instance: DB;

  public mongoose = mongoose;

  constructor() {
    if (DB._instance) {
      return DB._instance;
    } else {
      DB._instance = this;

      mongoose.connect(Settings.db);

      this.mongoose.connection.on("error", (err) => {
        Logger.log("console|file|whatsapp", `Error connecting to database: ${err}`, "ERR", "DB")
      });
      this.mongoose.connection.on("open", () => {
        Logger.log("console|file", "Connected to database", "INFO", "DB")
      });
      this.mongoose.connection.on("reconnect", () => {
        Logger.log("console|file", "Reconnected    to database", "INFO", "DB")
      })
    }
  }
}
