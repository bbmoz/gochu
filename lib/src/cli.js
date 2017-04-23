// $FlowFixMe
const yargs = require('yargs')

const argv = yargs
  .usage('Usage: gochu <command> [options]')
  .command('run', 'Generate gochu graph on http://localhost:8080', yargs => {
    return yargs.usage('Usage: gochu run [options]')
      .example(`gochu run -t 'example/**/*.js'`, 'Generate graph from js files in the example dir')
      .demandOption(['t'])
      .describe('t', 'Specify glob pattern in quotes')
      .alias('t', 'target')
      .nargs('t', 1)
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
  isStart: command === 'start'
}
