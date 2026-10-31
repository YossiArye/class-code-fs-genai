import { useReducer, type ReactNode } from 'react'
import { CartContext } from './CartContext'
import { cartReducer, initialCart } from './cartReducer'

// The reducer lives here, in ONE place. Everything below can read the cart and dispatch actions.
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart)

  return <CartContext.Provider value={{ cart, dispatch }}>{children}</CartContext.Provider>
}
