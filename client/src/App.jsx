import React from 'react'
import AppRoutes from './router/AppRoutes.jsx'
import Navbar from './components/Navbar.jsx'
import LandingPage from './components/LandingPage.jsx'
import Footer from './components/Footer.jsx'
const App = () => {
  return (
    <>
      <Navbar />
      <AppRoutes />
      <Footer />
    </>
  )
}

export default App
