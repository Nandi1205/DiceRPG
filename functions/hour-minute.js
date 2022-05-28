module.exports = () => {
  const date = new Date()
  const hoursNumber = date.getHours()
  const minutesNumber = date.getMinutes()

  let hoursString = String(hoursNumber)
  let minutesString = String(minutesNumber)

  if (hoursNumber <= 9) {
    hoursString = '0' + hoursString
  }
  if (minutesNumber <= 9) {
    minutesString = '0' + minutesString
  }

  return `${hoursString}:${minutesString}`
}