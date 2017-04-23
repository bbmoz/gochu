const logger = {
  log (txt) {
    console.log(`${now()} => ${txt}`)
  }
}

function now () {
  return String(new Date())
}

module.exports = logger
