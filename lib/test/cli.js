import test from 'ava'
import Cli from './../src/Cli'

test('init: instance vars', t => {
  t.is(cli.args, 'any')
})

test('get: various cli results', t => {
  const target = 'any-t'
  const isScreenshot = false
  const _ = ['stop']
  cli.argv = {
    t: target,
    s: isScreenshot,
    _
  }
  t.is(cli.target, target)
  t.is(cli.isScreenshot, isScreenshot)
  t.is(cli.isStop, true)
  t.is(cli.isStart, false)
})

let cli
test.beforeEach('setup', () => {
  cli = new Cli('any')
})
