/**
 * Environment variables
 */
export const Env = {
  NODE_ENV: process.env.NODE_ENV,
  API_BASE_URL:
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_API_BASE_LOCAL_URL
      : process.env.REACT_APP_API_BASE_CLOUD_URL,

  isProd() {
    return this.NODE_ENV === 'production'
  },
  isDev() {
    return this.NODE_ENV === 'development'
  },
  isTest() {
    return this.NODE_ENV === 'test'
  },
}
console.log(Env)
export default Env
