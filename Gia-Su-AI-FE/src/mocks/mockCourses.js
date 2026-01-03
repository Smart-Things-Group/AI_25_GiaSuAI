import { courseDetailsById } from './mockCourseDetails'
import japanGTThumb from '@/img/JapanGT.png'
import math6Thumb from '@/img/Math6.png'

const simulateDelay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms))
const deepClone = (data) => JSON.parse(JSON.stringify(data))

const paginate = (arr, start = 0, end = 10) => arr.slice(start, end)

let courses = [
  {
    id: 'course-006',
    title: 'Ti\u1ebfng Nh\u1eadt Giao Ti\u1ebfp',
    description: 'Luy\u1ec7n nghe n\u00f3i giao ti\u1ebfp c\u01a1 b\u1ea3n.',
    category: 'Language Learning',
    level: 'Beginner',
    thumbnail_url: japanGTThumb,
    total_modules: 1,
    total_lessons: 2,
    total_duration_minutes: 35,
    enrollment_count: 0,
    avg_rating: 4.7,
    instructor_name: 'Yamada Kenji',
    instructor_avatar: null,
    is_enrolled: false,
    created_at: '2025-02-20T08:00:00.000Z',
    tags: ['japanese', 'communication', 'beginner']
  },
  {
    id: 'course-007',
    title: 'Toán 6 - Số tự nhiên',
    description: 'Tập hợp số tự nhiên, phép tính cơ bản, ước bội, UCLN và BCNN.',
    category: 'Math',
    level: 'Beginner',
    thumbnail_url: math6Thumb,
    total_modules: 1,
    total_lessons: 4,
    total_duration_minutes: 110,
    enrollment_count: 0,
    avg_rating: 4.8,
    instructor_name: 'Cô Mai Anh',
    instructor_avatar: null,
    is_enrolled: false,
    created_at: '2025-03-01T09:00:00.000Z'
  },
  {
  id: 'course-001',
  title: 'Lập trình Python ứng dụng',
  description: 'Python cơ bản đến trung cấp.',
  category: 'Programming',
  level: 'Beginner',
  thumbnail_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=60',
  total_modules: 4,
  total_lessons: 20,
  total_duration_minutes: 320,
  enrollment_count: 100,
  avg_rating: 4.6,
  instructor_name: 'Nguyễn Văn A',
  instructor_avatar: null,
  is_enrolled: true,
  created_at: '2025-02-08T09:00:00.000Z'
},

 {
  id: 'course-011',
  title: 'Vật lý lớp 11',
  description:
    'Khóa học Vật lý THPT (lớp 11) tập trung củng cố lý thuyết và tư duy: dao động, sóng, điện, bài tập ứng dụng.',
  category: 'Khoa học Tự nhiên',
  level: 'Beginner',
  thumbnail_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=60',
  total_modules: 4,
  total_lessons: 12,
  total_duration_minutes: 2400,
  enrollment_count: 25,
  avg_rating: 4.6,
  instructor_name: 'Cô Mai Anh',
  instructor_avatar: null,
  is_enrolled: true,
  created_at: '2025-03-10T09:00:00.000Z',
  tags: ['vatly11', 'khtn', 'onthi', 'thpt']
}
]

const buildSummary = () => {
  const totalCourses = courses.length
  const enrolled = courses.filter((c) => c.is_enrolled).length
  const avgRating = courses.reduce((sum, c) => sum + (c.avg_rating || 0), 0) / (courses.length || 1)
  return { total: totalCourses, enrolled, avg_rating: Number(avgRating.toFixed(2)) }
}

let enrollments = courses.filter((c) => c.is_enrolled).map((course) => ({
  id: `enroll-${course.id}`,
  course_id: course.id,
  course_title: course.title,
  course_description: course.description,
  course_thumbnail: course.thumbnail_url,
  course_level: course.level,
  instructor_name: course.instructor_name,
  status: 'active',
  progress_percent: 0,
  enrolled_at: course.created_at,
  completed_at: null,
  last_accessed_at: course.created_at,
  avg_quiz_score: null,
  total_time_spent_minutes: 0,
  next_lesson: { lesson_id: null, lesson_title: null, module_title: null }
}))

const filterCourses = (params) => {
  const { search = '', category, level, tags = [], sort_by = 'created_at', order = 'desc' } = params
  const query = search.toLowerCase().trim()
  let result = courses.filter((course) => {
    const matchSearch =
      !query ||
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query)
    const matchCategory = category ? course.category === category : true
    const matchLevel = level ? course.level === level : true
    const matchTags = !tags?.length || tags.every((tag) => (course.tags || []).includes(tag))
    return matchSearch && matchCategory && matchLevel && matchTags
  })

  result = result.sort((a, b) => {
    const dir = order === 'asc' ? 1 : -1
    switch (sort_by) {
      case 'name':
        return a.title.localeCompare(b.title) * dir
      case 'enrollment':
        return (a.enrollment_count - b.enrollment_count) * dir
      case 'rating':
        return (a.avg_rating - b.avg_rating) * dir
      case 'created_at':
      default:
        return (new Date(a.created_at) - new Date(b.created_at)) * dir
    }
  })

  return result
}

const getEnrollmentStatusByCourse = (courseId) => {
  const enrollment = enrollments.find((enroll) => enroll.course_id === courseId)
  return enrollment
    ? {
        enrolled: true,
        status: enrollment.status,
        enrollment_id: enrollment.id,
        can_access_content: enrollment.status !== 'cancelled',
        enrollment_date: enrollment.enrolled_at,
        progress_percent: enrollment.progress_percent
      }
    : {
        enrolled: false,
        status: null,
        enrollment_id: null,
        can_access_content: false,
        enrollment_date: null,
        progress_percent: null
      }
}

const createEnrollment = (courseId) => {
  const course = courses.find((item) => item.id === courseId)
  if (!course) throw new Error('Course not found')
  const existing = enrollments.find((item) => item.course_id === courseId && item.status !== 'cancelled')
  if (existing) {
    courses = courses.map((c) => (c.id === courseId ? { ...c, is_enrolled: true } : c))
    return existing
  }
  const newEnrollment = {
    id: `enroll-${Date.now()}`,
    course_id: course.id,
    course_title: course.title,
    course_description: course.description,
    course_thumbnail: course.thumbnail_url,
    course_level: course.level,
    instructor_name: course.instructor_name,
    status: 'active',
    progress_percent: 0,
    enrolled_at: new Date().toISOString(),
    completed_at: null,
    last_accessed_at: new Date().toISOString(),
    avg_quiz_score: null,
    total_time_spent_minutes: 0,
    next_lesson: { lesson_id: null, lesson_title: null, module_title: null }
  }
  enrollments = [newEnrollment, ...enrollments]
  courses = courses.map((c) => (c.id === courseId ? { ...c, is_enrolled: true } : c))
  return newEnrollment
}

export const mockCourseAPI = {
  async searchCourses(params = {}) {
    // reuse listCourses logic with search/filter params
    return this.listCourses(params)
  },

  async listCourses(params = {}) {
    await simulateDelay()
    const { skip = 0, limit = 10 } = params
    const filtered = filterCourses(params)
    return {
      courses: paginate(filtered, Number(skip), Number(skip) + Number(limit)),
      total: filtered.length,
      skip: Number(skip),
      limit: Number(limit),
      summary: buildSummary()
    }
  },

  async getCourseDetail(courseId) {
    return this.getCourse(courseId)
  },

  async getCourse(courseId) {
    await simulateDelay()
    const detail = courseDetailsById[courseId]
    if (detail) return deepClone(detail)
    const fallback = courses.find((c) => c.id === courseId)
    if (!fallback) throw new Error('Course not found')
    return deepClone(fallback)
  }
}

export const mockEnrollmentAPI = {
  async enrollCourse(courseId) {
    await simulateDelay()
    const enrollment = createEnrollment(courseId)
    return {
      id: enrollment.id,
      user_id: 'user-001',
      course_id: enrollment.course_id,
      course_title: enrollment.course_title,
      status: 'active',
      enrolled_at: enrollment.enrolled_at,
      progress_percent: 0,
      message: 'Dang ky khoa hoc thanh cong. Chuc ban hoc tap hieu qua!'
    }
  },

  async getMyCourses(params = {}) {
    await simulateDelay()
    const { status, skip = 0, limit = 10 } = params
    const filtered = enrollments.filter((enroll) => (status ? enroll.status === status : true))
    return {
      enrollments: paginate(filtered, Number(skip), Number(skip) + Number(limit)),
      summary: buildSummary(),
      skip: Number(skip),
      limit: Number(limit)
    }
  },

  async getEnrollmentDetail(enrollmentId) {
    await simulateDelay()
    const enrollment = enrollments.find((item) => item.id === enrollmentId)
    if (!enrollment) throw new Error('Enrollment not found')
    const course = courses.find((item) => item.id === enrollment.course_id)
    return {
      ...enrollment,
      course_title: course?.title || enrollment.course_title,
      total_modules: course?.total_modules || 0,
      completed_modules: Math.round((enrollment.progress_percent / 100) * (course?.total_modules || 0)),
      total_lessons: course?.total_lessons || 0,
      completed_lessons: Math.round((enrollment.progress_percent / 100) * (course?.total_lessons || 0))
    }
  },

  async getEnrollmentStatus(courseId) {
    await simulateDelay()
    return getEnrollmentStatusByCourse(courseId)
  },

  async cancelEnrollment(enrollmentId) {
    await simulateDelay()
    enrollments = enrollments.map((item) => (item.id === enrollmentId ? { ...item, status: 'cancelled' } : item))
    return {
      message: 'Huy dang ky khoa hoc thanh cong',
      note: 'Du lieu hoc tap cua ban da duoc luu lai'
    }
  }
}
