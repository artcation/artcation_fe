import './App.css'
import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router'
import { LoginContext } from './context/LoginContext'
import MainPage from './pages/MainPage'
import LoginLayout from './layouts/LoginLayout'
import DefaultLayout from './layouts/DefaultLayout'
import ExamplePage from './pages/ExamplePage'
import LoginPage from './pages/Login/LoginPage'
import RegisterPage from './pages/Login/RegisterPage'
import ExplorePage from './pages/Artist/ExplorePage'
import PostingPage from './pages/Artist/PostingPage'
import TermsPage from './pages/Login/TermsPage'
import axiosInstance from '../api/axiosInstance'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  async function handleIsLoggedIn() {
    try {
      const response = await axiosInstance.get('/users/me');
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
      navigate('/login');
    }
  }
  
  useEffect(() => {
    handleIsLoggedIn();
  }, [])

  return (
    <LoginContext value={{isLoggedIn, setIsLoggedIn}}>
      <title>Artcation</title>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route element={<LoginLayout />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup/terms' element={<TermsPage />} />
          <Route path='/signup/create' element={<RegisterPage />} />
        </Route>
        <Route element={<DefaultLayout />}>
          <Route path='/example' element={<ExamplePage />} />
          <Route path='/artist' />
          <Route path='/artist/explore' element={<ExplorePage />} />
          <Route path='/artist/posting' element={<PostingPage />} />
          <Route path='/host' />
        </Route>
      </Routes>
    </LoginContext>
  )
}

export default App
