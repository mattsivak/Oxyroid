import database from "../classes/Database";

const mongoose = new database().mongoose;

const reqString = {
  type: String,
  required: true
}

const GuildSchema = new mongoose.Schema({
  guildID: reqString,
  prefix: reqString, // Jen aby tu něco bylo, potom tu budou věci jako: lang a všechno ostatní
});



export default mongoose.model("guild", GuildSchema);
