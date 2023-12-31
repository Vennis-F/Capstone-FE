import { all, fork } from 'redux-saga/effects'

import authWatcherSaga from 'features/auth/store/auth.sagas'
import { cartWatcherSaga } from 'features/cart/store'
import { charactersWatcherSaga } from 'features/characters/store/characters.sagas'
import { postsWatcherSaga } from 'features/posts/store/posts.sagas'

export function* rootSaga() {
  yield all([
    fork(postsWatcherSaga),
    fork(charactersWatcherSaga),
    fork(authWatcherSaga),
    fork(cartWatcherSaga),
  ])
  // yield all([fork(postsWatcherSaga), fork(charactersWatcherSaga)])
}

export default rootSaga
