import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import Layout from 'components/Layout'
import CartPage from 'pages/CartPage'
import CharacterDetailPage from 'pages/CharacterDetailPage'
import CharactersPage from 'pages/CharactersPage'
import CustomerOrderListPage from 'pages/CustomerOrderListPage'
import DetailCoursePage from 'pages/DetailCoursePage'
import GuestLoginPage from 'pages/GuestLoginPage'
import ListCoursePage from 'pages/ListCoursePage'

// const HomePage = React.lazy(() => import('pages/HomePage'))
const AboutPage = React.lazy(() => import('pages/AboutPage'))

const AppRoutes = () => (
  <>
    <Suspense fallback={<div>Loading</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<AboutPage />} />
          <Route path="/guest-login" element={<GuestLoginPage />} />
          <Route path="/posts" element={<AboutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/character-detail" element={<CharacterDetailPage />} />
          <Route path="/list-course" element={<ListCoursePage />} />
          <Route path="/detail-course" element={<DetailCoursePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order-list" element={<CustomerOrderListPage />} />
        </Route>
      </Routes>
    </Suspense>
  </>
)

export default AppRoutes
