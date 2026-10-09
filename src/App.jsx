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
import ApplicationPage from './pages/Artist/ApplicationPage'
import MyApplicationPage from './pages/Artist/MyApplicationPage'
import MyApplicationsPage from './pages/Artist/MyApplicationsPage'
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
          <Route path='/artist/application' element={<ApplicationPage />} />
          <Route path='/artist/myapplications' element={<MyApplicationsPage />} />
          <Route path='/artist/posting/:performanceId' element={<PostingPage />} />
          <Route path='/artist/application/:performanceId' element={<ApplicationPage />} />
          <Route path='/artist/myapplication/:applicationId' element={<MyApplicationPage />} />
          <Route path='/host' />
          <Route path={HOST_POSTINGS} element={<MyPostingsPage />} />
          <Route path={HOST_POSTING_CREATE} element={<PostingCreatePage />} />
          <Route path={HOST_POSTING_DETAIL} element={<PostingDetailPage />} />
          <Route path={HOST_APPLICATION_REVIEW} element={<ApplicationReviewPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
