import japanGTThumb from '@/img/JapanGT.png'

const simulateDelay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms))
const deepClone = (data) => JSON.parse(JSON.stringify(data))

export const lessonDetailsByCourse = {
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
        {
          id: 'res-006-01-pdf',
          type: 'pdf',
          title: 'Handout chào hỏi cơ bản',
          description: 'Tổng hợp câu chào, tạm biệt, chúc ngủ ngon.',
          url: 'https://example.com/resources/jp-greeting-handout.pdf',
          file_size_bytes: 420000,
          is_downloadable: true
        }
      ],
      learning_objectives: [
        'Phân biệt lời chào theo thời điểm và mức độ lịch sự.',
        'Phát âm chuẩn các câu chào cơ bản.',
        'Hiểu phép lịch sự khi chào hỏi tiếng Nhật.'
      ],
      has_quiz: true,
      quiz_info: { quiz_id: 'quiz-lesson-006-01', question_count: 5, is_mandatory: false, pass_threshold: 70, time_limit: 10 },
      quiz_questions: [
        {
          id: 'quiz-006-01-q1',
          order: 1,
          question_text: '“おはようございます” dùng khi nào?',
          options: [
            { option_id: 'A', content: 'Buổi trưa' },
            { option_id: 'B', content: 'Buổi sáng (lịch sự)' },
            { option_id: 'C', content: 'Buổi tối' },
            { option_id: 'D', content: 'Trước khi ngủ' }
          ],
          correct_answer: 'B',
          explanation: 'Dùng vào buổi sáng với mức độ lịch sự chuẩn.'
        },
        {
          id: 'quiz-006-01-q2',
          order: 2,
          question_text: 'Từ nào nghĩa là “chúc ngủ ngon”?',
          options: [
            { option_id: 'A', content: 'こんばんは' },
            { option_id: 'B', content: 'こんにちは' },
            { option_id: 'C', content: 'おやすみなさい' },
            { option_id: 'D', content: 'じゃあね' }
          ],
          correct_answer: 'C',
          explanation: 'おやすみなさい dùng khi chúc ngủ ngon.'
        },
        {
          id: 'quiz-006-01-q3',
          order: 3,
          question_text: '“こんにちは” dùng khi nào?',
          options: [
            { option_id: 'A', content: 'Buổi sáng sớm' },
            { option_id: 'B', content: 'Buổi trưa – chiều' },
            { option_id: 'C', content: 'Đêm khuya' },
            { option_id: 'D', content: 'Khi tạm biệt' }
          ],
          correct_answer: 'B',
          explanation: 'こんにちは là lời chào trung lập từ giữa sáng tới chiều.'
        },
        {
          id: 'quiz-006-01-q4',
          order: 4,
          question_text: '“さようなら” phù hợp với tình huống nào?',
          options: [
            { option_id: 'A', content: 'Gặp bạn buổi trưa' },
            { option_id: 'B', content: 'Tạm biệt trang trọng / lâu' },
            { option_id: 'C', content: 'Chúc ngủ ngon' },
            { option_id: 'D', content: 'Chào buổi sáng' }
          ],
          correct_answer: 'B',
          explanation: 'さようなら là tạm biệt trang trọng, khi xa lâu.'
        },
        {
          id: 'quiz-006-01-q5',
          order: 5,
          question_text: 'Lời chào thân mật buổi sáng là:',
          options: [
            { option_id: 'A', content: 'おはよう' },
            { option_id: 'B', content: 'おはようございます' },
            { option_id: 'C', content: 'こんにちは' },
            { option_id: 'D', content: 'じゃあね' }
          ],
          correct_answer: 'A',
          explanation: 'おはよう là phiên bản thân mật buổi sáng.'
        }
      ],
      completion_status: {
        is_completed: false,
        completion_date: null,
        time_spent_minutes: 0,
        video_progress_percent: 0
      },
      navigation: {
        previous_lesson: { id: null, title: null },
        next_lesson: { id: 'lesson-006-02', title: 'Giới thiệu bản thân', is_locked: false }
      },
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
