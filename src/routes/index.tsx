import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { NotFound } from 'components/Common'
import Layout from 'components/Layout'
import StaffLayout from 'components/Layout/StaffLayout'
import AdminManageCategoryPage from 'pages/admin/AdminManageCategoryPage'
import AdminManageLevelPage from 'pages/admin/AdminManageLevelPage'
import AdminManagePayMentorPage from 'pages/admin/AdminManagePayMentorPage'
import AdminManagePromotionPage from 'pages/admin/AdminManagePromotionPage'
import AdminManageRefundLearnerPage from 'pages/admin/AdminManageRefundLearnerPage'
import AdminManageUserPage from 'pages/admin/AdminManageUserPage'
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
import InstructorCourseEditPage from 'pages/instructor/InstructorCourseEditPage'
import InstructorCreateCoursePage from 'pages/instructor/InstructorCreateCoursePage'
import InstructorHomepagePage from 'pages/instructor/InstructorHomepagePage'
import ListCoursePage from 'pages/ListCoursePage'
import MyLearningPage from 'pages/MyLearningPage'
import StaffManageContestPage from 'pages/staff/StaffManageContestPage'
import StaffManageCoursePage from 'pages/staff/StaffManageCoursePage'
import StaffManagePostPage from 'pages/staff/StaffManagePostPage'
import StaffManageReportsPage from 'pages/staff/StaffManageReportsPage'
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
          {/* <Route path="/course/chapter-lecture/id" element={<ChapterLectureLearnPage />} /> */}
          <Route path="/course/:courseId/chapter-lecture" element={<ChapterLectureLearnPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/cart/checkout" element={<CartCheckoutPage />} />
          <Route path="/payment/check" element={<CheckPaymentPage />} />
          <Route path="/user/order-list" element={<CustomerOrderListPage />} />
          <Route path="/user/:type" element={<CustomerProfilePage />} />
          <Route
            path="/my-learning"
            element={<PrivateRoute roles={[UserRole.CUSTOMER, UserRole.LEARNER]} />}
          >
            <Route path="/my-learning" element={<MyLearningPage />} />
          </Route>
        </Route>
        <Route path="/instructor" element={<PrivateRoute roles={[UserRole.INSTRUCTOR]} />}>
          <Route element={<StaffLayout />}>
            <Route path="/instructor/homepage" element={<InstructorHomepagePage />} />
            <Route path="/instructor/course/create" element={<InstructorCreateCoursePage />} />
            {/* <Route
                path="/course/edit/:courseId/manage/:type"
                element={<InstructorCourseEditPage />}
              /> */}
          </Route>
        </Route>
        <Route path="/staff" element={<PrivateRoute roles={[UserRole.STAFF]} />}>
          <Route element={<StaffLayout />}>
            <Route path="/staff/manage/posts" element={<StaffManagePostPage />} />
            <Route path="/staff/manage/reports" element={<StaffManageReportsPage />} />
            <Route path="/staff/manage/courses" element={<StaffManageCoursePage />} />
            <Route path="/staff/manage/contest" element={<StaffManageContestPage />} />
          </Route>
        </Route>
        <Route path="/admin" element={<PrivateRoute roles={[UserRole.ADMIN]} />}>
          <Route element={<StaffLayout />}>
            <Route path="/admin/manage/categories" element={<AdminManageCategoryPage />} />
            <Route path="/admin/manage/levels" element={<AdminManageLevelPage />} />
            <Route path="/admin/manage/pay-mentor" element={<AdminManagePayMentorPage />} />
            <Route path="/admin/manage/promotions" element={<AdminManagePromotionPage />} />
            <Route path="/admin/manage/user" element={<AdminManageUserPage />} />
            <Route path="/admin/manage/refund-learner" element={<AdminManageRefundLearnerPage />} />
          </Route>
        </Route>
        <Route path="/" element={<PrivateRoute roles={[UserRole.INSTRUCTOR, UserRole.STAFF]} />}>
          <Route element={<StaffLayout />}>
            <Route
              path="/course/edit/:courseId/manage/:type"
              element={<InstructorCourseEditPage />}
            />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </>
)

export default AppRoutes
