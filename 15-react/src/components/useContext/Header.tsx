// Header.tsx
import { useTheme } from './ThemeContext'

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <header style={{ 
      backgroundColor: theme === 'light' ? '#fff' : '#333',
      color: theme === 'light' ? '#000' : '#fff'
    }}>
      <h1>My App</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
    </header>
  )
}
