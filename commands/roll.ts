import Command from '../classes/loaders/Command';
import randomNumber from '../utils/randomNumber';

export default new Command({
  name: 'roll',
  description: 'You can roll whatever you want',
  group: 'fun',

  options: [
    {
      name: 'roll',
      type: 'string',
      description: 'Roll that looks like 4d6, 2k20 or 2d8+5',
      required: true
    }
  ],

  async run(_client, interaction) {
    const roll = interaction.options.get('roll')?.value as string;
    const regex = /^(?:[1-9][0-9]*)?[dk][1-9][0-9]*(?:[-+][1-9][0-9]*)?$/i;
    const throws_regex = /^([1-9][0-9]*)[dk]/i;
    const cube_regex = /[dk]([1-9][0-9]*)/i;
    const plus_regex = /([-+])([1-9][0-9]*)$/i;

    if (regex.test(roll)) {
      const count = parseInt(roll.match(throws_regex)?.[1] || '1');
      const cube = parseInt(roll.match(cube_regex)?.[1] || '6');
      let plus = parseInt(roll.match(plus_regex)?.[2] || '0');

      if (roll.match(plus_regex)?.[1] === '-') {
        plus -= 2 * plus;
      }

      let throws: number[] = [];

      for (let i = 0; i < count; i++) {
        throws.push(randomNumber(1, cube));
      }

      const sum = throws.reduce((partialSum, a) => partialSum + a, 0);

      return `You asked for: ${'```[' + roll + ']```'} Roll: ${'```[' + throws + ']```'
        } Result: ${'```' + (plus == 0 ? `${sum}` : `${sum}+${plus}=${sum + plus}`) + '```'
        }`;
    } else {
      return 'Sorry, the provided string is not valid.';
    }
  }
});
