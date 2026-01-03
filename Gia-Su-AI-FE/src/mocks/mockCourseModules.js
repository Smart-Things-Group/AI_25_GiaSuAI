const simulateDelay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms))
const deepClone = (data) => JSON.parse(JSON.stringify(data))

const fallbackTemplate = (courseId, courseTitle, moduleCount = 1, lessonCount = 3) => {
  const modules = Array.from({ length: moduleCount }).map((_, mIdx) => {
    const moduleId = `${courseId}-module-${String(mIdx + 1).padStart(2, '0')}`
    return {
      id: moduleId,
      title: `Module ${mIdx + 1}`,
      description: 'Module mock placeholder.',
      order: mIdx + 1,
      difficulty: 'Basic',
      estimated_hours: 1.5,
      total_lessons: lessonCount,
      completed_lessons: 0,
      progress_percent: 0,
      is_accessible: true,
      unlock_condition: null,
      status: 'not_started',
      completion_date: null,
      lessons_outline: Array.from({ length: lessonCount }).map((__, lIdx) => ({
        id: `${moduleId}-lesson-${String(lIdx + 1).padStart(2, '0')}`,
        title: `Bai ${lIdx + 1}`,
        order: lIdx + 1,
        status: 'not_started',
        duration_minutes: 15,
        type: 'video',
        is_locked: false
      }))
    }
  })
  return {
    course_id: courseId,
    course_title: courseTitle,
    total_modules: moduleCount,
    completed_modules: 0,
    overall_progress: 0,
    modules
  }
}

export const courseModulesOverview = {
  'course-006': {
    course_id: 'course-006',
    course_title: 'Tiếng Nhật Giao Tiếp',
    total_modules: 1,
    completed_modules: 0,
    overall_progress: 0,
    modules: [
      {
        id: 'module-006-01',
        title: 'Chào hỏi và giới thiệu bản thân',
        description: 'Chào hỏi, tạm biệt, giới thiệu cơ bản.',
        order: 1,
        difficulty: 'Basic',
        estimated_hours: 1.5,
        total_lessons: 2,
        completed_lessons: 0,
        progress_percent: 0,
        is_accessible: true,
        unlock_condition: null,
        status: 'not_started',
        completion_date: null,
        lessons_outline: [
          {
            id: 'lesson-006-01',
            title: 'Chào hỏi & tạm biệt',
            order: 1,
            status: 'not_started',
            duration_minutes: 15,
            type: 'video',
            is_locked: false
          },
          {
            id: 'lesson-006-02',
            title: 'Giới thiệu bản thân',
            order: 2,
            status: 'not_started',
            duration_minutes: 20,
            type: 'video',
            is_locked: false
          }
        ]
      }
    ]
  },

  'course-007': {
    course_id: 'course-007',
    course_title: 'Toán 6 - Số tự nhiên',
    total_modules: 1,
    completed_modules: 0,
    overall_progress: 0,
    modules: [
      {
        id: 'module-007-01',
        title: 'Số tự nhiên',
        description: 'Tập hợp số tự nhiên, phép tính cơ bản, ước - bội.',
        order: 1,
        difficulty: 'Basic',
        estimated_hours: 5,
        total_lessons: 4,
        completed_lessons: 0,
        progress_percent: 0,
        is_accessible: true,
        unlock_condition: null,
        status: 'not_started',
        completion_date: null,
        lessons_outline: [
          {
            id: 'lesson-007-01',
            title: 'Tập hợp số tự nhiên & trục số',
            order: 1,
            status: 'not_started',
            duration_minutes: 25,
            type: 'video',
            is_locked: false
          },
          {
            id: 'lesson-007-02',
            title: 'Cộng trừ số tự nhiên',
            order: 2,
            status: 'not_started',
            duration_minutes: 25,
            type: 'video',
            is_locked: false
          },
          {
            id: 'lesson-007-03',
            title: 'Nhân, chia và lũy thừa',
            order: 3,
            status: 'not_started',
            duration_minutes: 30,
            type: 'mixed',
            is_locked: false
          },
          {
            id: 'lesson-007-04',
            title: 'Ước, bội, UCLN & BCNN',
            order: 4,
            status: 'not_started',
            duration_minutes: 30,
            type: 'quiz',
            is_locked: false
          }
        ]
      }
    ]
  },

  'course-011': {
    course_id: 'course-011',
    course_title: 'Vật lý lớp 11',
    total_modules: 4,
    completed_modules: 0,
    overall_progress: 0,
    modules: [
      {
        id: 'module-011-04',
        title: 'Dao động',
        description: 'Dao động điều hòa, năng lượng, tắt dần, cưỡng bức, cộng hưởng.',
        order: 4,
        difficulty: 'Basic',
        estimated_hours: 0.5,
        total_lessons: 1,
        completed_lessons: 0,
        progress_percent: 0,
        is_accessible: true,
        unlock_condition: null,
        status: 'not_started',
        completion_date: null,
        lessons_outline: [
          {
            id: 'lesson-011-04',
            title: 'Dao động',
            order: 4,
            status: 'not_started',
            duration_minutes: 30,
            type: 'video',
            is_locked: false
          }
        ]
      }
    ]
  }
}


const buildCourseModulesFallback = (courseId = 'course-mock') =>
  fallbackTemplate(courseId, 'Course mock', 1, 3)

export const mockCourseModulesAPI = {
  async getCourseModules(courseId = 'course-mock') {
    await simulateDelay()
    const overview = courseModulesOverview[courseId]
    if (overview) return deepClone(overview)
    return buildCourseModulesFallback(courseId)
  }
}
