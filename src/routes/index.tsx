import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { NotFound } from 'components/Common'
import Layout from 'components/Layout'
import CartCheckoutPage from 'pages/CartCheckoutPage'
import CartPage from 'pages/CartPage'
import ChapterLectureLearnPage from 'pages/ChapterLectureLearnPage'
import CharacterDetailPage from 'pages/CharacterDetailPage'
import CharactersPage from 'pages/CharactersPage'
import CheckPaymentPage from 'pages/CheckPaymentPage'
import ConfirmOTPPage from 'pages/ConfirmOTPPage'
import CustomerOrderListPage from 'pages/CustomerOrderListPage'
import CustomerProfilePage from 'pages/CustomerProfilePage'
import DetailCoursePage from 'pages/DetailCoursePage'
import GuestLoginPage from 'pages/GuestLoginPage'
import GuestSingupPage from 'pages/GuestSingupPage'
import ListCoursePage from 'pages/ListCoursePage'
import MyLearningPage from 'pages/MyLearningPage'
import { UserRole } from 'types'

import { PrivateRoute } from '../components/Common/PrivateRoute'

const HomePage = React.lazy(() => import('pages/HomePage'))
const AboutPage = React.lazy(() => import('pages/AboutPage'))

const AppRoutes = () => (
  <>
    <Suspense fallback={<div>Loading</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/guest-login" element={<GuestLoginPage />} />
          <Route path="/guest-signup" element={<GuestSingupPage />} />
          <Route path="/confirm-otp" element={<ConfirmOTPPage />} />
          <Route path="/posts" element={<AboutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/character-detail" element={<CharacterDetailPage />} />
          <Route path="/list-course" element={<ListCoursePage />} />
          <Route path="/detail-course/:courseId" element={<DetailCoursePage />} />
          <Route path="/course/chapter-lecture/id" element={<ChapterLectureLearnPage />} />
          <Route path="/course/:courseId/chapter-lecture" element={<ChapterLectureLearnPage />} />
          <Route path="/user/profile" element={<CustomerProfilePage />} />

          <Route path="/cart" element={<CartPage />} />
          <Route path="/cart/checkout" element={<CartCheckoutPage />} />
          <Route path="/payment/check" element={<CheckPaymentPage />} />
          <Route path="/order-list" element={<CustomerOrderListPage />} />
          <Route
            path="/my-learning"
            element={<PrivateRoute roles={[UserRole.CUSTOMER, UserRole.LEARNER]} />}
          >
            <Route path="/my-learning" element={<MyLearningPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  </>
)

export default AppRoutes
