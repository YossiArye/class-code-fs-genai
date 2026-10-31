import { useCart } from './CartContext'

// Reads only what it needs. It updates whenever the cart changes.
export default function CartBadge() {
  const { totalItems } = useCart()
  return <p>🛒 Items in cart: <b>{totalItems}</b></p>
}
