import fs from 'fs';
import path from 'path';
import Logger from './Logger';
import Settings from './Settings';
import Database from './Database';
import Feature from './Features';
import { Client } from 'discord.js';

export default class FeaturesLoader {
  static Features: Feature[] = [];
  static client: Client;
  static alreadyLoaded: boolean = false;

  // Load features
  static load(): void {
    if (!this.client) {
      Logger.log("FeaturesLoader: No client provided", "ERR", "FEATURES", "console|file|discord");
      return;
    }

    if (this.alreadyLoaded) {
      Logger.log("FeaturesLoader: Already loaded", "WARN", "FEATURES", "console|file|discord");
      return;
    }

    const dir = path.join(__dirname, '../features');
    const files = fs.readdirSync(dir);

    for (const file of files) {
      if (file.endsWith('.ts')) {
        import(path.join(dir, file)).then((module) => {
          FeaturesLoader.Features.push(module.default);
          module.default.run(FeaturesLoader.client);

          Logger.log(`Loaded feature: ${file}`, "INFO", "FEATURES", "console|file|discord");
        });
      }
    }

    this.alreadyLoaded = true;
  }
}
