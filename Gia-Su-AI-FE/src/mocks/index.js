const mockFlag = import.meta.env.VITE_ENABLE_MOCK_API ?? import.meta.env.VITE_USE_MOCK_API
export const USE_MOCK_API =
  mockFlag === undefined || mockFlag === null || mockFlag === 'true'

export { mockAuthAPI } from './mockAuth'
export { mockDashboardAPI } from './mockDashboard'
export { mockCourseAPI, mockEnrollmentAPI } from './mockCourses'
export { mockAdminCourseAPI } from './mockAdminCourses'
export { mockAdminClassAPI } from './mockAdminClasses'
export { courseDetailsById } from './mockCourseDetails'
export { mockSearchAPI } from './mockSearch'
export { mockCourseModulesAPI, courseModulesOverview } from './mockCourseModules'
export { mockModuleAPI, moduleDetailsByCourse } from './mockModuleDetails'
export { mockLessonAPI, lessonDetailsByCourse } from './mockLessonDetails'
export { mockAssessmentAPI } from './mockAssessments'
export { mockChatAPI } from './mockChat'

export { mockProfileAPI } from './mockProfile'

