const pluralItemNames = require('../constants/plural-item-names.json')

module.exports = (itemName, itemAmount) => {
  if (itemAmount !== 1) {
    itemName = pluralItemNames[itemName]
  }

  return itemName
}