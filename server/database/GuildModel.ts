import database from "../classes/Database";

const mongoose = new database().mongoose;

const GuildSchema = new mongoose.Schema({
  guildID: String,
  prefix: String,
});



export default mongoose.model("guild", GuildSchema);
