import './App.css'
import { Route, Routes } from 'react-router'
import MainPage from './pages/MainPage'
import LoginLayout from './layouts/LoginLayout'
import DefaultLayout from './layouts/DefaultLayout'
import ExamplePage from './pages/ExamplePage'
import LoginPage from './pages/Login/LoginPage'
import RegisterPage from './pages/Login/RegisterPage'
import ExplorePage from './pages/Artist/ExplorePage'
import PostingPage from './pages/Artist/PostingPage'
import TermsPage from './pages/Login/TermsPage'
import ResultPage from './pages/Artist/ResultPage'

function App() {
  return (
    <>
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
          <Route path='/artist/result' element={<ResultPage />} />
          <Route path='/host' />
        </Route>
      </Routes>
    </>
  )
}

export default App
