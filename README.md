# Oxyroid

## A powerful multipurpose discord bot

**DISCLAIMER**: This framework is for developers to make their work a lot easier. It is _not_ for people that don't do anything with [discord.js](https://discord.js.org/).

### Basic setup

```bash
git clone https://github.com/matthsivak/Oxyroid/
npm install
```

### Create your `.env` file

```env
TOKEN=yourToken
DEV=off
```

### Run the discord.js part of the bot

**NOTE**: There will be a dashboard soon. But now we are focusing on the d.js part.

```bash
npx ts-node server/index.ts
```

### Current features

- **CommandLoader** for fast commmand creation
- **FeaturesLoader** for fast creation of event listeners
- A great logger for debbuging
- MongoDB support built in
