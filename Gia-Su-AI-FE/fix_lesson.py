from pathlib import Path
path = Path('src/mocks/mockLessonDetails.js')
text = path.read_text(encoding='utf-8', errors='ignore')
idx = text.find("'course-007'")
if idx == -1:
    raise SystemExit('course-007 not found')
prefix = text[:idx]
block = """
  'course-007': {
    'lesson-007-01': {
      id: 'lesson-007-01',
      module_id: 'module-007-01',
      course_id: 'course-007',
      title: 'Tập hợp số tự nhiên & trục số',
      description:
        'Ôn tập cách biểu diễn tập hợp số tự nhiên, đọc/viết số và nhận biết thứ tự trên trục số.',
      order: 1,
      duration_minutes: 25,
      content_type: 'mixed',
      content: {
        text_content:
          '<h3>Nội dung chính</h3><ul><li>Định nghĩa tập hợp số tự nhiên, ký hiệu N.</li><li>Cách viết dạng tổng quát và dạng tập con của N.</li><li>Trục số: vị trí số 0, thứ tự trái - phải.</li><li>Số liền kề, số đứng trước, đứng sau.</li></ul>',
        video_url: 'https://www.youtube.com/watch?v=zvR9nCMsLfo',
        video_duration: 540,
        video_thumbnail: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=60',
        code_snippets: []
      },
      resources: [
        {
          id: 'res-007-01-pdf',
          type: 'pdf',
          title: 'Số tự nhiên & trục số - handout',
          description: 'Tóm tắt công thức, ví dụ về tập hợp N và cách biểu diễn trên trục số.',
          url: 'https://example.com/resources/math6-natural-number-handout.pdf',
          file_size_bytes: 420000,
          is_downloadable: true
        }
      ],
      learning_objectives: [
        'Nhận dạng và viết được tập hợp số tự nhiên, số liền kề.',
        'Đặt được số trên trục số, so sánh thứ tự bên trái/bên phải.',
        'Viết được dạng tổng quát của tập hợp con của N.'
      ],
      has_quiz: true,
      quiz_info: {
        quiz_id: 'quiz-lesson-007-01',
        question_count: 5,
        is_mandatory: false,
        pass_threshold: 70,
        time_limit: 12
      },
      quiz_questions: [
        {
          id: 'quiz-007-01-q1',
          order: 1,
          question_text: 'Tập hợp số tự nhiên N gồm những số nào?',
          options: [
            { option_id: 'A', content: '..., -2, -1, 0, 1, 2, ...' },
            { option_id: 'B', content: '0, 1, 2, 3, 4, ...' },
            { option_id: 'C', content: '1, 2, 3, 4 (không có 0)' },
            { option_id: 'D', content: 'Chỉ có số chẵn' }
          ],
          correct_answer: 'B',
          explanation: 'Số tự nhiên gồm 0 và các số nguyên dương: 0, 1, 2, 3, 4...'
        },
        {
          id: 'quiz-007-01-q2',
          order: 2,
          question_text: 'Ký hiệu tập hợp số tự nhiên là gì?',
          options: [
            { option_id: 'A', content: 'Z' },
            { option_id: 'B', content: 'R' },
            { option_id: 'C', content: 'N' },
            { option_id: 'D', content: 'Q' }
          ],
          correct_answer: 'C',
          explanation: 'Tập hợp số tự nhiên được ký hiệu là N.'
        },
        {
          id: 'quiz-007-01-q3',
          order: 3,
          question_text: 'Trên trục số, số đứng bên trái 35 là:',
          options: [
            { option_id: 'A', content: '34' },
            { option_id: 'B', content: '33' },
            { option_id: 'C', content: '36' },
            { option_id: 'D', content: '37' }
          ],
          correct_answer: 'A',
          explanation: 'Bên trái là số nhỏ hơn một đơn vị: 34.'
        },
        {
          id: 'quiz-007-01-q4',
          order: 4,
          question_text: 'Số liền kề với 0 trong N là gì?',
          options: [
            { option_id: 'A', content: '-1 và 1' },
            { option_id: 'B', content: '1' },
            { option_id: 'C', content: 'Không có' },
            { option_id: 'D', content: '2' }
          ],
          correct_answer: 'B',
          explanation: 'Trong N không có số âm, nên liền kề với 0 chỉ có 1.'
        },
        {
          id: 'quiz-007-01-q5',
          order: 5,
          question_text: 'Câu nào đúng về thứ tự trên trục số?',
          options: [
            { option_id: 'A', content: 'Điểm bên trái lớn hơn điểm bên phải' },
            { option_id: 'B', content: 'Điểm bên phải luôn nhỏ hơn bên trái' },
            { option_id: 'C', content: 'Điểm bên trái nhỏ hơn điểm bên phải' },
            { option_id: 'D', content: 'Hai điểm luôn bằng nhau' }
          ],
          correct_answer: 'C',
          explanation: 'Trên trục số, đi sang phải giá trị tăng; bên trái là nhỏ hơn.'
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
        next_lesson: { id: 'lesson-007-02', title: 'Cộng trừ số tự nhiên', is_locked: false }
      },
      created_at: '2025-03-01T09:00:00.000Z',
      updated_at: '2025-03-01T09:00:00.000Z'
    },
    'lesson-007-02': {
      id: 'lesson-007-02',
      module_id: 'module-007-01',
      course_id: 'course-007',
      title: 'Cộng trừ số tự nhiên',
      description: 'Thuộc tính phép cộng, phép trừ trong N, quy tắc đặt tính và kiểm tra kết quả.',
      order: 2,
      duration_minutes: 25,
      content_type: 'mixed',
      content: {
        text_content:
          '<h3>Nội dung</h3><ul><li>Luật giao hoán, kết hợp của phép cộng.</li><li>Phép cộng và phép trừ trên trục số.</li><li>Đặt tính số hạng đơn vị, chục, trăm.</li><li>Các bài toán dạng tư duy: tìm số bị trừ, số trừ, hiệu.</li></ul>',
        video_url: 'https://www.youtube.com/watch?v=etX_5Bm_Qpg',
        video_duration: 600,
        video_thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=900&q=60',
        code_snippets: []
      },
      resources: [
        {
          id: 'res-007-02-pdf',
          type: 'pdf',
          title: 'Phép cộng trừ số tự nhiên',
          description: 'Mẫu đặt tính và bài tập luyện cộng trừ trong N.',
          url: 'https://example.com/resources/math6-add-subtract.pdf',
          file_size_bytes: 512000,
          is_downloadable: true
        }
      ],
      learning_objectives: [
        'Vận dụng giao hoán, kết hợp để tính nhanh phép cộng.',
        'Đặt tính cộng trừ đúng cột, kiểm tra hiệu/khoảng cách.',
        'Giải bài toán tìm số bị trừ, số trừ, hiệu.'
      ],
      has_quiz: true,
      quiz_info: {
        quiz_id: 'quiz-lesson-007-02',
        question_count: 5,
        is_mandatory: false,
        pass_threshold: 70,
        time_limit: 12
      },
      quiz_questions: [
        {
          id: 'quiz-007-02-q1',
          order: 1,
          question_text: 'Tính 3 458 + 2 542',
          options: [
            { option_id: 'A', content: '5 900' },
            { option_id: 'B', content: '6 000' },
            { option_id: 'C', content: '6 010' },
            { option_id: 'D', content: '5 800' }
          ],
          correct_answer: 'B',
          explanation: '3 458 + 2 542 = 6 000, có thể nhóm (3 000+2 000)+(458+542).'
        },
        {
          id: 'quiz-007-02-q2',
          order: 2,
          question_text: 'Nếu A + 245 = 1 000 thì A bằng bao nhiêu?',
          options: [
            { option_id: 'A', content: '745' },
            { option_id: 'B', content: '755' },
            { option_id: 'C', content: '765' },
            { option_id: 'D', content: '780' }
          ],
          correct_answer: 'B',
          explanation: 'A = 1 000 - 245 = 755.'
        },
        {
          id: 'quiz-007-02-q3',
          order: 3,
          question_text: 'Chọn tính chất đúng của phép cộng số tự nhiên:',
          options: [
            { option_id: 'A', content: 'a + b = b + a (giao hoán)' },
            { option_id: 'B', content: 'a + (b + c) # (a + b) + c' },
            { option_id: 'C', content: '0 không phải là số hạng trung lập' },
            { option_id: 'D', content: 'Cộng hai số tự nhiên luôn ra số âm' }
          ],
          correct_answer: 'A',
          explanation: 'Phép cộng có giao hoán và kết hợp, tổng của hai số tự nhiên vẫn là số tự nhiên.'
        },
        {
          id: 'quiz-007-02-q4',
          order: 4,
          question_text: 'Tính 8 000 - 3 507',
          options: [
            { option_id: 'A', content: '4 493' },
            { option_id: 'B', content: '4 503' },
            { option_id: 'C', content: '4 4930' },
            { option_id: 'D', content: '4 400' }
          ],
          correct_answer: 'A',
          explanation: '8 000 - 3 507 = 4 493, đặt tính theo cột hoặc tách 8 000 = 7 000 + 1 000.'
        },
        {
          id: 'quiz-007-02-q5',
          order: 5,
          question_text: 'Số bị trừ 6 500, số trừ 1 275. Hiệu bằng:',
          options: [
            { option_id: 'A', content: '5 125' },
            { option_id: 'B', content: '5 225' },
            { option_id: 'C', content: '5 235' },
            { option_id: 'D', content: '5 250' }
          ],
          correct_answer: 'B',
          explanation: '6 500 - 1 275 = 5 225.'
        }
      ],
      completion_status: {
        is_completed: false,
        completion_date: null,
        time_spent_minutes: 0,
        video_progress_percent: 0
      },
      navigation: {
        previous_lesson: { id: 'lesson-007-01', title: 'Tập hợp số tự nhiên & trục số' },
        next_lesson: { id: 'lesson-007-03', title: 'Nhân, chia và lũy thừa', is_locked: false }
      },
      created_at: '2025-03-01T09:00:00.000Z',
      updated_at: '2025-03-01T09:00:00.000Z'
    },
    'lesson-007-03': {
      id: 'lesson-007-03',
      module_id: 'module-007-01',
      course_id: 'course-007',
      title: 'Nhân, chia và lũy thừa',
      description: 'Tính nhân, chia số tự nhiên; luật nhân, chia cho 10, 100, 1 000; khái niệm lũy thừa với số mũ tự nhiên.',
      order: 3,
      duration_minutes: 30,
      content_type: 'mixed',
      content: {
        text_content:
          '<h3>Trong bài:</h3><ul><li>Ôn luật giao hoán, kết hợp, phân phối của phép nhân.</li><li>Chia hết, phép chia có dư, cách viết dạng tổng quát.</li><li>Khái niệm lũy thừa: a^n, tính nhanh lũy thừa cơ số 10.</li></ul>',
        video_url: 'https://www.youtube.com/watch?v=G08whs7LvYg',
        video_duration: 720,
        video_thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=900&q=60',
        code_snippets: []
      },
      resources: [
        {
          id: 'res-007-03-pdf',
          type: 'pdf',
          title: 'Phép nhân, chia và lũy thừa',
          description: 'Tài liệu tóm tắt công thức, ví dụ về nhân, chia, lũy thừa số tự nhiên.',
          url: 'https://example.com/resources/math6-multiply-divide.pdf',
          file_size_bytes: 460000,
          is_downloadable: true
        }
      ],
      learning_objectives: [
        'Áp dụng phân phối để tính nhanh nhân số tự nhiên.',
        'Thực hiện phép chia có dư, kiểm tra điều kiện chia hết.',
        'Đọc, viết và tính được lũy thừa cơ số tự nhiên.'
      ],
      has_quiz: true,
      quiz_info: {
        quiz_id: 'quiz-lesson-007-03',
        question_count: 5,
        is_mandatory: false,
        pass_threshold: 70,
        time_limit: 12
      },
      quiz_questions: [
        {
          id: 'quiz-007-03-q1',
          order: 1,
          question_text: 'Tính 48 x 25 nhanh nhất bằng cách nào?',
          options: [
            { option_id: 'A', content: 'Nhân trực tiếp' },
            { option_id: 'B', content: '48 x (100 : 4)' },
            { option_id: 'C', content: '(50 - 2) x 25' },
            { option_id: 'D', content: '48 x 10' }
          ],
          correct_answer: 'B',
          explanation: '25 = 100 : 4, nên 48 x 25 = 48 x (100 : 4) = 4 800 : 4 = 1 200.'
        },
        {
          id: 'quiz-007-03-q2',
          order: 2,
          question_text: 'Khi nào phép chia a : b được gọi là chia hết?',
          options: [
            { option_id: 'A', content: 'Khi dư > 0' },
            { option_id: 'B', content: 'Khi dư < b' },
            { option_id: 'C', content: 'Khi dư = 0' },
            { option_id: 'D', content: 'Khi b = 0' }
          ],
          correct_answer: 'C',
          explanation: 'Chia hết khi số dư bằng 0.'
        },
        {
          id: 'quiz-007-03-q3',
          order: 3,
          question_text: 'Giá trị 3^4 bằng bao nhiêu?',
          options: [
            { option_id: 'A', content: '3 + 4' },
            { option_id: 'B', content: '3 x 4' },
            { option_id: 'C', content: '3 x 3 x 3 x 3' },
            { option_id: 'D', content: '3^2 x 4' }
          ],
          correct_answer: 'C',
          explanation: '3^4 = 3 nhân 3 nhân 3 nhân 3 = 81.'
        },
        {
          id: 'quiz-007-03-q4',
          order: 4,
          question_text: 'Khi nhân số tự nhiên với 10, 100, 1 000 ta:',
          options: [
            { option_id: 'A', content: 'Thêm vào cuối lần lượt 1, 2, 3 chữ số 0' },
            { option_id: 'B', content: 'Bớt đi 1, 2, 3 chữ số 0' },
            { option_id: 'C', content: 'Không thay đổi' },
            { option_id: 'D', content: 'Nhân chia tùy ý' }
          ],
          correct_answer: 'A',
          explanation: 'Nhân 10^n thì thêm n chữ số 0 vào bên phải (nếu số nguyên).'
        },
        {
          id: 'quiz-007-03-q5',
          order: 5,
          question_text: 'Phép chia 145 : 12 có số dư là bao nhiêu?',
          options: [
            { option_id: 'A', content: '1' },
            { option_id: 'B', content: '2' },
            { option_id: 'C', content: '5' },
            { option_id: 'D', content: '9' }
          ],
          correct_answer: 'A',
          explanation: '12 x 12 = 144, nên 145 : 12 dư 1.'
        }
      ],
      completion_status: {
        is_completed: false,
        completion_date: null,
        time_spent_minutes: 0,
        video_progress_percent: 0
      },
      navigation: {
        previous_lesson: { id: 'lesson-007-02', title: 'Cộng trừ số tự nhiên' },
        next_lesson: { id: 'lesson-007-04', title: 'Ước, bội, UCLN & BCNN', is_locked: false }
      },
      created_at: '2025-03-01T09:00:00.000Z',
      updated_at: '2025-03-01T09:00:00.000Z'
    },
    'lesson-007-04': {
      id: 'lesson-007-04',
      module_id: 'module-007-01',
      course_id: 'course-007',
      title: 'Ước, bội, UCLN & BCNN',
      description: 'Dấu hiệu chia hết cho 2, 5, 3, 9; tìm ước, bội; phân tích thừa số nguyên tố, tìm UCLN, BCNN.',
      order: 4,
      duration_minutes: 30,
      content_type: 'mixed',
      content: {
        text_content:
          '<h3>Trong bài:</h3><ul><li>Dấu hiệu chia hết cho 2, 3, 5, 9.</li><li>Cách tìm ước, bội của một số.</li><li>Phân tích thừa số nguyên tố bằng sơ đồ cây/cột.</li><li>Tính UCLN, BCNN từ phân tích thừa số.</li></ul>',
        video_url: 'https://www.youtube.com/watch?v=KsbzG2_yZsQ',
        video_duration: 780,
        video_thumbnail: 'https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=900&q=60',
        code_snippets: []
      },
      resources: [
        {
          id: 'res-007-04-pdf',
          type: 'pdf',
          title: 'Ước bội, UCLN, BCNN',
          description: 'Phân tích thừa số nguyên tố và bảng mẫu tìm UCLN, BCNN.',
          url: 'https://example.com/resources/math6-gcd-lcm.pdf',
          file_size_bytes: 540000,
          is_downloadable: true
        }
      ],
      learning_objectives: [
        'Nhận biết dấu hiệu chia hết cho 2, 3, 5, 9.',
        'Tìm ước, bội và phân tích thừa số nguyên tố bằng sơ đồ cây/cột.',
        'Tính được UCLN, BCNN từ phân tích thừa số nguyên tố.'
      ],
      has_quiz: true,
      quiz_info: {
        quiz_id: 'quiz-lesson-007-04',
        question_count: 5,
        is_mandatory: false,
        pass_threshold: 70,
        time_limit: 12
      },
      quiz_questions: [
        {
          id: 'quiz-007-04-q1',
          order: 1,
          question_text: 'Số 3 456 chia hết cho 3 không?',
          options: [
            { option_id: 'A', content: 'Có, vì tổng chữ số = 18' },
            { option_id: 'B', content: 'Không, vì tận cùng là 6' },
            { option_id: 'C', content: 'Không, vì tổng chữ số là số chẵn' },
            { option_id: 'D', content: 'Không, vì không chia hết cho 9' }
          ],
          correct_answer: 'A',
          explanation: 'Tổng chữ số 3+4+5+6=18, chia hết cho 3 nên số chia hết cho 3.'
        },
        {
          id: 'quiz-007-04-q2',
          order: 2,
          question_text: 'Ước chung lớn nhất của 18 và 24 là:',
          options: [
            { option_id: 'A', content: '2' },
            { option_id: 'B', content: '3' },
            { option_id: 'C', content: '6' },
            { option_id: 'D', content: '12' }
          ],
          correct_answer: 'C',
          explanation: '18 = 2 x 3^2, 24 = 2^3 x 3, UCLN = 2 x 3 = 6.'
        },
        {
          id: 'quiz-007-04-q3',
          order: 3,
          question_text: 'Bội chung nhỏ nhất của 6 và 8 là:',
          options: [
            { option_id: 'A', content: '12' },
            { option_id: 'B', content: '18' },
            { option_id: 'C', content: '24' },
            { option_id: 'D', content: '48' }
          ],
          correct_answer: 'C',
          explanation: '6=2x3, 8=2^3, BCNN=2^3 x 3=24.'
        },
        {
          id: 'quiz-007-04-q4',
          order: 4,
          question_text: 'Số 235 có chia hết cho 5 không?',
          options: [
            { option_id: 'A', content: 'Có, vì tận cùng là 5' },
            { option_id: 'B', content: 'Không, vì tổng chữ số không chia hết cho 9' },
            { option_id: 'C', content: 'Không, vì tận cùng là 3' },
            { option_id: 'D', content: 'Không, vì không chia hết cho 2' }
          ],
          correct_answer: 'A',
          explanation: 'Tận cùng là 5 nên chia hết cho 5.'
        },
        {
          id: 'quiz-007-04-q5',
          order: 5,
          question_text: 'Phân tích 84 thành thừa số nguyên tố:',
          options: [
            { option_id: 'A', content: '2^2 x 3 x 7' },
            { option_id: 'B', content: '2 x 3 x 5 x 7' },
            { option_id: 'C', content: '2^3 x 7' },
            { option_id: 'D', content: '3^2 x 7' }
          ],
          correct_answer: 'A',
          explanation: '84 = 2 x 2 x 3 x 7 = 2^2 x 3 x 7.'
        }
      ],
      completion_status: {
        is_completed: false,
        completion_date: null,
        time_spent_minutes: 0,
        video_progress_percent: 0
      },
      navigation: {
        previous_lesson: { id: 'lesson-007-03', title: 'Nhân, chia và lũy thừa' },
        next_lesson: { id: null, title: null, is_locked: true }
      },
      created_at: '2025-03-01T09:00:00.000Z',
      updated_at: '2025-03-01T09:00:00.000Z'
    }
  }
}
"""
path.write_text(prefix + block, encoding='utf-8')
