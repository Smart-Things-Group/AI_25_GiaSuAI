import japanGTThumb from '@/img/JapanGT.png'
import math6Thumb from '@/img/Math6.png'

const simulateDelay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms))
const deepClone = (data) => JSON.parse(JSON.stringify(data))

export const courseDetailsById = {
  'course-006': {
    id: 'course-006',
    title: 'Tiếng Nhật Giao Tiếp (Japanese Communication Course)',
    description:
      'Khóa giao tiếp giúp luyện nghe – nói cơ bản: chào hỏi, giới thiệu bản thân và giao tiếp hằng ngày.',
    category: 'Language Learning',
    subcategory: 'Japanese',
    level: 'Beginner',
    thumbnail_url: japanGTThumb,
    preview_video_url: null,
    language: 'vi-ja',
    status: 'Công khai',
    owner_info: {
      id: 'instr-006',
      name: 'Yamada Kenji',
      avatar_url: null,
      bio: 'Giảng viên tiếng Nhật, 8 năm kinh nghiệm dạy giao tiếp cho người Việt.',
      experience_years: 8
    },
    learning_outcomes: [
      { description: 'Chào hỏi, giới thiệu, cảm ơn, xin lỗi trong các tình huống cơ bản.', skill_tag: 'Conversation' },
      { description: 'Phát âm chuẩn và phản xạ nghe – nói nhanh.', skill_tag: 'Speaking & Listening' },
      { description: 'Hiểu phép lịch sự và văn hóa giao tiếp tiếng Nhật.', skill_tag: 'Culture' }
    ],
    prerequisites: [
      'Không yêu cầu trình độ tiếng Nhật trước đó.',
      'Thiết bị nghe/nhìn và có thể ghi âm giọng nói.',
      'Khuyến khích dùng tai nghe khi luyện nghe – nói.'
    ],
    modules: [
      {
        id: 'module-006-01',
        title: 'Chào hỏi và giới thiệu bản thân',
        description: 'Mẫu câu chào hỏi, tạm biệt, giới thiệu cơ bản.',
        difficulty: 'Basic',
        estimated_hours: 1.5,
        lessons: [
          { id: 'lesson-006-01', title: 'Chào hỏi & tạm biệt', order: 1, duration_minutes: 15, content_type: 'video', is_completed: false },
          { id: 'lesson-006-02', title: 'Giới thiệu bản thân', order: 2, duration_minutes: 20, content_type: 'video', is_completed: false }
        ]
      }
    ],
    course_statistics: { total_modules: 1, total_lessons: 2, total_duration_minutes: 35, enrollment_count: 0, completion_rate: 0, avg_rating: 4.7 },
    enrollment_info: { is_enrolled: false, enrollment_id: null, enrolled_at: null, progress_percent: null, can_access_content: false },
    created_at: '2025-02-20T08:00:00.000Z',
    updated_at: '2025-02-20T08:00:00.000Z'
  },
  'course-007': {
    id: 'course-007',
    title: 'Toán 6 - Số tự nhiên',
    description:
      'Mô-đun đầu tiên chương trình Toán 6: tập hợp số tự nhiên, phép tính cơ bản, ước bội, UCLN và BCNN.',
    category: 'Math',
    subcategory: 'Lớp 6',
    level: 'Beginner',
    thumbnail_url: math6Thumb,
    preview_video_url: null,
    language: 'vi',
    status: 'Công khai',
    owner_info: {
      id: 'instr-007',
      name: 'Cô Mai Anh',
      avatar_url: null,
      bio: 'Giáo viên Toán THCS, hơn 10 năm giảng dạy và biên soạn tài liệu Toán lớp 6.',
      experience_years: 10
    },
    learning_outcomes: [
      { description: 'Biểu diễn tập hợp, đọc viết số tự nhiên, sử dụng trục số.', skill_tag: 'Số tự nhiên' },
      { description: 'Thực hiện cộng, trừ, nhân, chia, lũy thừa với số mũ tự nhiên.', skill_tag: 'Phép tính cơ bản' },
      { description: 'Vận dụng dấu hiệu chia hết, tìm ước bội, UCLN và BCNN.', skill_tag: 'Ước - Bội' }
    ],
    prerequisites: ['Kiến thức Toán lớp 5 cơ bản'],
    modules: [
      {
        id: 'module-007-01',
        title: 'Số tự nhiên',
        description: 'Giới thiệu về số tự nhiên, phép tính cơ bản và ước bội.',
        difficulty: 'Basic',
        estimated_hours: 5,
        lessons: [
          { id: 'lesson-007-01', title: 'Tập hợp số tự nhiên & trục số', order: 1, duration_minutes: 25, content_type: 'video', is_completed: false },
          { id: 'lesson-007-02', title: 'Cộng trừ số tự nhiên', order: 2, duration_minutes: 25, content_type: 'video', is_completed: false },
          { id: 'lesson-007-03', title: 'Nhân, chia và lũy thừa', order: 3, duration_minutes: 30, content_type: 'mixed', is_completed: false },
          { id: 'lesson-007-04', title: 'Ước, bội, UCLN & BCNN', order: 4, duration_minutes: 30, content_type: 'quiz', is_completed: false }
        ]
      }
    ],
    course_statistics: { total_modules: 1, total_lessons: 4, total_duration_minutes: 110, enrollment_count: 0, completion_rate: 0, avg_rating: 4.8 },
    enrollment_info: { is_enrolled: false, enrollment_id: null, enrolled_at: null, progress_percent: null, can_access_content: false },
    created_at: '2025-03-01T09:00:00.000Z',
    updated_at: '2025-03-01T09:00:00.000Z'
  },
  'course-011': {
  id: 'course-011',
  title: 'Vật lý lớp 11',
  description:
    'Khóa học Vật lý THPT tập trung củng cố lý thuyết và tư duy: dao động, sóng, điện; hiểu bản chất thay vì học thuộc công thức.',
  category: 'Khoa học Tự nhiên',
  subcategory: 'Vật lý THPT',
  level: 'Beginner',
  thumbnail_url:
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=60',
  preview_video_url: null,
  language: 'vi',
  status: 'Công khai',
  owner_info: {
    id: 'instr-phy-011',
    name: 'Cô Mai Anh',
    avatar_url: null,
    bio: 'Giảng viên Vật lý, chú trọng dao động, sóng và điện học THPT.',
    experience_years: 6
  },
  learning_outcomes: [
    { description: 'Mô tả, phân biệt và tính toán các hiện tượng vật lý cơ bản.', skill_tag: 'Concepts' },
    { description: 'Vận dụng định luật Coulomb, Ohm và phân tích năng lượng trong dao động, sóng, điện.', skill_tag: 'Problem solving' },
    { description: 'Giải bài tập dao động, sóng, tĩnh điện, mạch điện phục vụ thi THPT.', skill_tag: 'Exam prep' }
  ],
  prerequisites: [
    'Nền tảng toán học và vật lý cơ bản THCS.',
    'Thiết bị học có âm thanh/hình ảnh.'
  ],
  modules: [
    {
      id: 'module-011-04',
      title: 'Dao động',
      description:
        'Dao động điều hòa: phương trình, vận tốc, gia tốc, đại lượng đặc trưng; năng lượng và các hiện tượng tắt dần, cưỡng bức, cộng hưởng.',
      difficulty: 'Basic',
      estimated_hours: 0.5,
      lessons: [
        {
          id: 'lesson-011-04',
          title: 'Dao động',
          order: 4,
          duration_minutes: 30,
          content_type: 'video',
          is_completed: false
        }
      ],
      learning_outcomes: [
        'Mô tả dao động điều hòa, viết phương trình li độ, vận tốc, gia tốc.',
        'Tính toán năng lượng và nhận biết dao động tắt dần, cưỡng bức, cộng hưởng.'
      ]
    }
  ],
    course_statistics: {
      total_modules: 4,
      total_lessons: 12,
      total_duration_minutes: 2400,
      enrollment_count: 25,
      completion_rate: 0,
      avg_rating: 4.6
    },
    enrollment_info: {
      is_enrolled: true,
      enrollment_id: 'enroll-course-011',
      enrolled_at: '2025-03-12T08:00:00.000Z',
      progress_percent: 0,
      can_access_content: true
    },
    created_at: '2025-03-10T09:00:00.000Z',
    updated_at: '2025-03-10T09:00:00.000Z'
  }
}

export const mockCourseDetailsAPI = {
  async fetchCourseDetail(courseId) {
    await simulateDelay()
    const detail = courseDetailsById[courseId]
    if (!detail) throw new Error('Course not found (mock)')
    return deepClone(detail)
  }
}
