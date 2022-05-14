const users = require('../users.js')

module.exports = (memberId) => {
  if (users[memberId] !== undefined) {
    return
  }

  users[memberId] = {
    'xp': 0,
    'level': 0,
    'coins': 0
  }
}