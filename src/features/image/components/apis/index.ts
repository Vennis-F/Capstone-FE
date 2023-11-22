/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Env } from 'config/Env'
// import makeApi from 'libs/core/configureAxios'

// const api = makeApi(`${Env.API_BASE_URL}`)

const IMAGE_BASE_URL = `/image`

export const getImage = (path: string): string =>
  `${
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_API_BASE_CLOUD_URL
      : process.env.REACT_APP_API_BASE_LOCAL_URL
  }${IMAGE_BASE_URL}?path=${path}`
