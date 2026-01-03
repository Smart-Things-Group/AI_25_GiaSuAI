const simulateDelay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms))
const deepClone = (data) => JSON.parse(JSON.stringify(data))
const generateId = () => `class-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36)}`

let adminClasses = [
  {
    class_id: 'class-001',
    class_name: 'Lớp Python cơ bản (Tháng 1)',
    course_title: 'Lập trình Python cơ bản',
    instructor_name: 'Nguyễn Văn A',
    student_count: 45,
    status: 'active',
    created_at: '2025-01-10T08:00:00.000Z'
  },
  {
    class_id: 'class-002',
    class_name: 'Lớp Machine Learning K2',
    course_title: 'Machine Learning với TensorFlow',
    instructor_name: 'Trần Thị B',
    student_count: 32,
    status: 'active',
    created_at: '2025-02-05T08:00:00.000Z'
  },
  {
    class_id: 'class-003',
    class_name: 'Web React tháng 3',
    course_title: 'Phát triển Web với React',
    instructor_name: 'Lê Văn C',
    student_count: 27,
    status: 'completed',
    created_at: '2025-03-15T08:00:00.000Z'
  },
  {
    class_id: 'class-004',
    class_name: 'Data Science Bootcamp',
    course_title: 'Data Science với Python',
    instructor_name: 'Phạm Thị D',
    student_count: 19,
    status: 'completed',
    created_at: '2024-12-12T08:00:00.000Z'
  }
]

const filterAndSort = (params) => {
  const {
    status,
    instructor_id, // mock không có instructor_id thực, bỏ qua hoặc có thể match instructor_name nếu cần
    course_id, // mock không map course_id, bỏ qua
    sort_by = 'created_at',
    order = 'desc',
    skip = 0,
    limit = 10
  } = params

  let result = adminClasses.filter((c) => (status ? c.status === status : true))

  result = result.sort((a, b) => {
    const dir = order === 'asc' ? 1 : -1
    switch (sort_by) {
      case 'student_count':
        return (a.student_count - b.student_count) * dir
      case 'name':
        return a.class_name.localeCompare(b.class_name) * dir
      case 'created_at':
      default:
        return (new Date(a.created_at) - new Date(b.created_at)) * dir
    }
  })

  const start = Number(skip) || 0
  const end = start + (Number(limit) || 10)
  return { items: result.slice(start, end), total: result.length, skip: start, limit: Number(limit) || 10 }
}

export const mockAdminClassAPI = {
  async listClasses(params = {}) {
    await simulateDelay()
    const { items, total, skip, limit } = filterAndSort(params)
    return {
      data: deepClone(items),
      total,
      skip,
      limit
    }
  },

  async createClass(payload) {
    await simulateDelay()
    const {
      class_name,
      course_title,
      instructor_name,
      student_count = 0,
      status = 'active',
      created_at = new Date().toISOString()
    } = payload || {}
    if (!class_name || !course_title || !instructor_name) {
      throw new Error('Thiếu thông tin bắt buộc')
    }
    const newClass = {
      class_id: generateId(),
      class_name,
      course_title,
      instructor_name,
      student_count,
      status,
      created_at
    }
    adminClasses = [newClass, ...adminClasses]
    return deepClone(newClass)
  }
}

