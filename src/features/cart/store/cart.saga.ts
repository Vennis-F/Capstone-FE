import { SagaIterator } from 'redux-saga'
import { call, put, takeEvery } from 'redux-saga/effects'

import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'

import { addCartItem, deleteAllCartItems, deleteCartItem, getCart } from '../api'
import { AddCartItemBody, Cart } from '../types'

import { cartActions } from './cart.slice'

// Worker Sagas
export function* onGetCart(): SagaIterator {
  const cart: Cart = yield call(getCart)
  yield put(cartActions.fetchCartSuceeded(cart))
}

function* onCreateCartItem({
  payload,
}: {
  type: typeof cartActions.createCartItem
  payload: AddCartItemBody
}): SagaIterator {
  try {
    yield call(addCartItem, payload)
    yield put(cartActions.fetchCart())
  } catch (error) {
    showErrorResponseSaga({ error, defaultMessage: 'Không thể thêm vào giỏ hàng' })
  }
}

function* onDeleteCartItem({
  payload,
}: {
  type: typeof cartActions.deleteCartItem
  payload: { id: string }
}): SagaIterator {
  yield call(deleteCartItem, payload.id)
  yield put(cartActions.fetchCart())
}

function* onDeleteAllCartItems(): SagaIterator {
  yield call(deleteAllCartItems)
  yield put(cartActions.fetchCart())
}

// Watcher Saga
export function* cartWatcherSaga(): SagaIterator {
  yield takeEvery(cartActions.fetchCart.type, onGetCart)
  yield takeEvery(cartActions.createCartItem.type, onCreateCartItem)
  yield takeEvery(cartActions.deleteCartItem.type, onDeleteCartItem)
  yield takeEvery(cartActions.deleteAllCartItems.type, onDeleteAllCartItems)
}

export default cartWatcherSaga
