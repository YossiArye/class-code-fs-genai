import { CartProvider } from './CartProvider'
import CartBadge from './CartBadge'
import ProductList from './ProductList'
import Cart from './Cart'

// Three components that never receive props from each other,
// yet always show the same cart, because they share one reducer through context.
export default function ShopDemo() {
  return (
    <section>
      <h1>useReducer + useContext: shopping cart</h1>
      <CartProvider>
        <CartBadge />
        <ProductList />
        <Cart />
      </CartProvider>

      <p className="hint">
        useContext shares the state and dispatch. useReducer keeps all the cart rules (add,
        increment, remove...) in one pure function, so any component only dispatches what happened.
      </p>
    </section>
  )
}
