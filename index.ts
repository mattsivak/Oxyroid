import { Client, GatewayIntentBits, Partials } from 'discord.js';
import Settings from './classes/Settings';
import Logger from './classes/Logger';
import Database from './classes/Database';
import FeaturesLoader from './classes/loaders/FeaturesLoader';
import CommandLoader from './classes/loaders/CommandLoader';
import ButtonsLoader from './classes/loaders/ButtonLoader';
import Data from './classes/Data';
import startServer from './express';
import ButtonLoader from './classes/loaders/ButtonLoader';
import registerExitHandler from './utils/registerExitHandler';

// Initiate client
const client = new Client({
	partials: [Partials.Message, Partials.Channel],
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMembers
	]
});

client.on('ready', async () => {
	Logger.log(`Logged in as ${client.user?.tag}`, 'INFO', 'CLIENT');

	// Connect to DB
	new Database();

	// Load client info to loaders and data class
	Data.client = client;
	Data.clientId = client.user?.id || '';
	FeaturesLoader.client = client;
	CommandLoader.client = client;
	ButtonLoader.client = client;

	// Init random stuff
	startServer();

	// Load and register loaders
	await FeaturesLoader.load();

	//   await ButtonsLoader.load()
	ButtonLoader.registerEventListener();

	await CommandLoader.load();
	//   await CommandLoader.registerCommandsOnApi()
	//   await CommandLoader.registerEventHandler()
});

const date = new Date();
const dateString = date.toLocaleString();

// Log debug messages and login client
Logger.log(
	`Starting procces. Date and time is ${dateString}`,
	'INFO',
	'PROCESS'
);
Logger.log(`Developer mode is set to: ${Settings.devMode}`, 'INFO', 'PROCESS');
client.login(Settings.token);

registerExitHandler();
