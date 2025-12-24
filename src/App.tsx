import Login from './components/Login'
import Register from './components/Register'
import UserManagement from './components/UserManagement'
import { useAuthStore } from './stores/authStore'

function App() {
  const { currentPage, isAuthenticated, setCurrentPage, login, registerSuccess } = useAuthStore()

  if (isAuthenticated && currentPage === 'dashboard') {
    return <UserManagement />
  }

  return (
    <>
      {currentPage === 'login' ? (
        <Login 
          onSwitchToRegister={() => setCurrentPage('register')}
          onLoginSuccess={login}
        />
      ) : (
        <Register 
          onSwitchToLogin={() => setCurrentPage('login')}
          onRegisterSuccess={registerSuccess}
        />
      )}
    </>
  )
}

export default App
