// $FlowFixMe
const yargs = require('yargs')

const argv = yargs
  .usage('Usage: gochu <command> [options]')
  .command('run', 'Generate gochu graph', yargs => {
    return yargs.usage('Usage: gochu run [options]')
      .example(`gochu run -s -t 'example/**/*.js`, 'Generate screenshot of graph')
      .example(`gochu run -t 'example/**/*.js'`, 'Generate and display graph on web client')
      .demandOption(['t'])
      .describe('t', 'Specify glob pattern in quotes')
      .alias('t', 'target')
      .nargs('t', 1)
      .describe('s', 'Generate screenshot instead of starting a web client')
      .alias('s', 'screenshot')
      .boolean('s')
  })
  .command('start', 'Start gochu web server', yars => {
    return yargs.usage('Usage: gochu start')
  })
  .command('stop', 'Stop gochu web server', yargs => {
    return yargs.usage('Usage: gochu stop')
  })
  .demand(1, 'Provide a valid command')
  .help('h')
  .alias('h', 'help')
  .argv

const command = argv._[0]

module.exports = {
  target: argv.t,
  isStop: command === 'stop',
  isStart: command === 'start',
  isScreenshot: argv.s
}
