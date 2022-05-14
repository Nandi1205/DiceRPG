const hourMinute = require('./hour-minute.js')

module.exports = (type, string) => {
  let code = 0

  if (type === 'info') {
    code = 36
  } else if (type === 'success') {
    code = 32
  } else if (type === 'warn') {
    code = 33
  } else if (type === 'error') {
    code = 31
  } else if (type === 'detail') {
    console.info('\x1b[35m%s\x1b[0m', '        ' + string)

    return
  }

  console.info(`\x1b[${code}m%s\x1b[0m`, `${hourMinute()} | ${string}`)
}