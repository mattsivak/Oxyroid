import Feature from "../classes/loaders/Features";
// import database from "../classes/Database";
import Logger from "../classes/Logger";
import GuildModel from "../database/GuildModel";

export default new Feature("CreatePerGuildModel", (client) => {
  // const mongoose = new database().mongoose;

  // Get all guild ids
  const guilds = client.guilds.cache.map(g => g.id);

  // Get all guilds from database
  GuildModel.find({}, (err: any, docs: any[]) => {
    if (err) {
      Logger.log("console|file|whatsapp", `Error getting guilds from database: ${err}`, "ERR", "DB")
    }

    // Check if guild is in database
    for (const guild of docs) {
      if (!guilds.includes(guild.guildID)) {
        // Delete guild from database
        GuildModel.deleteOne({ guildID: guild.guildID }, (err: any) => {
          if (err) {
            Logger.log("console|file|whatsapp", `Error deleting guild from database: ${err}`, "ERR", "DB")
          }
        })
      }
    }

    // Check if all guilds is in database
    for (const guild of guilds) {
      if (!docs.find(doc => doc.guildID === guild)) {
        // Create guild in database
        const newGuild = new GuildModel({
          guildID: guild,
          prefix: "!"
        })

        newGuild.save((err: any) => {
          if (err) {
            Logger.log("console|file|whatsapp", `Error creating guild in database: ${err}`, "ERR", "DB")
          }
        })
      }
    }
  });
});
