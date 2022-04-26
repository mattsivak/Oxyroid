import express from "express";
import path from "path";
import Logger from "../classes/Logger";
import color from "colors/safe";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
// Serve the React static files after build
app.use(express.static("../client/build"));

app.listen(PORT, () => {
  Logger.log(`Server listening on port ${color.bold(color.underline(PORT.toString()))}`, "INFO", "SERVER");
});

app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello" });
});

export function start() {
  // All other unmatched requests will return the React app
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
