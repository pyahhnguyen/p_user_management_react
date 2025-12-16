import { useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'register'>('login')

  return (
    <>
      {currentPage === 'login' ? (
        <Login onSwitchToRegister={() => setCurrentPage('register')} />
      ) : (
        <Register onSwitchToLogin={() => setCurrentPage('login')} />
      )}
    </>
  )
}

export default App
