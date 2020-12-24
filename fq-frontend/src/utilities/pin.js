export function randomPinGenerator(pinLen) {
  const charSet =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  let pin = ''
  for (let i = 0; i < pinLen; i++) {
    pin += charSet.charAt(Math.floor(Math.random() * charSet.length))
  }
  return pin
}
