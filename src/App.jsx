import './App.css'
import { Route, Routes } from 'react-router'
import MainPage from './pages/MainPage'
import DefaultLayout from './layouts/DefaultLayout'
import ExamplePage from './pages/ExamplePage'
import ExplorePage from './pages/Artist/ExplorePage'

function App() {
  return (
    <>
      <title>Artcation</title>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route element={<DefaultLayout />}>
          <Route path='/example' element={<ExamplePage />} />
          <Route path='/artist' />
          <Route path='/artist/explore' element={<ExplorePage />} />
          <Route path='/host' />
        </Route>
      </Routes>
    </>
  )
}

export default App
