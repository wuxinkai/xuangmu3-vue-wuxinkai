// let nodeEnv = process.env.NODE_ENV
let nodeEnv = 'development'
let IP = ''
if (nodeEnv === 'development') {
  IP = 'https://www.easy-mock.com/mock/5bbab3f329a4d80bbccbcb81'
}
export const baseHref = IP

export default {}
export const LocalbaseHref = 'http://localhost:1989'
