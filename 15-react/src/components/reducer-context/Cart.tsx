import { useCart } from './CartContext'

export default function Cart() {
  const { cart, dispatch, totalPrice } = useCart()

  if (cart.length === 0) return <p>The cart is empty.</p>

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} – ₪{item.price} × {item.quantity}{' '}
            <button onClick={() => dispatch({ type: 'decrement', id: item.id })}>-</button>{' '}
            <button onClick={() => dispatch({ type: 'increment', id: item.id })}>+</button>{' '}
            <button onClick={() => dispatch({ type: 'remove', id: item.id })}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: <b>₪{totalPrice}</b></p>
      <button onClick={() => dispatch({ type: 'clear' })}>Clear cart</button>
    </div>
  )
}
