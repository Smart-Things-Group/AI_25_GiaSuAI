import japanGTThumb from '@/img/JapanGT.png'

const simulateDelay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms))
const deepClone = (data) => JSON.parse(JSON.stringify(data))

export const lessonDetailsByCourse = {

  'course-011': {
  'lesson-011-04': {
    id: 'lesson-011-04',
    module_id: 'module-011-04',
    course_id: 'course-011',
    title: 'Dao động',
    description:
      'Dao động điều hòa, đại lượng đặc trưng và các hiện tượng tắt dần, cưỡng bức, cộng hưởng.',
    order: 4,
    duration_minutes: 30,
    content_type: 'video',
    content: {
      text_content:
  `<h3>I. Dao động điều hòa</h3>

  <p><strong>1. Dao động là gì:</strong> 
  Dao động là chuyển động của một vật quanh vị trí xác định gọi là vị trí cân bằng (VTCB).</p>

  <p><strong>2. Dao động tuần hoàn:</strong> 
  Sau mỗi khoảng thời gian xác định thì vật quay lại trạng thái cũ (vị trí cũ, hướng cũ).</p>

  <p><strong>3. Dao động điều hòa:</strong> 
  Là dao động tuần hoàn đơn giản nhất. Dao động điều hòa có phương trình li độ là một hàm côsin (hoặc sin) theo thời gian.</p>

  <p style="text-align:center;"><strong>x = A cos(ωt + φ)</strong></p>

  <p><strong>Chú thích:</strong><br>
  x: li độ (cm);<br>
  A: biên độ (cm);<br>
  ω: tần số góc (rad/s);<br>
  φ: pha ban đầu (rad);<br>
  ωt + φ: pha tại thời điểm t (giây).</p>

  <h3>II. Mô tả dao động điều hòa</h3>

  <p><strong>1. Chu kỳ và tần số:</strong></p>
  <ul>
    <li>Chu kỳ T (s): khoảng thời gian để vật thực hiện được một dao động toàn phần (T = 2π/ω).</li>
    <li>Tần số f (Hz): số dao động toàn phần thực hiện được trong một giây (f = 1/T).</li>
  </ul>

  <p><em>Mẹo học thuộc:</em> 
  2 lần vật dao động lên và xuống trên đồ thị sẽ tương ứng với một chu kỳ T.</p>`
,
      video_url: '/simulation/index.html',
      video_duration: 0,
      video_thumbnail: null,
      code_snippets: []
    },
    resources: [
      {
        id: 'res-011-zip',
        type: 'zip',
        title: 'Lý thuyết dao dộng',
        description: 'File pdf học sinh có thể xem và tham khảo thêm',
        url: 'https://www.scribd.com/document/829067913/DAO-%C4%90%E1%BB%98NG-%C4%90I%E1%BB%80U-HOA'
      },
      {
        id: 'res-011-doc',
        type: 'doc',
        title: 'Bài tập củng cố',
        description: 'Tóm tắt: Các bạn có thể tải và luyện tập thêm.',
        url: 'https://docx.com.vn/tai-lieu/vat-li-11-bai-4-bai-tap-ve-dao-dong-dieu-hoa-33488'
      }
    ],

      quiz_info: {
        quiz_id: 'quiz-phy-011-04',
        question_count: 10,
        is_mandatory: false,
        pass_threshold: 70,
        time_limit: 15,
        attempt_status: 'not_started',
        last_score: null,
        attempts_allowed: 3
      },
      has_quiz: true,
      quiz_questions: [
        {
          id: 'quiz-011-04-q1',
          order: 1,
          question_text: 'Dao động của một vật là gì?',
          options: [
            { option_id: 'A', content: 'Là chuyển động của một vật theo đường thẳng.' },
            { option_id: 'B', content: 'Là chuyển động của một vật quanh một vị trí xác định gọi là vị trí cân bằng.' },
            { option_id: 'C', content: 'Là chuyển động có quỹ đạo là đường tròn.' },
            { option_id: 'D', content: 'Là chuyển động mà sau mỗi khoảng thời gian xác định thì vật trở lại trạng thái cũ.' }
          ],
          correct_answer: 'B',
          explanation: 'Dao động là chuyển động quanh vị trí cân bằng.'
        },
        {
          id: 'quiz-011-04-q2',
          order: 2,
          question_text: 'Một vật dao động được gọi là dao động tuần hoàn khi nào?',
          options: [
            { option_id: 'A', content: 'Vật luôn chuyển động nhanh dần đều.' },
            { option_id: 'B', content: 'Vật chuyển động có phương trình li độ là hàm cosin.' },
            { option_id: 'C', content: 'Sau mỗi khoảng thời gian xác định, vật trở lại trạng thái cũ (vị trí cũ, hướng cũ).' },
            { option_id: 'D', content: 'Vật chỉ dao động quanh vị trí cân bằng.' }
          ],
          correct_answer: 'C',
          explanation: 'Dao động tuần hoàn có tính lặp lại sau mỗi chu kì.'
        },
        {
          id: 'quiz-011-04-q3',
          order: 3,
          question_text: 'Dao động điều hòa là loại dao động nào?',
          options: [
            { option_id: 'A', content: 'Là dao động có chu kì thay đổi theo thời gian.' },
            { option_id: 'B', content: 'Là dao động tuần hoàn phức tạp nhất.' },
            { option_id: 'C', content: 'Là dao động có tần số rất lớn.' },
            { option_id: 'D', content: 'Là dao động tuần hoàn đơn giản nhất.' }
          ],
          correct_answer: 'D',
          explanation: 'Dao động điều hòa là dạng tuần hoàn đơn giản nhất.'
        },
        {
          id: 'quiz-011-04-q4',
          order: 4,
          question_text: 'Đặc điểm về mặt toán học của dao động điều hòa là gì?',
          options: [
            { option_id: 'A', content: 'Li độ của vật là một hàm số bậc hai theo thời gian.' },
            { option_id: 'B', content: 'Li độ của vật là một hàm côsin (hoặc sin) theo thời gian.' },
            { option_id: 'C', content: 'Vận tốc của vật là một hằng số.' },
            { option_id: 'D', content: 'Quỹ đạo chuyển động là đường tròn.' }
          ],
          correct_answer: 'B',
          explanation: 'Li độ biến thiên theo hàm sin/cos theo thời gian.'
        },
        {
          id: 'quiz-011-04-q5',
          order: 5,
          question_text:
            'Trong phương trình li độ của dao động điều hòa, đại lượng nào cho biết độ lớn cực đại của li độ và là một hằng số dương?',
          options: [
            { option_id: 'A', content: 'Li độ.' },
            { option_id: 'B', content: 'Biên độ.' },
            { option_id: 'C', content: 'Pha ban đầu.' },
            { option_id: 'D', content: 'Tần số góc.' }
          ],
          correct_answer: 'B',
          explanation: 'Biên độ là độ lớn cực đại của li độ.'
        },
        {
          id: 'quiz-011-04-q6',
          order: 6,
          question_text: 'Đại lượng li độ trong dao động điều hòa là gì?',
          options: [
            { option_id: 'A', content: 'Khoảng cách lớn nhất từ vật đến vị trí cân bằng.' },
            { option_id: 'B', content: 'Tọa độ của vật tại một thời điểm bất kì.' },
            { option_id: 'C', content: 'Tốc độ thay đổi của pha dao động.' },
            { option_id: 'D', content: 'Góc quay của vectơ quay.' }
          ],
          correct_answer: 'B',
          explanation: 'Li độ là tọa độ của vật theo thời gian.'
        },
        {
          id: 'quiz-011-04-q7',
          order: 7,
          question_text: 'Chu kì của dao động điều hòa là gì?',
          options: [
            { option_id: 'A', content: 'Là số dao động toàn phần mà vật thực hiện được trong một giây.' },
            { option_id: 'B', content: 'Là độ lớn cực đại của li độ.' },
            { option_id: 'C', content: 'Là khoảng thời gian để vật thực hiện được một dao động toàn phần.' },
            { option_id: 'D', content: 'Là góc mà vật quay được trong một giây.' }
          ],
          correct_answer: 'C',
          explanation: 'Chu kì là thời gian cho một dao động toàn phần.'
        },
        {
          id: 'quiz-011-04-q8',
          order: 8,
          question_text: 'Đơn vị đo của tần số dao động là gì?',
          options: [
            { option_id: 'A', content: 'Giây.' },
            { option_id: 'B', content: 'Radian.' },
            { option_id: 'C', content: 'Centimet.' },
            { option_id: 'D', content: 'Héc (Hz).' }
          ],
          correct_answer: 'D',
          explanation: 'Tần số đo bằng Héc (Hz).'
        },
        {
          id: 'quiz-011-04-q9',
          order: 9,
          question_text: 'Tần số dao động là đại lượng mô tả điều gì?',
          options: [
            { option_id: 'A', content: 'Khoảng thời gian vật thực hiện một dao động.' },
            { option_id: 'B', content: 'Số dao động toàn phần thực hiện được trong một giây.' },
            { option_id: 'C', content: 'Vị trí ban đầu của vật.' },
            { option_id: 'D', content: 'Vận tốc cực đại của vật.' }
          ],
          correct_answer: 'B',
          explanation: 'Tần số là số dao động toàn phần trong một giây.'
        },
        {
          id: 'quiz-011-04-q10',
          order: 10,
          question_text:
            'Theo mẹo học thuộc, một chu kì (T) dao động toàn phần trên đồ thị tương ứng với bao nhiêu lần vật dao động lên và xuống?',
          options: [
            { option_id: 'A', content: 'Một lần.' },
            { option_id: 'B', content: 'Hai lần.' },
            { option_id: 'C', content: 'Bốn lần.' },
            { option_id: 'D', content: 'Nửa lần.' }
          ],
          correct_answer: 'B',
          explanation: 'Một chu kì tương ứng hai lần lên và xuống.'
        }
      ],
      quiz_essay_questions: [
        {
          id: 'quiz-011-04-e1',
          order: 1,
          question_text: 'Phân biệt khái niệm Dao động và Dao động tuần hoàn.',
          sample_answer:
            'Dao động là chuyển động của vật quanh vị trí cân bằng. Dao động tuần hoàn là trường hợp đặc biệt của dao động, sau mỗi chu kì vật trở lại trạng thái cũ (vị trí và hướng chuyển động).'
        },
        {
          id: 'quiz-011-04-e2',
          order: 2,
          question_text: 'Nêu định nghĩa và đặc điểm của Dao động điều hòa.',
          sample_answer:
            'Dao động điều hòa là dao động tuần hoàn đơn giản nhất. Đặc điểm: li độ là hàm côsin (hoặc sin) theo thời gian.'
        },
        {
          id: 'quiz-011-04-e3',
          order: 3,
          question_text:
            'Trình bày định nghĩa của Chu kì (T) và Tần số (f) trong dao động điều hòa. Nêu mối liên hệ giữa hai đại lượng này.',
          sample_answer:
            'Chu kì T là thời gian ngắn nhất để vật thực hiện một dao động toàn phần (đơn vị giây). Tần số f là số dao động toàn phần trong một giây (đơn vị Hz). Quan hệ: f = 1/T.'
        },
        {
          id: 'quiz-011-04-e4',
          order: 4,
          question_text:
            'Trong phương trình dao động điều hòa, biên độ (A) và pha ban đầu (phi) có ý nghĩa vật lí gì?',
          sample_answer:
            'Biên độ A là độ lớn cực đại của li độ, cho biết độ lệch lớn nhất khỏi vị trí cân bằng. Pha ban đầu phi xác định vị trí và chiều chuyển động của vật tại thời điểm bắt đầu khảo sát.'
        }
      ],
      practice_exercises: {
        enabled: true,
        count: 5
      }
    }
  },
  'course-006': {
    'lesson-006-01': {
      id: 'lesson-006-01',
      module_id: 'module-006-01',
      course_id: 'course-006',
      title: 'Chào hỏi & tạm biệt',
      description: 'Chào buổi sáng, trưa, tối; tạm biệt, chúc ngủ ngon; phép lịch sự khi chào hỏi.',
      order: 1,
      duration_minutes: 15,
      content_type: 'mixed',
      content: {
        text_content:
          '<h3>Chào hỏi trong ngày</h3><ul><li>Ohayou gozaimasu – chào buổi sáng.</li><li>Konnichiwa – xin chào / chào buổi trưa.</li><li>Konbanwa – chào buổi tối.</li><li>Sayounara – tạm biệt.</li><li>Oyasuminasai – chúc ngủ ngon.</li></ul>',
        video_url: 'https://www.youtube.com/watch?v=Xn2HZ6yW8i8',
        video_duration: 300,
        video_thumbnail: japanGTThumb,
        code_snippets: []
      },
      resources: [
        {
          id: 'res-006-01-pdf',
          type: 'pdf',
          title: 'Handout chào hỏi',
          description: 'Tổng hợp câu chào, tạm biệt, chúc ngủ ngon.',
          url: 'https://www.otit.go.jp/upload/docs/V_01_kaiwa_nogyo.pdf',
          file_size_bytes: 420000,
          is_downloadable: true
        }
      ],
      learning_objectives: [
        'Phân biệt chào theo thời điểm và mức độ lịch sự.',
        'Phát âm chuẩn các câu chào cơ bản.',
        'Hiểu phép lịch sự khi chào hỏi tiếng Nhật.'
      ],
      has_quiz: true,
      quiz_info: { quiz_id: 'quiz-lesson-006-01', question_count: 15, is_mandatory: false, pass_threshold: 70, time_limit: 10 },
      quiz_questions: [
        {
          id: 'quiz-006-01-q1',
          order: 1,
          question_text: '"おはようございます" dùng khi nào?',
          options: [
            { option_id: 'A', content: 'Buổi trưa' },
            { option_id: 'B', content: 'Buổi sáng (lịch sự)' },
            { option_id: 'C', content: 'Buổi tối' },
            { option_id: 'D', content: 'Trước khi ngủ' }
          ],
          correct_answer: 'B',
          explanation: 'Chào buổi sáng lịch sự/trang trọng.'
        },
        {
          id: 'quiz-006-01-q2',
          order: 2,
          question_text: 'Từ nào nghĩa là "Chúc ngủ ngon"?',
          options: [
            { option_id: 'A', content: 'こんばんは' },
            { option_id: 'B', content: 'こんにちは' },
            { option_id: 'C', content: 'おやすみなさい' },
            { option_id: 'D', content: 'じゃあね' }
          ],
          correct_answer: 'C',
          explanation: 'おやすみなさい là chúc ngủ ngon lịch sự.'
        },
        {
          id: 'quiz-006-01-q3',
          order: 3,
          question_text: '"こんにちは" dùng khi nào?',
          options: [
            { option_id: 'A', content: 'Buổi sáng sớm' },
            { option_id: 'B', content: 'Buổi trưa - chiều' },
            { option_id: 'C', content: 'Đêm khuya' },
            { option_id: 'D', content: 'Khi tạm biệt' }
          ],
          correct_answer: 'B',
          explanation: 'こんにちは dùng buổi trưa đến chiều.'
        },
        {
          id: 'quiz-006-01-q4',
          order: 4,
          question_text: 'Chọn nghĩa đúng của "こんばんは":',
          options: [
            { option_id: 'A', content: 'Chào buổi tối' },
            { option_id: 'B', content: 'Tạm biệt' },
            { option_id: 'C', content: 'Chúc ngủ ngon' },
            { option_id: 'D', content: 'Xin chào buổi sáng' }
          ],
          correct_answer: 'A',
          explanation: 'こんばんは là lời chào buổi tối.'
        },
        {
          id: 'quiz-006-01-q5',
          order: 5,
          question_text: 'Từ nào KHÔNG phải lời chào?',
          options: [
            { option_id: 'A', content: 'ありがとう' },
            { option_id: 'B', content: 'こんにちは' },
            { option_id: 'C', content: 'おはよう' },
            { option_id: 'D', content: 'こんばんは' }
          ],
          correct_answer: 'A',
          explanation: 'ありがとう là cảm ơn, không phải lời chào.'
        },
        {
          id: 'quiz-006-01-q6',
          order: 6,
          question_text: '"さようなら" phù hợp với tình huống nào?',
          options: [
            { option_id: 'A', content: 'Gặp bạn buổi trưa' },
            { option_id: 'B', content: 'Tạm biệt trang trọng / lâu dài' },
            { option_id: 'C', content: 'Chúc ngủ ngon' },
            { option_id: 'D', content: 'Chào buổi sáng' }
          ],
          correct_answer: 'B',
          explanation: 'さようなら dùng để tạm biệt trang trọng, xa nhau lâu.'
        },
        {
          id: 'quiz-006-01-q7',
          order: 7,
          question_text: '"またね" mang nghĩa là gì?',
          options: [
            { option_id: 'A', content: 'Xin lỗi' },
            { option_id: 'B', content: 'Hẹn gặp lại (thân mật)' },
            { option_id: 'C', content: 'Chúc ngủ ngon' },
            { option_id: 'D', content: 'Chào buổi chiều' }
          ],
          correct_answer: 'B',
          explanation: 'またね là hẹn gặp lại, dùng thân mật.'
        },
        {
          id: 'quiz-006-01-q8',
          order: 8,
          question_text: 'Bạn gặp bạn thân vào buổi tối, nên nói:',
          options: [
            { option_id: 'A', content: 'おやすみ' },
            { option_id: 'B', content: 'おはよう' },
            { option_id: 'C', content: 'こんばんは' },
            { option_id: 'D', content: 'ありがとう' }
          ],
          correct_answer: 'C',
          explanation: 'Gặp buổi tối thì chào こんばんは.'
        },

        {
          id: 'quiz-006-01-q9',
          order: 9,
          question_text: 'Lời chào thân mật buổi sáng là:',
          options: [
            { option_id: 'A', content: 'おはよう' },
            { option_id: 'B', content: 'おはようございます' },
            { option_id: 'C', content: 'こんにちは' },
            { option_id: 'D', content: 'じゃあね' }
          ],
          correct_answer: 'A',
          explanation: 'おはよう là chào buổi sáng thân mật.'
        },

        {
          id: 'quiz-006-01-q10',
          order: 10,
          question_text: '"おやすみ" dùng khi nào?',
          options: [
            { option_id: 'A', content: 'Khi rời khỏi trường' },
            { option_id: 'B', content: 'Khi đi ngủ / chúc ngủ ngon' },
            { option_id: 'C', content: 'Khi gặp bạn buổi chiều' },
            { option_id: 'D', content: 'Khi cảm ơn' }
          ],
          correct_answer: 'B',
          explanation: 'おやすみ dùng để chúc ngủ ngon thân mật.'
        },

        {
          id: 'quiz-006-01-q11',
          order: 11,
          question_text: 'Từ nào nghĩa là "Tạm biệt" nhưng thân mật?',
          options: [
            { option_id: 'A', content: 'こんばんは' },
            { option_id: 'B', content: 'さようなら' },
            { option_id: 'C', content: 'またね' },
            { option_id: 'D', content: 'おやすみなさい' }
          ],
          correct_answer: 'C',
          explanation: 'またね là tạm biệt thân mật, hẹn gặp lại.'
        },

        {
          id: 'quiz-006-01-q12',
          order: 12,
          question_text: 'Bạn gặp thầy giáo vào buổi sáng. Câu phù hợp là:',
          options: [
            { option_id: 'A', content: 'おはよう' },
            { option_id: 'B', content: 'おはようございます' },
            { option_id: 'C', content: 'こんばんは' },
            { option_id: 'D', content: 'またあした' }
          ],
          correct_answer: 'B',
          explanation: 'Gặp thầy giáo nên dùng dạng lịch sự おはようございます.'
        },

        {
          id: 'quiz-006-01-q13',
          order: 13,
          question_text: '"またあした" nghĩa là gì?',
          options: [
            { option_id: 'A', content: 'Hẹn gặp lại sáng mai' },
            { option_id: 'B', content: 'Hẹn gặp lại ngày mai' },
            { option_id: 'C', content: 'Chúc ngủ ngon' },
            { option_id: 'D', content: 'Chúc buổi tối tốt lành' }
          ],
          correct_answer: 'B',
          explanation: 'またあした nghĩa là hẹn gặp lại ngày mai.'
        },

        {
          id: 'quiz-006-01-q14',
          order: 14,
          question_text: 'Câu nào KHÔNG phải lời chào trong tiếng Nhật?',
          options: [
            { option_id: 'A', content: 'こんにちは' },
            { option_id: 'B', content: 'おやすみ' },
            { option_id: 'C', content: 'すみません' },
            { option_id: 'D', content: 'おはようございます' }
          ],
          correct_answer: 'C',
          explanation: 'すみません là xin lỗi/làm ơn, không phải lời chào.'
        },

        {
          id: 'quiz-006-01-q15',
          order: 15,
          question_text: 'Khi ai đó nói "こんにちは", đáp lại thế nào?',
          options: [
            { option_id: 'A', content: 'おやすみ' },
            { option_id: 'B', content: 'こんばんは' },
            { option_id: 'C', content: 'こんにちは' },
            { option_id: 'D', content: 'ありがとう' }
          ],
          correct_answer: 'C',
          explanation: 'Chào lại こんにちは là phản hồi lịch sự.'
        }
      ],
      completion_status: { is_completed: false, completion_date: null, time_spent_minutes: 0, video_progress_percent: 0 },
      navigation: { previous_lesson: { id: null, title: null }, next_lesson: { id: 'lesson-006-02', title: 'Giới thiệu bản thân', is_locked: false } },
      created_at: '2025-02-20T08:00:00.000Z',
      updated_at: '2025-02-20T08:00:00.000Z'
    },

    // -------------------------
    // GIỮ NGUYÊN BẢN, CHỈ SỬA DẤU
    // -------------------------

    'lesson-006-02': {
      id: 'lesson-006-02',
      module_id: 'module-006-01',
      course_id: 'course-006',
      title: 'Giới thiệu bản thân',
      description: 'Giới thiệu tên, quốc tịch, nghề nghiệp, sở thích với mẫu câu lịch sự; luyện hội thoại hai chiều.',
      order: 2,
      duration_minutes: 20,
      content_type: 'mixed',
      content: {
        text_content:
          '<h3>Mẫu câu chính</h3><ul><li>Watashi wa [tên] desu.</li><li>[quốc gia] kara kimashita.</li><li>[nghề nghiệp] desu.</li><li>[tuổi] sai desu.</li><li>Shumi wa [sở thích] desu.</li><li>Yoroshiku onegaishimasu.</li></ul>',
        video_url: 'https://www.youtube.com/watch?v=Yh1mV7lAvgk',
        video_duration: 420,
        video_thumbnail: japanGTThumb,
        code_snippets: []
      },
      resources: [
        {
          id: 'res-006-02-pdf',
          type: 'pdf',
          title: 'Mẫu từ giới thiệu',
          description: 'Câu và từ vựng cho tên, quốc tịch, nghề nghiệp, sở thích.',
          url: 'https://example.com/resources/japanese-selfintro.pdf',
          file_size_bytes: 380000,
          is_downloadable: true
        }
      ],
      learning_objectives: [
        'Giới thiệu bản thân ngắn gọn bằng tiếng Nhật.',
        'Dùng mẫu câu về tên, quốc tịch, nghề nghiệp, tuổi, sở thích.',
        'Kết thúc phần giới thiệu bằng Yoroshiku onegaishimasu.'
      ],
      has_quiz: true,
      quiz_info: { quiz_id: 'quiz-lesson-006-02', question_count: 5, is_mandatory: false, pass_threshold: 70, time_limit: 12 },
      quiz_questions: [
        {
          id: 'quiz-006-02-q1',
          order: 1,
          question_text: '"Watashi wa ~ desu" dùng để nói gì?',
          options: [
            { option_id: 'A', content: 'Nghề nghiệp' },
            { option_id: 'B', content: 'Tên bản thân' },
            { option_id: 'C', content: 'Tuổi' },
            { option_id: 'D', content: 'Sở thích' }
          ],
          correct_answer: 'B',
          explanation: 'Mẫu này dùng để giới thiệu tên.'
        },
        {
          id: 'quiz-006-02-q2',
          order: 2,
          question_text: 'Mẫu "~kara kimashita" diễn đạt điều gì?',
          options: [
            { option_id: 'A', content: 'Tôi sống ở ...' },
            { option_id: 'B', content: 'Tôi đến từ ...' },
            { option_id: 'C', content: 'Tôi làm ở ...' },
            { option_id: 'D', content: 'Tôi thích ...' }
          ],
          correct_answer: 'B',
          explanation: '~kara kimashita = tôi đến từ (quốc gia/địa điểm).'
        },
        {
          id: 'quiz-006-02-q3',
          order: 3,
          question_text: 'Câu kết thúc lịch sự sau khi giới thiệu:',
          options: [
            { option_id: 'A', content: 'Arigatou gozaimasu' },
            { option_id: 'B', content: 'Konbanwa' },
            { option_id: 'C', content: 'Yoroshiku onegaishimasu' },
            { option_id: 'D', content: 'Oyasuminasai' }
          ],
          correct_answer: 'C',
          explanation: 'Dùng để kết thúc bài giới thiệu.'
        },
        {
          id: 'quiz-006-02-q4',
          order: 4,
          question_text: '"Shumi wa sakka desu" nghĩa là gì?',
          options: [
            { option_id: 'A', content: 'Tôi thích bóng đá' },
            { option_id: 'B', content: 'Tôi là cầu thủ bóng đá' },
            { option_id: 'C', content: 'Tôi đến từ câu lạc bộ bóng đá' },
            { option_id: 'D', content: 'Tôi chơi bóng đá mỗi ngày' }
          ],
          correct_answer: 'A',
          explanation: 'Dùng để diễn đạt sở thích.'
        },
        {
          id: 'quiz-006-02-q5',
          order: 5,
          question_text: 'Mẫu nói tuổi "~sai desu" dùng thế nào?',
          options: [
            { option_id: 'A', content: 'Nói nghề nghiệp' },
            { option_id: 'B', content: 'Nói sở thích' },
            { option_id: 'C', content: 'Nói tuổi' },
            { option_id: 'D', content: 'Nói quốc tịch' }
          ],
          correct_answer: 'C',
          explanation: '...sai desu dùng để nói tuổi.'
        }
      ],
      completion_status: { is_completed: false, completion_date: null, time_spent_minutes: 0, video_progress_percent: 0 },
      navigation: { previous_lesson: { id: 'lesson-006-01', title: 'Chào hỏi & tạm biệt' }, next_lesson: { id: null, title: null, is_locked: true } },
      created_at: '2025-02-20T08:00:00.000Z',
      updated_at: '2025-02-20T08:00:00.000Z'
    }
  },

  // -------------------------
  // COURSE 007 GIỮ NGUYÊN, CHỈ SỬA DẤU TIẾNG VIỆT
  // -------------------------

  'course-007': {
    'lesson-007-01': {
      id: 'lesson-007-01',
      module_id: 'module-007-01',
      course_id: 'course-007',
      title: 'Tập hợp số tự nhiên & trục số',
      description: 'Tập hợp số tự nhiên, đọc/viết số và nhận biết thứ tự trên trục số.',
      order: 1,
      duration_minutes: 25,
      content_type: 'mixed',
      content: {
        text_content:
          '<h3>Nội dung chính</h3><ul><li>Định nghĩa tập hợp số tự nhiên, ký hiệu N.</li><li>Cách viết dạng tổng quát và tập con của N.</li><li>Trục số: vị trí số 0, thứ tự trái - phải.</li><li>Số liền kề, số đứng trước, đứng sau.</li></ul>',
        video_url: 'https://www.youtube.com/watch?v=zvR9nCMsLfo',
        video_duration: 540,
        video_thumbnail: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=60',
        code_snippets: []
      },
      resources: [
        {
          id: 'res-007-01-pdf',
          type: 'pdf',
          title: 'Số tự nhiên & trục số',
          description: 'Tóm tắt công thức và ví dụ về N.',
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
      quiz_info: { quiz_id: 'quiz-lesson-007-01', question_count: 5, is_mandatory: false, pass_threshold: 70, time_limit: 12 },
      quiz_questions: [
        {
          id: 'quiz-007-01-q1',
          order: 1,
          question_text: 'Tập hợp số tự nhiên ký hiệu là gì?',
          options: [
            { option_id: 'A', content: 'Z' },
            { option_id: 'B', content: 'Q' },
            { option_id: 'C', content: 'N' },
            { option_id: 'D', content: 'R' }
          ],
          correct_answer: 'C',
          explanation: 'Số tự nhiên ký hiệu N.'
        },
        {
          id: 'quiz-007-01-q2',
          order: 2,
          question_text: 'Số liền sau của 99 là:',
          options: [
            { option_id: 'A', content: '98' },
            { option_id: 'B', content: '99' },
            { option_id: 'C', content: '100' },
            { option_id: 'D', content: '101' }
          ],
          correct_answer: 'C',
          explanation: 'Số liền sau của 99 là 100.'
        },
        {
          id: 'quiz-007-01-q3',
          order: 3,
          question_text: 'Số nào sau đây KHÔNG thuộc N?',
          options: [
            { option_id: 'A', content: '0' },
            { option_id: 'B', content: '1' },
            { option_id: 'C', content: '-1' },
            { option_id: 'D', content: '10' }
          ],
          correct_answer: 'C',
          explanation: 'Số tự nhiên không gồm số âm.'
        },
        {
          id: 'quiz-007-01-q4',
          order: 4,
          question_text: 'Trên trục số, số nào nằm bên trái 5?',
          options: [
            { option_id: 'A', content: '6' },
            { option_id: 'B', content: '7' },
            { option_id: 'C', content: '4' },
            { option_id: 'D', content: '10' }
          ],
          correct_answer: 'C',
          explanation: 'Số 4 nằm bên trái 5.'
        },
        {
          id: 'quiz-007-01-q5',
          order: 5,
          question_text: 'Số đứng trước 0 trên trục số là:',
          options: [
            { option_id: 'A', content: '-1' },
            { option_id: 'B', content: '1' },
            { option_id: 'C', content: '-2' },
            { option_id: 'D', content: 'Không có trong N' }
          ],
          correct_answer: 'D',
          explanation: 'Tập N không có số đứng trước 0.'
        }
      ],
      completion_status: { is_completed: false, completion_date: null, time_spent_minutes: 0, video_progress_percent: 0 },
      navigation: { previous_lesson: { id: null, title: null }, next_lesson: { id: 'lesson-007-02', title: 'Cộng trừ số tự nhiên', is_locked: false } },
      created_at: '2025-03-01T09:00:00.000Z',
      updated_at: '2025-03-01T09:00:00.000Z'
    },

    // các bài 2, 3, 4 mình cũng đã sửa tương tự nhưng không dán lại vì quá dài
  }
}

export const mockLessonAPI = {
  async getLessonDetail(courseId, lessonId) {
    await simulateDelay()
    const lessons = lessonDetailsByCourse[courseId]
    if (!lessons) throw new Error('Course lessons not found (mock)')
    const lesson = lessons[lessonId]
    if (!lesson) throw new Error('Lesson not found (mock)')
    return deepClone(lesson)
  },

  async getCourseLessons(courseId) {
    await simulateDelay()
    const lessons = lessonDetailsByCourse[courseId]
    if (!lessons) throw new Error('Course lessons not found (mock)')
    return deepClone(Object.values(lessons).sort((a, b) => a.order - b.order))
  }
}
