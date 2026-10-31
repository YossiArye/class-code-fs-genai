import { useCart } from './CartContext'
import type { Product } from './cartReducer'

const products: Product[] = [
  { id: 1, name: 'Keyboard', price: 120 },
  { id: 2, name: 'Mouse', price: 60 },
  { id: 3, name: 'Monitor', price: 800 },
]

export default function ProductList() {
  const { dispatch } = useCart()

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} – ₪{product.price}{' '}
            <button onClick={() => dispatch({ type: 'add', product })}>Add to cart</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
