export interface Product {
  id: number
  name: string
  price: number
}

export interface CartItem extends Product {
  quantity: number
}

export type CartAction =
  | { type: 'add'; product: Product }
  | { type: 'increment'; id: number }
  | { type: 'decrement'; id: number }
  | { type: 'remove'; id: number }
  | { type: 'clear' }

export const initialCart: CartItem[] = []

// Pure function: never mutates `cart`, always returns a new array.
export function cartReducer(cart: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'add': {
      const existing = cart.find((item) => item.id === action.product.id)
      if (existing) {
        // already in the cart -> just increase its quantity
        return cart.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item,
        )//[{id: 2, name:'Tapuz', price: 98, quantity: 2 }, {id: 12, name: 'Tapuch', price: 93, quantity: 2 }]
      }
      return [...cart, { ...action.product, quantity: 1 }]//[{id: 2, name:'Tapuz', price: 98, quantity: 2 }, {id: 12, name: 'Tapuch', price: 93, quantity: 1 }]
    }
    case 'increment':
      return cart.map((item) => (item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item))
    case 'decrement':
      // quantity 1 -> 0 removes the item
      return cart
        .map((item) => (item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    case 'remove':
      return cart.filter((item) => item.id !== action.id)
    case 'clear':
      return initialCart
  }
}
