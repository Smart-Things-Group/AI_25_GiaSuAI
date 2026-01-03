import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from '@components/layout/DashboardLayout'
import ProtectedRoute, { AdminRoute, InstructorRoute } from '@components/layout/ProtectedRoute'
import { useAuthStore } from '@stores/authStore'

// Auth pages
import LoginPage from '@pages/auth/LoginPage'
import RegisterPage from '@pages/auth/RegisterPage'
import ForgotPasswordPage from '@pages/auth/ForgotPasswordPage'
import ResetPasswordPage from '@pages/auth/ResetPasswordPage'
import VerifyEmailPage from '@pages/auth/VerifyEmailPage'

// Main pages
import LandingPage from '@pages/LandingPage'
import HomePage from '@pages/HomePage'
import ExplorePage from '@pages/ExplorePage'
import ProfilePage from '@pages/ProfilePage'
import ProgressPage from '@pages/ProgressPage'

// Course pages
import CourseDetailPage from '@pages/CourseDetailPage'
import ModuleDetailPage from '@pages/ModuleDetailPage'
import ChapterPage from '@pages/courses/ChapterPage'
import StudentLesson from '@pages/StudentLesson'

// Enrollment pages
import MyCoursesPage from '@pages/enrollment/MyCoursesPage'
import StudentCoursesPage from '@pages/enrollment/StudentCoursesPage'
import StudentEnrollmentPage from '@pages/enrollment/StudentEnrollmentPage'
import InstructorDashboardPage from '@pages/enrollment/InstructorDashboardPage'
import StudentProfile from '@pages/enrollment/StudentProfile'

// Quiz pages
import QuizPage from '@pages/quiz/QuizPage'
import QuizDetailPage from '@pages/quiz/QuizDetailPage'

// Chat pages
import ChatPage from '@pages/chat/ChatPage'

// Admin pages
import AdminPage from '@pages/admin/AdminPage'
import AdminUsersPage from '@pages/admin/AdminUsersPage'
import AdminCoursesPage from '@pages/admin/AdminCoursesPage'
import AdminClassesPage from '@pages/admin/AdminClassesPage'
import AdminSettingsPage from '@pages/admin/AdminSettingsPage'

// Other pages
import NotFoundPage from '@pages/NotFoundPage'
import UnauthorizedPage from '@pages/UnauthorizedPage'

/**
 * Component AppRouter - Quan ly routing cho toan bo ung dung
 */
const AppRouter = () => {
  const { user } = useAuthStore()

  const renderDashboardHome = () => {
    if (user?.role === 'admin') {
      return <Navigate to="/dashboard/admin/users" replace />
    }
    if (user?.role === 'instructor') {
      return <InstructorDashboardPage />
    }
    return <HomePage />
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Auth routes */}
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
      <Route path="/auth/verify-email" element={<VerifyEmailPage />} />

      {/* Protected routes with dashboard layout */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Trang chu */}
        <Route index element={renderDashboardHome()} />
        
        {/* Profile */}
        <Route path="profile" element={<ProfilePage />} />
        <Route path="student-profile" element={<StudentProfile />} />
        <Route path="progress" element={<ProgressPage />} />
        
        {/* Courses */}
        <Route path="courses" element={<InstructorRoute><MyCoursesPage /></InstructorRoute>} />
        <Route path="courses/:courseId" element={<CourseDetailPage />} />
        <Route path="courses/:courseId/modules/:moduleId" element={<ModuleDetailPage />} />
        <Route path="courses/:courseId/lessons/:lessonId" element={<StudentLesson />} />
        <Route path="courses/:courseId/chapters/:chapterId" element={<ChapterPage />} />
        <Route path="explore" element={<ExplorePage />} />
        
        {/* My Courses */}
        <Route path="student-courses" element={<StudentCoursesPage />} />
        <Route path="my-courses" element={<InstructorRoute><MyCoursesPage /></InstructorRoute>} />
        <Route path="enrollment/:enrollmentId" element={<StudentEnrollmentPage />} />
        
        {/* Quiz */}
        <Route path="quiz" element={<QuizPage />} />
        <Route path="quiz/:quizId" element={<QuizDetailPage />} />
        
        {/* Chat */}
        <Route path="chat" element={<ChatPage />} />
        
        {/* Instructor routes */}
        <Route path="instructor" element={
          <InstructorRoute>
            <InstructorDashboardPage />
          </InstructorRoute>
        } />
        
        {/* Admin routes */}
        <Route path="admin/*" element={
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
        }>
          <Route index element={<Navigate to="users" replace />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="courses" element={<AdminCoursesPage />} />
          <Route path="classes" element={<AdminClassesPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Route>

      {/* Direct protected routes (without dashboard layout) */}
      <Route 
        path="/courses" 
        element={
          <InstructorRoute>
            <MyCoursesPage />
          </InstructorRoute>
        }
      />
      
      <Route 
        path="/student-courses" 
        element={
          <ProtectedRoute>
            <StudentCoursesPage />
          </ProtectedRoute>
        }
      />

      <Route 
        path="/my-courses" 
        element={
          <InstructorRoute>
            <MyCoursesPage />
          </InstructorRoute>
        }
      />

      {/* Error pages */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      
      {/* Catch all - redirect to 404 */}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}

export default AppRouter


