const simulateDelay = (ms = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms))

const randomId = () =>
  `mock_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`

const inProgressCourses = [
  {
    course_id: 'course-analytics-101',
    title: 'Phân tích dữ liệu với Python',
    progress: 72,
    last_accessed: '2025-02-10T08:30:00.000Z'
  },
  {
    course_id: 'course-ai-mentor',
    title: 'Thiết kế trợ lý AI thông minh',
    progress: 48,
    last_accessed: '2025-02-08T13:05:00.000Z'
  },
  {
    course_id: 'course-leadership',
    title: 'Kỹ năng lãnh đạo cho Product Manager',
    progress: 31,
    last_accessed: '2025-02-07T10:12:00.000Z'
  }
]

const pendingQuizzes = [
  {
    quiz_id: 'quiz-ml-01',
    title: 'Quiz: Ôn tập học máy',
    course_title: 'Phân tích dữ liệu với Python',
    due_at: '2025-02-14T17:00:00.000Z'
  },
  {
    quiz_id: 'quiz-ai-02',
    title: 'Quiz: Chiến lược triển khai AI',
    course_title: 'Thiết kế trợ lý AI thông minh',
    due_at: null
  }
]

const learningStats = {
  lessons_completed: 124,
  quizzes_passed: 18,
  quizzes_failed: 2,
  avg_quiz_score: 87,
  completed_courses: 5,
  in_progress_courses: inProgressCourses.length,
  cancelled_courses: 1,
  by_course: [
    {
      course_id: 'course-analytics-101',
      course_title: 'Phân tích dữ liệu với Python',
      lessons_completed: 18,
      quiz_score: 92,
      status: 'in_progress'
    },
    {
      course_id: 'course-ai-mentor',
      course_title: 'Thiết kế trợ lý AI thông minh',
      lessons_completed: 11,
      quiz_score: 84,
      status: 'in_progress'
    },
    {
      course_id: 'course-async',
      course_title: 'Tư duy bất đồng bộ nâng cao',
      lessons_completed: 20,
      quiz_score: 89,
      status: 'completed'
    }
  ]
}

const recommendationList = [
  {
    course_id: 'course-ai-communication',
    title: 'Giao tiếp với AI trong doanh nghiệp',
    reason: 'Bạn đã hoàn thành 80% khóa “Thiết kế trợ lý AI thông minh”',
    relevance_score: 94
  },
  {
    course_id: 'course-analytics-advanced',
    title: 'Phân tích dữ liệu nâng cao',
    reason: 'Điểm quiz trung bình của bạn trên 85%',
    relevance_score: 90
  },
  {
    course_id: 'course-product-leadership',
    title: 'Lãnh đạo sản phẩm với AI',
    reason: 'Bạn quan tâm đến các chủ đề lãnh đạo & AI',
    relevance_score: 87
  }
]

const generateChartData = (days) => {
  const result = []
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)

    const lessons = Math.max(0, Math.round(Math.random() * 3.5 - 0.3))
    const hours = Number(
      (lessons === 0 ? 0 : lessons * (0.4 + Math.random() * 0.6)).toFixed(1)
    )

    const quizzes = lessons ? Math.round(Math.max(0, lessons * (Math.random() * 0.4))) : 0

    result.push({
      date: date.toISOString().slice(0, 10),
      lessons_completed: lessons,
      hours_spent: hours,
      quizzes_completed: quizzes
    })
  }

  return result
}

const buildProgressPayload = (days, courseId) => {
  const chart = generateChartData(days)
  const totalLessons = chart.reduce((sum, item) => sum + item.lessons_completed, 0)
  const totalHours = chart.reduce((sum, item) => sum + item.hours_spent, 0)

  const summary = {
    total_lessons: totalLessons,
    total_hours: Number(totalHours.toFixed(1)),
    avg_per_day: Number((totalLessons / chart.length || 0).toFixed(1)),
    best_day: chart.reduce(
      (best, item) =>
        item.lessons_completed + item.hours_spent >
        best.lessons_completed + best.hours_spent
          ? item
          : best,
      { lessons_completed: 0, hours_spent: 0, date: null }
    )
  }

  if (courseId) {
    const course = learningStats.by_course.find((item) => item.course_id === courseId)
    if (course) {
      summary.total_lessons = course.lessons_completed
      summary.avg_per_day = Number((course.lessons_completed / days).toFixed(1))
    }
  }

  return {
    chart_data: chart,
    summary
  }
}

export const mockDashboardAPI = {
  async getStudentDashboard() {
    await simulateDelay()
    return {
      in_progress_courses: inProgressCourses,
      pending_quizzes: pendingQuizzes
    }
  },

  async getLearningStats() {
    await simulateDelay()
    return learningStats
  },

  async getProgressChart({ time_range = '30d', course_id } = {}) {
    await simulateDelay()
    const daysMap = {
      '7d': 7,
      '30d': 30,
      '90d': 90
    }
    const days = daysMap[time_range] || 30
    return buildProgressPayload(days, course_id)
  },

  async getRecommendations() {
    await simulateDelay()
    return {
      recommended_courses: recommendationList.map((item) => ({
        ...item,
        id: item.course_id || randomId()
      }))
    }
  }
}
