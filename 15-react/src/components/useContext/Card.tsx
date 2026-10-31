// Card.tsx
import { useTheme } from './ThemeContext'

export default function Card() {
  const { theme } = useTheme()
  
  return (
    <div style={{
      backgroundColor: theme === 'light' ? '#fff' : '#444',
      border: `1px solid ${theme === 'light' ? '#ddd' : '#666'}`,
      padding: '20px',
      margin: '10px',
      borderRadius: '8px'
    }}>
      <h3>Card Title</h3>
      <p>This card automatically adapts to the theme!</p>
    </div>
  )
}
