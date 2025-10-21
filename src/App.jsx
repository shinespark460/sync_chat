
import { Routes ,  Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import bgImage from "../src/assets/images/bg_image.jpg"
function App() {


  return (
    <>
      <div className='w-full h-screen relative' style={{
        backgroundImage:`url(${bgImage})`,
        backgroundPosition:"center",
        backgroundSize:"cover"
      }} >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
