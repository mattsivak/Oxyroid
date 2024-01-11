import Command from '../classes/loaders/Command';
import Settings from '../classes/Settings';
import si from 'systeminformation';
import { EmbedBuilder } from 'discord.js';

export default new Command({
  name: 'hostinfo',
  description: 'Information about server that is bot running on.',
  group: 'misc',
  run: async (_client, _message) => {
    const embed = new EmbedBuilder()
      .setColor(Settings.colors.info)
      .setTitle('OS INFORMATION');

    const platform = (await si.osInfo()).platform;
    const distro = (await si.osInfo()).distro;
    const release = (await si.osInfo()).release;
    const hostname = (await si.osInfo()).hostname;
    const user = (await si.users())[0].user;
    const ram =
      ((await si.baseboard()).memMax || (await si.mem()).total) / 1024 / 1024;
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
        name: 'CPU Efficiency cores',
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
