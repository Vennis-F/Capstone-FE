import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { NotFound } from 'components/Common'
import Layout from 'components/Layout'
import StaffLayout from 'components/Layout/StaffLayout'
import AchiviementPage from 'pages/AchiviementPage'
import AdminManageCategoryPage from 'pages/admin/AdminManageCategoryPage'
import AdminManageCustomerPage from 'pages/admin/AdminManageCustomerPage'
import AdminManageDashBoardPage from 'pages/admin/AdminManageDashboardPage'
import AdminManageInstructorPage from 'pages/admin/AdminManageInstructorPage'
import AdminManageLevelPage from 'pages/admin/AdminManageLevelPage'
import AdminManagePayMentorPage from 'pages/admin/AdminManagePayMentorPage'
import AdminManagePromotionPage from 'pages/admin/AdminManagePromotionPage'
import AdminManageRefundLearnerPage from 'pages/admin/AdminManageRefundLearnerPage'
import AdminManageStaffPage from 'pages/admin/AdminManageStaffPage'
import BlogDetailPage from 'pages/BlogDetailPage'
import BlogPage from 'pages/BlogListPage'
import CartCheckoutPage from 'pages/CartCheckoutPage'
import CartPage from 'pages/CartPage'
import ChapterLectureLearnPage from 'pages/ChapterLectureLearnPage'
import CheckPaymentPage from 'pages/CheckPaymentPage'
import ConfirmOTPPage from 'pages/ConfirmOTPPage'
import ContestDetailPage from 'pages/contest/ContestDetailPage'
import ContestHomePage from 'pages/contest/ContestHomePage'
import CustomerOrderDetailPage from 'pages/CustomerOrderDetailPage'
import CustomerOrderListPage from 'pages/CustomerOrderListPage'
import CustomerProfilePage from 'pages/CustomerProfilePage'
import CustomerRefundManagePage from 'pages/CustomerRefundManagePage'
import DetailCoursePage from 'pages/DetailCoursePage'
import GuestLoginPage from 'pages/GuestLoginPage'
import GuestSingupPage from 'pages/GuestSingupPage'
import InstructorBankRegisterPage from 'pages/instructor/InstructorBankRegisterPage'
import InstructorBasicsRegisterPage from 'pages/instructor/InstructorBasicsRegisterPage'
import InstructorCertificateRegisterPage from 'pages/instructor/InstructorCertificateRegisterPage'
import InstructorCourseEditPage from 'pages/instructor/InstructorCourseEditPage'
import InstructorCreateCoursePage from 'pages/instructor/InstructorCreateCoursePage'
import InstructorDashboardAnalyst from 'pages/instructor/InstructorDashboardAnalyst'
import InstructorHomepagePage from 'pages/instructor/InstructorHomepagePage'
import InstructorPromotionPage from 'pages/instructor/InstructorPromotionPage'
import InstructorSignupSuccessPage from 'pages/instructor/InstructorSignupSuccessPage'
import InstructorTransactionDetailPage from 'pages/instructor/InstructorTransactionDetailPage'
import ListCoursePage from 'pages/ListCoursePage'
import MyLearningPage from 'pages/MyLearningPage'
import StaffManageContestPage from 'pages/staff/StaffManageContestPage'
import StaffManageCoursePage from 'pages/staff/StaffManageCoursePage'
import StaffManagePostPage from 'pages/staff/StaffManagePostPage'
import StaffManageReportsPage from 'pages/staff/StaffManageReportsPage'
import TestPage from 'pages/TestPage'
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
          <Route path="/test" element={<TestPage />} />
          <Route path="/guest-login" element={<GuestLoginPage />} />
          <Route path="/guest-signup" element={<GuestSingupPage />} />
          <Route path="/instructor/signup" element={<InstructorBasicsRegisterPage />} />
          <Route path="/instructor/signup/bank" element={<InstructorBankRegisterPage />} />
          <Route
            path="/instructor/signup/certificate"
            element={<InstructorCertificateRegisterPage />}
          />
          <Route path="/instructor/signup/success" element={<InstructorSignupSuccessPage />} />

          <Route path="/confirm-otp" element={<ConfirmOTPPage />} />
          <Route path="/posts" element={<AboutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/detail/:id" element={<BlogDetailPage />} />
          <Route path="/list-course" element={<ListCoursePage />} />
          <Route path="/detail-course/:courseId" element={<DetailCoursePage />} />
          <Route path="/contest" element={<ContestHomePage />} />
          <Route path="/contest/detail/:id" element={<ContestDetailPage />} />
          <Route path="/user/:type" element={<CustomerProfilePage />} />

          <Route
            path="/"
            element={
              <PrivateRoute roles={[UserRole.CUSTOMER, UserRole.LEARNER, UserRole.INSTRUCTOR]} />
            }
          >
            <Route path="/course/:courseId/chapter-lecture" element={<ChapterLectureLearnPage />} />
          </Route>

          <Route path="/" element={<PrivateRoute roles={[UserRole.CUSTOMER]} />}>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/cart/checkout" element={<CartCheckoutPage />} />
            <Route path="/payment/check" element={<CheckPaymentPage />} />
          </Route>

          <Route
            path="/my-learning"
            element={<PrivateRoute roles={[UserRole.CUSTOMER, UserRole.LEARNER]} />}
          >
            <Route path="/my-learning" element={<MyLearningPage />} />
          </Route>
          <Route
            path="/user"
            element={<PrivateRoute roles={[UserRole.CUSTOMER, UserRole.LEARNER]} />}
          >
            <Route path="/user/refunds" element={<CustomerRefundManagePage />} />
            <Route path="/user/achivements" element={<AchiviementPage />} />
            <Route path="/user/order-list" element={<CustomerOrderListPage />} />
            <Route path="/user/order/oder-detail/:id" element={<CustomerOrderDetailPage />} />
          </Route>
        </Route>
        <Route path="/instructor" element={<PrivateRoute roles={[UserRole.INSTRUCTOR]} />}>
          <Route element={<StaffLayout />}>
            <Route path="/instructor/dashboard" element={<InstructorDashboardAnalyst />} />
            <Route path="/instructor/homepage" element={<InstructorHomepagePage />} />
            <Route path="/instructor/course/create" element={<InstructorCreateCoursePage />} />
            <Route path="/instructor/transaction" element={<InstructorTransactionDetailPage />} />
            <Route path="/instructor/promotion" element={<InstructorPromotionPage />} />
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
            <Route path="/admin/manage/dashboard" element={<AdminManageDashBoardPage />} />
            <Route path="/admin/manage/categories" element={<AdminManageCategoryPage />} />
            <Route path="/admin/manage/levels" element={<AdminManageLevelPage />} />
            <Route path="/admin/manage/pay-mentor" element={<AdminManagePayMentorPage />} />
            <Route path="/admin/manage/promotions" element={<AdminManagePromotionPage />} />
            <Route path="/admin/manage/staff" element={<AdminManageStaffPage />} />
            <Route path="/admin/manage/customer" element={<AdminManageCustomerPage />} />
            <Route path="/admin/manage/instructor" element={<AdminManageInstructorPage />} />
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
