import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from 'store/store'

import { AddCartItemBody, Cart } from '../types'

export interface CartState {
  cart?: Cart
}

const initialState: CartState = {
  cart: undefined,
}

// slice
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fetchCartSucceeded(state, action: PayloadAction<Cart>) {
      state.cart = action.payload
    },
  },
})

// Actions
export const cartActions = {
  createCartItem: createAction<AddCartItemBody>(`${cartSlice.name}/create`),
  fetchCart: createAction(`${cartSlice.name}/fetchCart`),
  fetchCartSuceeded: cartSlice.actions.fetchCartSucceeded,
  deleteCartItem: createAction<{ id: string }>(`${cartSlice.name}/delete`),
  deleteAllCartItems: createAction(`${cartSlice.name}/deleteAll`),
}

// Selectors
export const selectCart = (state: RootState) => state.cart.cart

// Reducer
export default cartSlice.reducer
