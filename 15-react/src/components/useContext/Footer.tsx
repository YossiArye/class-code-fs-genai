import { useTheme } from './ThemeContext'

export default function Footer() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <footer style={{ 
      backgroundColor: theme === 'light' ? '#f8f9fa' : '#2d2d2d',
      color: theme === 'light' ? '#333' : '#fff',
      borderTop: `1px solid ${theme === 'light' ? '#e9ecef' : '#444'}`,
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <p style={{ margin: 0 }}>&copy; 2024 My App</p>
      <button 
        onClick={toggleTheme}
        style={{
          backgroundColor: 'transparent',
          color: theme === 'light' ? '#333' : '#fff',
          border: `1px solid ${theme === 'light' ? '#333' : '#fff'}`,
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </footer>
  )
}
