import createSagaMiddleware from '@redux-saga/core'
import { configureStore } from '@reduxjs/toolkit'
import { createBrowserHistory } from 'history'
import { createReduxHistoryContext } from 'redux-first-history'
import logger from 'redux-logger'

import { Env } from 'config/Env'
import authReducer from 'features/auth/store/auth.slice'
import cartReducer from 'features/cart/store/cart.slice'
import charactersReducer from 'features/characters/store/characters.slice'
import postsReducer from 'features/posts/store/posts.slice'
import { rootSaga } from 'store/rootSaga'

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
  reduxTravelling: Env.isDev(),
  savePreviousLocations: 1,
})

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware()

  const store = configureStore({
    reducer: {
      posts: postsReducer,
      characters: charactersReducer,
      auth: authReducer,
      router: routerReducer,
      cart: cartReducer,
    },
    devTools: Env.isDev(),
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: false,
        serializableCheck: {
          // Ignore these field paths in all actions
          ignoredActionPaths: ['payload.callbackFn'],
        },
      })
        .concat(sagaMiddleware)
        .concat(routerMiddleware)
        .concat(logger),
  })

  sagaMiddleware.run(rootSaga)

  return store
}

export const store = makeStore()

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const history = createReduxHistory(store)
