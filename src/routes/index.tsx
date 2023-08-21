import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import Layout from 'components/Layout'
import CharacterDetailPage from 'pages/CharacterDetailPage'
import CharactersPage from 'pages/CharactersPage'

// const HomePage = React.lazy(() => import('pages/HomePage'))
const AboutPage = React.lazy(() => import('pages/AboutPage'))

const AppRoutes = () => (
  <>
    <Suspense fallback={<div>Loading</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<AboutPage />} />
          <Route path="/posts" element={<AboutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/character-detail" element={<CharacterDetailPage />} />
        </Route>
      </Routes>
    </Suspense>
  </>
)

export default AppRoutes
