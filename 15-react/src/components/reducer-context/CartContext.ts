import { createContext, useContext, type Dispatch } from 'react'
import type { CartAction, CartItem } from './cartReducer'

interface CartContextValue {
  cart: CartItem[]
  dispatch: Dispatch<CartAction>
}

export const CartContext = createContext<CartContextValue | null>(null)

// Consumers call useCart() instead of useContext(CartContext) + null check.
export function useCart() {
  const value = useContext(CartContext)
  if (!value) throw new Error('useCart must be used inside <CartProvider>')

  const { cart, dispatch } = value
  // Derived values are computed from the state, not stored in it.
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0)

  return { cart, dispatch, totalItems, totalPrice }
}
