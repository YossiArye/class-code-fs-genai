// MainContent.tsx
import { useTheme } from './ThemeContext'
import Card from './Card'

export default function MainContent() {
  const { theme } = useTheme()
  
  return (
    <main style={{ 
      backgroundColor: theme === 'light' ? '#f5f5f5' : '#222',
      color: theme === 'light' ? '#000' : '#fff'
    }}>
      <h2>Main Content</h2>
      <Card />
    </main>
  )
}
