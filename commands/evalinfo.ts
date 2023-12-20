import Command from '../classes/loaders/Command';
import Settings from '../classes/Settings';
import si from 'systeminformation';
import { EmbedBuilder } from 'discord.js';

export default new Command({
  name: 'evalinfo',
  description: 'Info about System that is bot on.',
  group: 'developer',
  run: async (_client, message) => {
    if (message.channel?.id !== Settings.evalChannelId) {
      return 'This command can only be used in an eval channel!';
    }

    const embed = new EmbedBuilder()
      .setColor(0x00ae86)
      .setTitle('OS INFORMATION');

    const platform = (await si.osInfo()).platform;
    const distro = (await si.osInfo()).distro;
    const release = (await si.osInfo()).release;
    const hostname = (await si.osInfo()).hostname;
    const user = (await si.users())[0].user;
    const ram = ((await si.baseboard()).memMax || 0) / 1024 / 1024;
    const cpuCoresCount = (await si.cpu()).cores;
    const cpuEffCores = (await si.cpu()).efficiencyCores;
    const cpuClock = (await si.cpu()).speed.toString();

    embed.addFields(
      {
        name: 'Platform:',
        value: platform
      },
      {
        name: 'Distro:',
        value: distro
      },
      {
        name: 'Release:',
        value: release
      },
      {
        name: 'Hostname:',
        value: hostname
      },
      {
        name: 'User:',
        value: user
      },
      {
        name: 'RAM',
        value: (ram?.toString() || 'idk') + ' MB'
      },
      {
        name: 'CPU Cores',
        value: cpuCoresCount.toString()
      },
      {
        name: 'CPU Efficencie cores',
        value: cpuEffCores?.toString() || 'none'
      },
      {
        name: 'Clock speed',
        value: cpuClock + ' GHZ'
      }
    );
    return embed;
  }
});
