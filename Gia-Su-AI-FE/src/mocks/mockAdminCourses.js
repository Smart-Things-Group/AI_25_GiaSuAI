const simulateDelay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms))
const deepClone = (data) => JSON.parse(JSON.stringify(data))
const generateId = () => `course-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`

const now = Date.now()

let adminCourses = [
  {
    course_id: 'course-admin-001',
    title: 'Lập trình Python cơ bản',
    description: 'Học cú pháp, hàm, lớp và làm mini-project CRUD.',
    creator_id: 'instructor-001',
    creator_name: 'Nguyễn Văn A',
    creator_email: 'teacher.a@example.com',
    category: 'Programming',
    level: 'Beginner',
    status: 'active',
    enrollment_count: 156,
    avg_rating: 4.8,
    price: 299000,
    created_at: new Date(now - 90 * 24 * 3600 * 1000).toISOString(),
    last_updated: new Date(now - 12 * 24 * 3600 * 1000).toISOString(),
    content_stats: { total_modules: 6, total_lessons: 42, total_quizzes: 6 },
    enrollment_stats: { total_enrollments: 156, active_students: 140, completion_rate: 68.5 }
  },
  {
    course_id: 'course-admin-002',
    title: 'Machine Learning với TensorFlow',
    description: 'Học supervised learning, CNN, RNN kèm lab TensorFlow.',
    creator_id: 'instructor-002',
    creator_name: 'Trần Thị B',
    creator_email: 'teacher.b@example.com',
    category: 'AI/ML',
    level: 'Intermediate',
    status: 'draft',
    enrollment_count: 89,
    avg_rating: 4.9,
    price: 599000,
    created_at: new Date(now - 45 * 24 * 3600 * 1000).toISOString(),
    last_updated: new Date(now - 5 * 24 * 3600 * 1000).toISOString(),
    content_stats: { total_modules: 8, total_lessons: 55, total_quizzes: 8 },
    enrollment_stats: { total_enrollments: 89, active_students: 70, completion_rate: 41.2 }
  },
  {
    course_id: 'course-admin-003',
    title: 'Thiết kế Web với HTML/CSS',
    description: 'Xây dựng landing page, responsive và grid/flex.',
    creator_id: 'instructor-003',
    creator_name: 'Phạm Hữu C',
    creator_email: 'teacher.c@example.com',
    category: 'Design',
    level: 'Beginner',
    status: 'active',
    enrollment_count: 210,
    avg_rating: 4.7,
    price: 0,
    created_at: new Date(now - 120 * 24 * 3600 * 1000).toISOString(),
    last_updated: new Date(now - 15 * 24 * 3600 * 1000).toISOString(),
    content_stats: { total_modules: 5, total_lessons: 32, total_quizzes: 4 },
    enrollment_stats: { total_enrollments: 210, active_students: 180, completion_rate: 72.4 }
  },
  {
    course_id: 'course-admin-004',
    title: 'SQL và Phân tích dữ liệu',
    description: 'JOIN, window functions, CTE, tối ưu query và dashboard.',
    creator_id: 'instructor-002',
    creator_name: 'Trần Thị B',
    creator_email: 'teacher.b@example.com',
    category: 'Data',
    level: 'Intermediate',
    status: 'archived',
    enrollment_count: 132,
    avg_rating: 4.6,
    price: 0,
    created_at: new Date(now - 200 * 24 * 3600 * 1000).toISOString(),
    last_updated: new Date(now - 60 * 24 * 3600 * 1000).toISOString(),
    content_stats: { total_modules: 7, total_lessons: 48, total_quizzes: 7 },
    enrollment_stats: { total_enrollments: 132, active_students: 0, completion_rate: 58.9 }
  },
  {
    course_id: 'course-admin-005',
    title: 'Tiếng Nhật giao tiếp sơ cấp',
    description: 'Kana, ngữ pháp sơ cấp, luyện nghe nói tình huống.',
    creator_id: 'instructor-004',
    creator_name: 'Sato Haru',
    creator_email: 'teacher.ja@example.com',
    category: 'Language',
    level: 'Beginner',
    status: 'active',
    enrollment_count: 98,
    avg_rating: 4.5,
    price: 399000,
    created_at: new Date(now - 70 * 24 * 3600 * 1000).toISOString(),
    last_updated: new Date(now - 8 * 24 * 3600 * 1000).toISOString(),
    content_stats: { total_modules: 4, total_lessons: 28, total_quizzes: 4 },
    enrollment_stats: { total_enrollments: 98, active_students: 90, completion_rate: 63.1 }
  }
]

const toDetail = (course) => ({
  course_id: course.course_id,
  title: course.title,
  description: course.description,
  creator: {
    user_id: course.creator_id,
    full_name: course.creator_name,
    email: course.creator_email
  },
  category: course.category,
  level: course.level,
  status: course.status,
  enrollment_stats: course.enrollment_stats,
  content_stats: course.content_stats,
  created_at: course.created_at,
  last_updated: course.last_updated
})

const filterCourses = (params) => {
  const {
    status,
    creator_id,
    category,
    sort_by = 'created_at',
    order = 'desc',
    skip = 0,
    limit = 10
  } = params

  let result = adminCourses.filter((c) => {
    const matchStatus = status ? c.status === status : true
    const matchCreator = creator_id ? c.creator_id === creator_id : true
    const matchCategory = category ? c.category === category : true
    return matchStatus && matchCreator && matchCategory
  })

  result = result.sort((a, b) => {
    const dir = order === 'asc' ? 1 : -1
    switch (sort_by) {
      case 'enrollment_count':
        return (a.enrollment_count - b.enrollment_count) * dir
      case 'title':
        return a.title.localeCompare(b.title) * dir
      case 'created_at':
      default:
        return (new Date(a.created_at) - new Date(b.created_at)) * dir
    }
  })

  const start = Number(skip) || 0
  const end = start + (Number(limit) || 10)
  return { items: result.slice(start, end), total: result.length, skip: start, limit: Number(limit) || 10 }
}

export const mockAdminCourseAPI = {
  async listCourses(params = {}) {
    await simulateDelay()
    const { items, total, skip, limit } = filterCourses(params)
    return {
      data: deepClone(items),
      total,
      skip,
      limit
    }
  },

  async getCourseDetail(courseId) {
    await simulateDelay()
    const course = adminCourses.find((c) => c.course_id === courseId)
    if (!course) throw new Error('Course not found')
    return deepClone(toDetail(course))
  },

  async createCourse(payload) {
    await simulateDelay()
    const {
      title,
      description,
      creator_id,
      category,
      level,
      status = 'draft'
    } = payload || {}

    if (!title || !description || !creator_id || !category || !level) {
      throw new Error('Missing required fields')
    }

    const creatorName = payload.creator_name || 'Giảng viên mới'
    const creatorEmail = payload.creator_email || 'unknown@example.com'
    const nowIso = new Date().toISOString()
    const newCourse = {
      course_id: generateId(),
      title,
      description,
      creator_id,
      creator_name: creatorName,
      creator_email: creatorEmail,
      category,
      level,
      status,
      enrollment_count: 0,
      created_at: nowIso,
      last_updated: nowIso,
      content_stats: { total_modules: 0, total_lessons: 0, total_quizzes: 0 },
      enrollment_stats: { total_enrollments: 0, active_students: 0, completion_rate: 0 }
    }
    adminCourses = [newCourse, ...adminCourses]
    return {
      course_id: newCourse.course_id,
      title: newCourse.title,
      creator_name: newCourse.creator_name,
      status: newCourse.status,
      created_at: newCourse.created_at,
      message: 'Khóa học đã được tạo thành công'
    }
  },

  async updateCourse(courseId, payload = {}) {
    await simulateDelay()
    const idx = adminCourses.findIndex((c) => c.course_id === courseId)
    if (idx === -1) throw new Error('Course not found')
    const updated = {
      ...adminCourses[idx],
      ...payload,
      last_updated: new Date().toISOString()
    }
    adminCourses[idx] = updated
    return {
      course_id: updated.course_id,
      message: 'Khóa học đã được cập nhật',
      updated_at: updated.last_updated
    }
  },

  async deleteCourse(courseId) {
    await simulateDelay()
    const exists = adminCourses.some((c) => c.course_id === courseId)
    if (!exists) throw new Error('Course not found')
    adminCourses = adminCourses.filter((c) => c.course_id !== courseId)
    return { message: 'Khóa học đã được xóa vĩnh viễn' }
  }
}
