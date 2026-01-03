const simulateDelay = (ms = 380) => new Promise((resolve) => setTimeout(resolve, ms))
const nowIso = () => new Date().toISOString()
const addMinutes = (date, minutes) =>
  new Date(date.getTime() + minutes * 60 * 1000).toISOString()

const questionPool = [
  {
    question_id: 'q-mod-001',
    order: 1,
    question_text: 'Which statement best describes a closure in JavaScript?',
    question_type: 'multiple_choice',
    difficulty: 'medium',
    skill_tag: 'js-closures',
    points: 10,
    is_mandatory: false,
    options: [
      { option_id: 'A', content: 'A function bundled with references to its outer scope' },
      { option_id: 'B', content: 'A function that only runs once' },
      { option_id: 'C', content: 'A block-scoped variable' },
      { option_id: 'D', content: 'A reserved keyword in ES6' }
    ],
    hint: 'Think about lexical scope.'
  },
  {
    question_id: 'q-mod-002',
    order: 2,
    question_text: 'Which HTTP method is idempotent by definition?',
    question_type: 'multiple_choice',
    difficulty: 'easy',
    skill_tag: 'http-basics',
    points: 8,
    is_mandatory: false,
    options: [
      { option_id: 'A', content: 'POST' },
      { option_id: 'B', content: 'PUT' },
      { option_id: 'C', content: 'PATCH' },
      { option_id: 'D', content: 'CONNECT' }
    ],
    hint: 'Consider updating the same resource twice.'
  },
  {
    question_id: 'q-mod-003',
    order: 3,
    question_text: 'Pick the correct Big O complexity for binary search on a sorted array.',
    question_type: 'multiple_choice',
    difficulty: 'easy',
    skill_tag: 'algo-complexity',
    points: 8,
    is_mandatory: false,
    options: [
      { option_id: 'A', content: 'O(n)' },
      { option_id: 'B', content: 'O(log n)' },
      { option_id: 'C', content: 'O(1)' },
      { option_id: 'D', content: 'O(n log n)' }
    ],
    hint: null
  },
  {
    question_id: 'q-mod-004',
    order: 4,
    question_text: 'Which accessibility attribute links a label to a form control?',
    question_type: 'multiple_choice',
    difficulty: 'medium',
    skill_tag: 'web-a11y',
    points: 8,
    is_mandatory: false,
    options: [
      { option_id: 'A', content: 'aria-describedby' },
      { option_id: 'B', content: 'aria-label' },
      { option_id: 'C', content: 'for' },
      { option_id: 'D', content: 'role' }
    ],
    hint: 'It sits on the label tag.'
  }
]

const sampleQuizInfo = {
  id: 'quiz-sample-001',
  title: 'Kiểm tra cuối module: Foundations',
  description: 'Quiz ngắn để ôn lại kiến thức chính trước khi sang bài tiếp theo.',
  question_count: 8,
  time_limit: 15,
  pass_threshold: 70,
  mandatory_question_count: 1,
  user_attempts: 1,
  best_score: 82,
  last_attempt_at: addMinutes(new Date(), -60)
}

const practiceExercises = [
  {
    id: 'prac-001',
    type: 'theory',
    question: 'Giải thích tại sao debounce giúp cải thiện trải nghiệm người dùng khi gõ tìm kiếm.',
    options: [],
    correct_answer: 'Nó giảm số lần gọi API khi người dùng còn đang gõ liên tục.',
    explanation: 'Debounce giữ cho chỉ một lần gọi API được thực thi sau khoảng nghỉ, tránh spam.',
    difficulty: 'Medium',
    related_skill: 'frontend-performance',
    points: 5
  },
  {
    id: 'prac-002',
    type: 'coding',
    question: 'Viết hàm debounce(fn, delay) trả về một function mới.',
    options: [],
    correct_answer:
      'function debounce(fn, delay){let t;return (...args)=>{clearTimeout(t);t=setTimeout(()=>fn(...args), delay)}}',
    explanation: 'Sử dụng closure giữ tham chiếu timeout và xoá trước khi đặt timeout mới.',
    difficulty: 'Hard',
    related_skill: 'js-closures',
    points: 8
  },
  {
    id: 'prac-003',
    type: 'problem-solving',
    question: 'Chọn đáp án đúng: Vì sao status 403 khác 401?',
    options: ['401 là Unauthorized, 403 là Forbidden', 'Cả hai đều là Unauthenticated'],
    correct_answer: '401 là Unauthorized, 403 là Forbidden',
    explanation: '401 thường cho biết chưa xác thực, 403 là bị từ chối dù đã xác thực.',
    difficulty: 'Easy',
    related_skill: 'http-status',
    points: 4
  }
]

export const mockAssessmentAPI = {
  async generateModuleAssessment(courseId, moduleId, payload = {}) {
    await simulateDelay()
    const now = new Date()
    const requested = Math.max(Math.min(payload.question_count || 10, 15), 5)
    const selectedQuestions = questionPool.slice(0, requested)
    const totalPoints = selectedQuestions.reduce((sum, q) => sum + (q.points || 0), 0)
    return {
      assessment_id: 'asm-' + moduleId,
      module_id: moduleId,
      module_title: 'Module ' + moduleId + ' fundamentals',
      assessment_type: payload.assessment_type || 'review',
      question_count: selectedQuestions.length,
      time_limit_minutes: payload.time_limit_minutes || 15,
      total_points: totalPoints,
      pass_threshold: 70,
      questions: selectedQuestions,
      instructions: 'Trả lời tất cả câu hỏi, có ít nhất một câu điểm liệt.',
      created_at: nowIso(),
      expires_at: addMinutes(now, 60),
      can_retake: true,
      message: 'Bài kiểm tra module đã được tạo thành công'
    }
  },

  async getQuizInfo(quizId) {
    await simulateDelay(260)
    return { ...sampleQuizInfo, id: quizId || sampleQuizInfo.id }
  },

  async submitQuizAttempt(quizId, answers = []) {
    await simulateDelay(220)
    return {
      attempt_id: 'attempt-' + (quizId || 'sample'),
      quiz_id: quizId || sampleQuizInfo.id,
      submitted_at: nowIso(),
      message: 'Bài làm đã được nộp'
    }
  },

  async getQuizResults(quizId) {
    await simulateDelay(320)
    return {
      attempt_id: 'attempt-' + (quizId || 'sample'),
      quiz_id: quizId || sampleQuizInfo.id,
      total_score: 82,
      status: 'Pass',
      pass_threshold: 70,
      results: [
        {
          question_id: 'q-mod-001',
          question_content: 'Which statement best describes a closure in JavaScript?',
          student_answer: 'A',
          correct_answer: 'A',
          is_correct: true,
          is_mandatory: false,
          score: 10,
          explanation: 'Closure giữ lại tham chiếu đến biến bên ngoài trong lúc hàm được gọi.',
          related_lesson_link: '/dashboard/courses/course-001/lessons/lesson-002'
        },
        {
          question_id: 'q-mod-005',
          question_content: 'Which SQL clause is used to filter aggregated results?',
          student_answer: 'A',
          correct_answer: 'B',
          is_correct: false,
          is_mandatory: true,
          score: 0,
          explanation: 'HAVING lọc trên kết quả group, WHERE lọc trước khi group.',
          related_lesson_link: '/dashboard/courses/course-001/lessons/lesson-004'
        },
        {
          question_id: 'q-mod-009',
          question_content: 'Which HTTP status code represents “Forbidden”?',
          student_answer: 'B',
          correct_answer: 'B',
          is_correct: true,
          is_mandatory: false,
          score: 4,
          explanation: '403 được trả về khi request hợp lệ nhưng bị từ chối truy cập.',
          related_lesson_link: '/dashboard/courses/course-001/lessons/lesson-003'
        }
      ],
      mandatory_passed: false,
      can_retake: true
    }
  },

  async retakeQuiz(quizId) {
    await simulateDelay(240)
    if (quizId === 'quiz-phy-011-04') {
      return {
        new_attempt_id: 'attempt-retake-' + quizId,
        quiz_id: quizId,
        message: 'Bài làm mới được sinh ra',
        questions: [
          {
            id: 'phy-retake-q1',
            content: 'Dao động của một vật là gì?',
            options: [
              'Là chuyển động của một vật theo đường thẳng.',
              'Là chuyển động của một vật quanh một vị trí xác định gọi là vị trí cân bằng.',
              'Là chuyển động có quỹ đạo là đường tròn.',
              'Là chuyển động mà sau mỗi khoảng thời gian xác định thì vật trở lại trạng thái cũ.'
            ]
          },
          {
            id: 'phy-retake-q2',
            content: 'Một vật dao động được gọi là dao động tuần hoàn khi nào?',
            options: [
              'Vật luôn chuyển động nhanh dần đều.',
              'Vật chuyển động có phương trình li độ là hàm cosin.',
              'Sau mỗi khoảng thời gian xác định, vật trở lại trạng thái cũ (vị trí cũ, hướng cũ).',
              'Vật chỉ dao động quanh vị trí cân bằng.'
            ]
          },
          {
            id: 'phy-retake-q3',
            content: 'Dao động điều hòa là loại dao động nào?',
            options: [
              'Là dao động có chu kỳ thay đổi theo thời gian.',
              'Là dao động tuần hoàn phức tạp nhất.',
              'Là dao động có tần số rất lớn.',
              'Là dao động tuần hoàn đơn giản nhất.'
            ]
          },
          {
            id: 'phy-retake-q4',
            content: 'Đặc điểm về mặt toán học của dao động điều hòa là gì?',
            options: [
              'Li độ của vật là một hàm số bậc hai theo thời gian.',
              'Li độ của vật là một hàm cosin (hoặc sin) theo thời gian.',
              'Vận tốc của vật là một hằng số.',
              'Quỹ đạo chuyển động là đường tròn.'
            ]
          },
          {
            id: 'phy-retake-q5',
            content:
              'Trong phương trình li độ của dao động điều hòa, đại lượng nào cho biết độ lớn cực đại của li độ và là hằng số dương?',
            options: ['Li độ.', 'Biên độ.', 'Pha ban đầu.', 'Tần số góc.']
          },
          {
            id: 'phy-retake-q6',
            content: 'Đại lượng li độ trong dao động điều hòa là gì?',
            options: [
              'Khoảng cách lớn nhất từ vật đến vị trí cân bằng.',
              'Tọa độ của vật tại một thời điểm bất kỳ.',
              'Tốc độ thay đổi của pha dao động.',
              'Góc quay của vectơ quay.'
            ]
          },
          {
            id: 'phy-retake-q7',
            content: 'Chu kỳ của dao động điều hòa là gì?',
            options: [
              'Là số dao động toàn phần mà vật thực hiện được trong một giây.',
              'Là độ lớn cực đại của li độ.',
              'Là khoảng thời gian để vật thực hiện được một dao động toàn phần.',
              'Là góc mà vật quay được trong một giây.'
            ]
          },
          {
            id: 'phy-retake-q8',
            content: 'Đơn vị đo của tần số dao động là gì?',
            options: ['Giây.', 'Radian.', 'Centimet.', 'Héc (Hz).']
          },
          {
            id: 'phy-retake-q9',
            content: 'Tần số dao động là đại lượng mô tả điều gì?',
            options: [
              'Khoảng thời gian vật thực hiện một dao động.',
              'Số dao động toàn phần thực hiện được trong một giây.',
              'Vị trí ban đầu của vật.',
              'Vận tốc cực đại của vật.'
            ]
          },
          {
            id: 'phy-retake-q10',
            content:
              'Theo mẹo học thuộc, một chu kỳ (T) dao động toàn phần trên đồ thị tương ứng với bao nhiêu lần vật dao động lên và xuống?',
            options: ['Một lần.', 'Hai lần.', 'Bốn lần.', 'Nửa lần.']
          }
        ]
      }
    }

    return {
      new_attempt_id: 'attempt-retake-' + (quizId || 'sample'),
      quiz_id: quizId || sampleQuizInfo.id,
      message: 'Bài làm mới được sinh ra',
      questions: [
        {
          id: 'retake-q1',
          content: 'Chọn HTTP method phù hợp để cập nhật toàn bộ tài nguyên?',
          options: ['PUT', 'GET', 'PATCH', 'HEAD']
        },
        {
          id: 'retake-q2',
          content: 'Status code nào cho biết tài nguyên không tồn tại?',
          options: ['200', '301', '404', '500']
        }
      ]
    }
  },

  async generatePracticeExercises(payload = {}) {
    await simulateDelay(300)
    const hasSource = payload.lesson_id || payload.course_id || payload.topic_prompt
    if (!hasSource) {
      throw new Error('Phải cung cấp lesson_id, course_id hoặc topic_prompt')
    }
    return {
      practice_id: 'practice-' + (payload.lesson_id || payload.course_id || 'topic'),
      source: {
        lesson_id: payload.lesson_id || null,
        course_id: payload.course_id || null,
        topic_prompt: payload.topic_prompt || null
      },
      difficulty: payload.difficulty || 'medium',
      exercises: practiceExercises,
      total_questions: practiceExercises.length,
      estimated_time: 18,
      created_at: nowIso(),
      message: 'Bài luyện tập cá nhân hóa được sinh thành công'
    }
  }
}
