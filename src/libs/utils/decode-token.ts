import jwt_decode from 'jwt-decode'

import { UserInfor } from 'features/auth/types'

export default function decodeToken(accessToken: string): UserInfor {
  return jwt_decode(accessToken)
}
