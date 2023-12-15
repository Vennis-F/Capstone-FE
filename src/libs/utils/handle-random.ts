/* eslint-disable */
const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export const generateRandomString = (): string => {
  let randomString = ''

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * alphanumeric.length)
    randomString += alphanumeric.charAt(randomIndex)
  }

  return randomString
}
