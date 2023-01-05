import database from "../classes/Database";

const mongoose = new database().mongoose;

const reqString = {
  type: String,
  required: true
}

const GuildSchema = new mongoose.Schema({
  guildID: reqString,
  welcomeChannelID: String
});



export default mongoose.model("guild", GuildSchema);
