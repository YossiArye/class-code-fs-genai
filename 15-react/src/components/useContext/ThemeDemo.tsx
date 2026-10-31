import { ThemeProvider } from './ThemeContext'
import Header from './Header'
import MainContent from './MainContent'
import Footer from './Footer'

// Every component inside <ThemeProvider> can call useTheme() directly,
// without passing theme / toggleTheme down as props.
export default function ThemeDemo() {
  return (
    <ThemeProvider>
      <Header />
      <MainContent />
      <Footer />
    </ThemeProvider>
  )
}
