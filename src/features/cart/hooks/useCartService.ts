import { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from 'store/hooks'

import { cartActions, selectCart } from '../store'
import { AddCartItemBody, Cart } from '../types'

export type CartServiceOperators = {
  cart?: Cart
  createCartItem: (data: AddCartItemBody) => void
  deleteCartItem: (id: string) => void
  deleteAllCartItems: () => void
  fetchCart: () => void
}

export const useCartService = (): Readonly<CartServiceOperators> => {
  const dispatch = useAppDispatch()

  return {
    cart: useAppSelector(selectCart),

    createCartItem: useCallback(
      (data: AddCartItemBody) => {
        dispatch(cartActions.createCartItem(data))
      },
      [dispatch],
    ),

    fetchCart: useCallback(() => {
      dispatch(cartActions.fetchCart())
    }, [dispatch]),

    deleteCartItem: useCallback(
      (id: string) => {
        dispatch(cartActions.deleteCartItem({ id }))
      },
      [dispatch],
    ),

    deleteAllCartItems: useCallback(() => {
      dispatch(cartActions.deleteAllCartItems())
    }, [dispatch]),
  }
}
