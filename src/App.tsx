import { useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import UserManagement from './components/UserManagement'

type Page = 'login' | 'register' | 'dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => {
    setIsAuthenticated(true)
    setCurrentPage('dashboard')
  }

  const handleRegisterSuccess = () => {
    // After registering, go back to login page
    setIsAuthenticated(false)
    setCurrentPage('login')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentPage('login')
  }

  if (isAuthenticated && currentPage === 'dashboard') {
    return <UserManagement onLogout={handleLogout} />
  }

  return (
    <>
      {currentPage === 'login' ? (
        <Login 
          onSwitchToRegister={() => setCurrentPage('register')}
          onLoginSuccess={handleLogin}
        />
      ) : (
        <Register 
          onSwitchToLogin={() => setCurrentPage('login')}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}
    </>
  )
}

export default App
