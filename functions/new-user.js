const users = require('../users.js')

module.exports = (userId) => {
  if (users[userId] !== undefined) {
    return
  }

  users[userId] = {
    'xp': 0,
    'level': 0,
    'coins': 0,
    'energy': {
      'amount': 10,
      'savedTimestamp': 0
    },
    'axe': {
      'name': 'Stone Axe',
      'tier': 0
    },
    'pickaxe': {
      'name': 'Stone Pickaxe',
      'tier': 0
    },
    'fishingRod': {
      'name': 'Stone Fishing Rod',
      'tier': 0
    },
    'pruner': {
      'name': 'Stone Pruner',
      'tier': 0
    },
    'ranged': {
      'name': 'Stone Bow',
      'tier': 0
    },
    'inventory': {}
  }
}