from pathlib import Path
import re

def replace_course_block(path, new_block, key="'course-006':"):
    text = Path(path).read_text(encoding='utf-8')
    start = text.find(key)
    if start == -1:
        new_text = text.rstrip() + "\n" + new_block.rstrip() + "\n"
        Path(path).write_text(new_text, encoding='utf-8')
        return
    m = None
    for match in re.finditer(r"'course-[^']+':", text[start+len(key):]):
        m = match
        break
    if m:
        next_idx = start + len(key) + m.start()
    else:
        next_idx = len(text)
    new_text = text[:start] + new_block.rstrip() + "\n" + text[next_idx:]
    Path(path).write_text(new_text, encoding='utf-8')

course006_details = '''
  'course-006': {
    id: 'course-006',
    title: 'Tiếng Nhật Giao Tiếp (Japanese Communication Course)',
    description:
      'Khóa giao tiếp giúp luyện nghe nói cơ bản: chào hỏi, giới thiệu bản thân và giao tiếp hằng ngày.',
    category: 'Language Learning',
    subcategory: 'Japanese',
    level: 'Beginner',
    thumbnail_url: japanGTThumb,
    preview_video_url: null,
    language: 'vi-ja',
    status: 'published',
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
    course_statistics: {
      total_modules: 1,
      total_lessons: 2,
      total_duration_minutes: 35,
      enrollment_count: 0,
      completion_rate: 0,
      avg_rating: 4.7
    },
    enrollment_info: {
      is_enrolled: false,
      enrollment_id: null,
      enrolled_at: null,
      progress_percent: null,
      can_access_content: false
    },
    created_at: '2025-02-20T08:00:00.000Z',
    updated_at: '2025-02-20T08:00:00.000Z'
  }
'''

course006_modules = '''
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
        description: 'Chào hỏi, tạm biệt, giới thiệu ngắn gọn, phép lịch sự.',
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
          { id: 'lesson-006-01', title: 'Chào hỏi & tạm biệt', order: 1, status: 'not_started', duration_minutes: 15, type: 'video', is_locked: false },
          { id: 'lesson-006-02', title: 'Giới thiệu bản thân', order: 2, status: 'not_started', duration_minutes: 20, type: 'video', is_locked: false }
        ]
      }
    ]
  }
'''

course006_module_details = '''
  'course-006': {
    'module-006-01': {
      id: 'module-006-01',
      course_id: 'course-006',
      title: 'Chào hỏi và giới thiệu bản thân',
      description: 'Mẫu câu chào hỏi, tạm biệt, giới thiệu ngắn gọn và phép lịch sự cơ bản.',
      difficulty: 'Basic',
      order: 1,
      estimated_hours: 1.5,
      learning_outcomes: [
        'Dùng được mẫu chào hỏi, tạm biệt theo thời điểm.',
        'Giới thiệu bản thân ngắn gọn: tên, nghề nghiệp, quốc tịch.',
        'Thực hành phép lịch sự cơ bản trong giao tiếp tiếng Nhật.'
      ],
      pass_threshold: 70,
      lessons: [
        {
          id: 'lesson-006-01',
          title: 'Chào hỏi & tạm biệt',
          order: 1,
          duration_minutes: 15,
          content_type: 'video',
          has_quiz: true,
          is_completed: false,
          completion_date: null
        },
        {
          id: 'lesson-006-02',
          title: 'Giới thiệu bản thân',
          order: 2,
          duration_minutes: 20,
          content_type: 'video',
          has_quiz: true,
          is_completed: false,
          completion_date: null
        }
      ],
      resources: [
        { title: 'Handout chào hỏi cơ bản', type: 'pdf', url: 'https://example.com/resources/jp-greetings.pdf', is_mandatory: false },
        { title: 'Video mẫu giới thiệu bản thân', type: 'link', url: 'https://www.youtube.com/watch?v=Yh1mV7lAvgk', is_mandatory: false }
      ],
      progress_info: {
        total_lessons: 2,
        completed_lessons: 0,
        progress_percent: 0,
        is_accessible: true
      },
      created_at: '2025-02-20T08:00:00.000Z',
      updated_at: '2025-02-20T08:00:00.000Z'
    }
  }
'''

course006_lessons = '''
  'course-006': {
    'lesson-006-01': {
      id: 'lesson-006-01',
      module_id: 'module-006-01',
      course_id: 'course-006',
      title: 'Chào hỏi & tạm biệt',
      description:
        'Hiểu và sử dụng các mẫu câu chào buổi sáng, trưa, tối; tạm biệt, chúc ngủ ngon; phép lịch sự khi chào hỏi.',
      order: 1,
      duration_minutes: 15,
      content_type: 'mixed',
      content: {
        text_content:
          '<h3>Chào hỏi trong ngày</h3><ul><li>おはようございます – chào buổi sáng (lịch sự).</li><li>こんにちは – xin chào / chào buổi trưa.</li><li>こんばんは – chào buổi tối.</li><li>さようなら – tạm biệt (trang trọng).</li><li>おやすみなさい – chúc ngủ ngon.</li></ul><p>Lưu ý phép lịch sự và cúi chào.</p>',
        video_url: 'https://www.youtube.com/watch?v=Xn2HZ6yW8i8',
        video_duration: 300,
        video_thumbnail: japanGTThumb,
        code_snippets: []
      },
      resources: [
        { id: 'res-006-01-pdf', type: 'pdf', title: 'Handout chào hỏi cơ bản', description: 'Tổng hợp câu chào, tạm biệt, chúc ngủ ngon.', url: 'https://example.com/resources/jp-greeting-handout.pdf', file_size_bytes: 420000, is_downloadable: true }
      ],
      learning_objectives: [
        'Phân biệt lời chào theo thời điểm và mức độ lịch sự.',
        'Phát âm chuẩn các câu chào cơ bản.',
        'Hiểu phép lịch sự khi chào hỏi tiếng Nhật.'
      ],
      has_quiz: true,
      quiz_info: { quiz_id: 'quiz-lesson-006-01', question_count: 5, is_mandatory: false, pass_threshold: 70, time_limit: 10 },
      quiz_questions: [
        { id: 'quiz-006-01-q1', order: 1, question_text: '“おはようございます” dùng khi nào?', options: [
          { option_id: 'A', content: 'Buổi trưa' },
          { option_id: 'B', content: 'Buổi sáng (lịch sự)' },
          { option_id: 'C', content: 'Buổi tối' },
          { option_id: 'D', content: 'Trước khi ngủ' }
        ], correct_answer: 'B', explanation: 'Dùng vào buổi sáng với mức độ lịch sự chuẩn.' },
        { id: 'quiz-006-01-q2', order: 2, question_text: 'Từ nào nghĩa là “chúc ngủ ngon”?', options: [
          { option_id: 'A', content: 'こんばんは' }, { option_id: 'B', content: 'こんにちは' }, { option_id: 'C', content: 'おやすみなさい' }, { option_id: 'D', content: 'じゃあね' }
        ], correct_answer: 'C', explanation: 'おやすみなさい dùng khi chúc ngủ ngon.' },
        { id: 'quiz-006-01-q3', order: 3, question_text: '“こんにちは” dùng khi nào?', options: [
          { option_id: 'A', content: 'Buổi sáng sớm' }, { option_id: 'B', content: 'Buổi trưa – chiều' }, { option_id: 'C', content: 'Đêm khuya' }, { option_id: 'D', content: 'Khi tạm biệt' }
        ], correct_answer: 'B', explanation: 'こんにちは là lời chào trung lập từ giữa sáng tới chiều.' },
        { id: 'quiz-006-01-q4', order: 4, question_text: '“さようなら” phù hợp với tình huống nào?', options: [
          { option_id: 'A', content: 'Gặp bạn buổi trưa' }, { option_id: 'B', content: 'Tạm biệt trang trọng / lâu' }, { option_id: 'C', content: 'Chúc ngủ ngon' }, { option_id: 'D', content: 'Chào buổi sáng' }
        ], correct_answer: 'B', explanation: 'さようなら là tạm biệt trang trọng, khi xa lâu.' },
        { id: 'quiz-006-01-q5', order: 5, question_text: 'Lời chào thân mật buổi sáng là:', options: [
          { option_id: 'A', content: 'おはよう' }, { option_id: 'B', content: 'おはようございます' }, { option_id: 'C', content: 'こんにちは' }, { option_id: 'D', content: 'じゃあね' }
        ], correct_answer: 'A', explanation: 'おはよう là phiên bản thân mật buổi sáng.' }
      ],
      completion_status: { is_completed: false, completion_date: null, time_spent_minutes: 0, video_progress_percent: 0 },
      navigation: { previous_lesson: { id: null, title: null }, next_lesson: { id: 'lesson-006-02', title: 'Giới thiệu bản thân', is_locked: false } },
      created_at: '2025-02-20T08:00:00.000Z',
      updated_at: '2025-02-20T08:00:00.000Z'
    },
    'lesson-006-02': {
      id: 'lesson-006-02',
      module_id: 'module-006-01',
      course_id: 'course-006',
      title: 'Giới thiệu bản thân',
      description:
        'Giới thiệu tên, quốc tịch, nghề nghiệp, sở thích với mẫu câu lịch sự; luyện hội thoại hai chiều.',
      order: 2,
      duration_minutes: 20,
      content_type: 'mixed',
      content: {
        text_content:
          '<h3>Mẫu câu chính</h3><ul><li>わたしは 〜 です。 (Tôi là ...)</li><li>〜からきました。 (Tôi đến từ ...)</li><li>〜です。 (Nghề nghiệp ...)</li><li>〜さいです。 (Tôi ... tuổi)</li><li>しゅみは〜です。 (Sở thích của tôi là ...)</li><li>よろしくおねがいします。</li></ul>',
        video_url: 'https://www.youtube.com/watch?v=Yh1mV7lAvgk',
        video_duration: 420,
        video_thumbnail: japanGTThumb,
        code_snippets: []
      },
      resources: [
        { id: 'res-006-02-pdf', type: 'pdf', title: 'Mẫu tự giới thiệu', description: 'Câu và từ vựng cho tên, quốc tịch, nghề nghiệp, sở thích.', url: 'https://example.com/resources/japanese-selfintro.pdf', file_size_bytes: 380000, is_downloadable: true }
      ],
      learning_objectives: [
        'Giới thiệu bản thân ngắn gọn bằng tiếng Nhật.',
        'Dùng mẫu câu về tên, quốc tịch, nghề nghiệp, tuổi, sở thích.',
        'Kết thúc phần giới thiệu bằng よろしくおねがいします.'
      ],
      has_quiz: true,
      quiz_info: { quiz_id: 'quiz-lesson-006-02', question_count: 5, is_mandatory: false, pass_threshold: 70, time_limit: 12 },
      quiz_questions: [
        { id: 'quiz-006-02-q1', order: 1, question_text: '“わたしは〜です。” dùng để nói gì?', options: [
          { option_id: 'A', content: 'Nghề nghiệp' }, { option_id: 'B', content: 'Tên bản thân' }, { option_id: 'C', content: 'Tuổi' }, { option_id: 'D', content: 'Sở thích' }
        ], correct_answer: 'B', explanation: 'Mẫu “わたしは〜です。” giới thiệu tên/bản thân.' },
        { id: 'quiz-006-02-q2', order: 2, question_text: 'Mẫu “〜からきました” diễn đạt điều gì?', options: [
          { option_id: 'A', content: 'Tôi sống ở ...' }, { option_id: 'B', content: 'Tôi đến từ ...' }, { option_id: 'C', content: 'Tôi làm ở ...' }, { option_id: 'D', content: 'Tôi thích ...' }
        ], correct_answer: 'B', explanation: '〜からきました = tôi đến từ (quốc gia/địa điểm).' },
        { id: 'quiz-006-02-q3', order: 3, question_text: 'Câu kết thúc lịch sự sau khi giới thiệu:', options: [
          { option_id: 'A', content: 'おやすみなさい' }, { option_id: 'B', content: 'こんにちは' }, { option_id: 'C', content: 'よろしくおねがいします' }, { option_id: 'D', content: 'さようなら' }
        ], correct_answer: 'C', explanation: 'よろしくおねがいします dùng để kết thúc phần giới thiệu.' },
        { id: 'quiz-006-02-q4', order: 4, question_text: '“しゅみはサッカーです。” nghĩa là gì?', options: [
          { option_id: 'A', content: 'Tôi thích bóng đá' }, { option_id: 'B', content: 'Tôi là cầu thủ' }, { option_id: 'C', content: 'Tôi đến từ CLB bóng đá' }, { option_id: 'D', content: 'Tôi chơi bóng đá mỗi ngày' }
        ], correct_answer: 'A', explanation: 'しゅみは〜です diễn đạt sở thích.' },
        { id: 'quiz-006-02-q5', order: 5, question_text: 'Mẫu nói tuổi “〜さいです” được dùng thế nào?', options: [
          { option_id: 'A', content: 'Nói nghề nghiệp' }, { option_id: 'B', content: 'Nói sở thích' }, { option_id: 'C', content: 'Nói tuổi' }, { option_id: 'D', content: 'Nói quốc tịch' }
        ], correct_answer: 'C', explanation: '〜さいです dùng để nói tuổi.' }
      ],
      completion_status: { is_completed: false, completion_date: null, time_spent_minutes: 0, video_progress_percent: 0 },
      navigation: { previous_lesson: { id: 'lesson-006-01', title: 'Chào hỏi & tạm biệt' }, next_lesson: { id: null, title: null, is_locked: true } },
      created_at: '2025-02-20T08:00:00.000Z',
      updated_at: '2025-02-20T08:00:00.000Z'
    }
  }
}
'''

replace_course_block('src/mocks/mockCourseDetails.js', course006_details)
replace_course_block('src/mocks/mockCourseModules.js', course006_modules)
replace_course_block('src/mocks/mockModuleDetails.js', course006_module_details)
replace_course_block('src/mocks/mockLessonDetails.js', course006_lessons)
