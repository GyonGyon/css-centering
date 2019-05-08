const log = console.log.bind(console)

const success = console.log.bind(console, 'SUCCESS: ')

const failure = console.error.bind(console, 'FAILURE: ')

module.exports = { log, success, failure }
