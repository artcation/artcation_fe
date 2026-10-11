import './App.css'
import { useState } from 'react'
import { Route, Routes } from 'react-router'
import { LoginContext } from './context/LoginContext'
import MainPage from './pages/MainPage'
import LoginLayout from './layouts/LoginLayout'
import LoginPage from './pages/Login/LoginPage'
import TermsPage from './pages/Login/TermsPage'
import RegisterPage from './pages/Login/RegisterPage'
import FindPage from './pages/Login/FindPage'
import ResetPage from './pages/Login/ResetPage'
import DefaultLayout from './layouts/DefaultLayout'
import ExplorePage from './pages/Artist/ExplorePage'
import PostingPage from './pages/Artist/PostingPage'
import ApplyPage from './pages/Artist/ApplyPage'
import ApplicationsPage from './pages/Artist/ApplicationsPage'
import ApplicationPage from './pages/Artist/ApplicationPage'
import MyPostingsPage from './pages/Host/MyPostingsPage'
import PostingCreatePage from './pages/Host/PostingCreatePage'
import PostingDetailPage from './pages/Host/PostingDetailPage'
import ApplicationReviewPage from './pages/Host/ApplicationReviewPage'
import {
  HOST_POSTINGS,
  HOST_POSTING_CREATE,
  HOST_POSTING_DETAIL,
  HOST_APPLICATION_REVIEW,
} from './routes'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoginContext value={{isLoggedIn, setIsLoggedIn}}>
      <title>Artcation</title>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route element={<LoginLayout />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup/terms' element={<TermsPage />} />
          <Route path='/signup/create' element={<RegisterPage />} />
          <Route path='/find/:type' element={<FindPage />} />
          <Route path='/reset-password' element={<ResetPage />} />
        </Route>
        <Route element={<DefaultLayout />}>
          <Route path='/explore' element={<ExplorePage />} />
          <Route path='/posting/:recruitmentId' element={<PostingPage />} />
          <Route path='/apply/:recruitmentId' element={<ApplyPage />} />
          <Route path='/applications' element={<ApplicationsPage />} />
          <Route path='/application/:recruitmentId/:applicationId' element={<ApplicationPage />} />
          <Route path={HOST_POSTINGS} element={<MyPostingsPage />} />
          <Route path={HOST_POSTING_CREATE} element={<PostingCreatePage />} />
          <Route path={HOST_POSTING_DETAIL} element={<PostingDetailPage />} />
          <Route path={HOST_APPLICATION_REVIEW} element={<ApplicationReviewPage />} />
        </Route>
      </Routes>
    </LoginContext>
  )
}

export default App
