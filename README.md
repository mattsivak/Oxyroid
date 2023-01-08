# Oxyroid 
## Powerfull multipurpose discord bot

### Installation

```bash
git clone https://github.com/matthsivak/Oxyroid/
npm install
```

### Run backend part

```bash
npx ts-node server/index.ts
```

### Disclaimer. This framework is for developers to make there work very esier. It is not for peaple that don't anything about discordjs. 

### What we have for you?

 * CommandLoader for fast commmand creation.
 * FeturesLoader for fast creation of event lisneners.
 * Great logger for debbuging.
 * MongoDB support builted in.

### Adding command

Create file in server/commands that ends with .ts

```ts
import Command from "../classes/loaders/Command"

export default new Command({
  name: "yourCommand",
  description: "this is you command",
  group: "your-commands",

  run(client, interaction) {
    return "this is your command"
  }

  options: [
    {
      type: "string",
      name: "yourOption",
      description: "Your option description",
      required: true,
    }
  ]
})
```

### Adding feature

Create file in server/features that ends with .ts

```ts
import Feature from "../classes/loaders/Features"

export default new Feature("YourFeture", (client) => {
  client.on("ready", () => {
    client.user.setActivity("Your Activity", { type: "WATCHING" })
  })
})
```


