// src/mocks/mockLessonDetails.js
import japanGTThumb from "@/img/JapanGT.png";
var simulateDelay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));
var deepClone = (data) => JSON.parse(JSON.stringify(data));
var lessonDetailsByCourse = {
  "course-006": {
    "lesson-006-01": {
      id: "lesson-006-01",
      module_id: "module-006-01",
      course_id: "course-006",
      title: "Chao hoi & tam biet",
      description: "Chao buoi sang, trua, toi; tam biet, chuc ngu ngon; phap lich su khi chao hoi.",
      order: 1,
      duration_minutes: 15,
      content_type: "mixed",
      content: {
        text_content: "<h3>Chao hoi trong ngay</h3><ul><li>Ohayou gozaimasu \u2013 chao buoi sang.</li><li>Konnichiwa \u2013 xin chao / chao buoi trua.</li><li>Konbanwa \u2013 chao buoi toi.</li><li>Sayounara \u2013 tam biet.</li><li>Oyasuminasai \u2013 chuc ngu ngon.</li></ul>",
        video_url: "https://www.youtube.com/watch?v=Xn2HZ6yW8i8",
        video_duration: 300,
        video_thumbnail: japanGTThumb,
        code_snippets: []
      },
      resources: [
        {
          id: "res-006-01-pdf",
          type: "pdf",
          title: "Handout chao hoi",
          description: "Tong hop cau chao, tam biet, chuc ngu ngon.",
          url: "https://example.com/resources/jp-greeting-handout.pdf",
          file_size_bytes: 42e4,
          is_downloadable: true
        }
      ],
      learning_objectives: [
        "Phan biet chao theo thoi diem va muc do lich su.",
        "Phat am chuan cac cau chao co ban.",
        "Hieu phap lich su khi chao hoi tieng Nhat."
      ],
      has_quiz: true,
      quiz_info: { quiz_id: "quiz-lesson-006-01", question_count: 5, is_mandatory: false, pass_threshold: 70, time_limit: 10 },
      quiz_questions: [
        {
          id: "quiz-006-01-q1",
          order: 1,
          question_text: "Ohayou gozaimasu dung khi nao?",
          options: [
            { option_id: "A", content: "Buoi trua" },
            { option_id: "B", content: "Buoi sang (lich su)" },
            { option_id: "C", content: "Buoi toi" },
            { option_id: "D", content: "Truoc khi ngu" }
          ],
          correct_answer: "B",
          explanation: "Dung buoi sang voi muc do lich su chuan."
        },
        {
          id: "quiz-006-01-q2",
          order: 2,
          question_text: "Tu nao nghia la chuc ngu ngon?",
          options: [
            { option_id: "A", content: "Konbanwa" },
            { option_id: "B", content: "Konnichiwa" },
            { option_id: "C", content: "Oyasuminasai" },
            { option_id: "D", content: "Jaa ne" }
          ],
          correct_answer: "C",
          explanation: "Oyasuminasai dung khi chuc ngu ngon."
        },
        {
          id: "quiz-006-01-q3",
          order: 3,
          question_text: "Konnichiwa dung khi nao?",
          options: [
            { option_id: "A", content: "Buoi sang som" },
            { option_id: "B", content: "Buoi trua \u2013 chieu" },
            { option_id: "C", content: "Dem khuya" },
            { option_id: "D", content: "Khi tam biet" }
          ],
          correct_answer: "B",
          explanation: "Konnichiwa la loi chao trung lap tu giua sang toi chieu."
        },
        {
          id: "quiz-006-01-q4",
          order: 4,
          question_text: "Sayounara phu hop tinh huong nao?",
          options: [
            { option_id: "A", content: "Gap ban buoi trua" },
            { option_id: "B", content: "Tam biet trang trong / lau" },
            { option_id: "C", content: "Chuc ngu ngon" },
            { option_id: "D", content: "Chao buoi sang" }
          ],
          correct_answer: "B",
          explanation: "Sayounara la tam biet trang trong khi xa lau."
        },
        {
          id: "quiz-006-01-q5",
          order: 5,
          question_text: "Loi chao than mat buoi sang la:",
          options: [
            { option_id: "A", content: "Ohayou" },
            { option_id: "B", content: "Ohayou gozaimasu" },
            { option_id: "C", content: "Konbanwa" },
            { option_id: "D", content: "Arigatou" }
          ],
          correct_answer: "A",
          explanation: "Ohayou la phien ban than mat buoi sang."
        }
      ],
      completion_status: { is_completed: false, completion_date: null, time_spent_minutes: 0, video_progress_percent: 0 },
      navigation: { previous_lesson: { id: null, title: null }, next_lesson: { id: "lesson-006-02", title: "Gioi thieu ban than", is_locked: false } },
      created_at: "2025-02-20T08:00:00.000Z",
      updated_at: "2025-02-20T08:00:00.000Z"
    },
    "lesson-006-02": {
      id: "lesson-006-02",
      module_id: "module-006-01",
      course_id: "course-006",
      title: "Gioi thieu ban than",
      description: "Gioi thieu ten, quoc tich, nghe nghiep, so thich voi mau cau lich su; luyen hoi thoai hai chieu.",
      order: 2,
      duration_minutes: 20,
      content_type: "mixed",
      content: {
        text_content: "<h3>Mau cau chinh</h3><ul><li>Watashi wa [ten] desu.</li><li>[quoc gia] kara kimashita.</li><li>[nghe nghiep] desu.</li><li>[tuoi] sai desu.</li><li>Shumi wa [so thich] desu.</li><li>Yoroshiku onegaishimasu.</li></ul>",
        video_url: "https://www.youtube.com/watch?v=Yh1mV7lAvgk",
        video_duration: 420,
        video_thumbnail: japanGTThumb,
        code_snippets: []
      },
      resources: [
        { id: "res-006-02-pdf", type: "pdf", title: "Mau tu gioi thieu", description: "Cau va tu vung cho ten, quoc tich, nghe nghiep, so thich.", url: "https://example.com/resources/japanese-selfintro.pdf", file_size_bytes: 38e4, is_downloadable: true }
      ],
      learning_objectives: [
        "Gioi thieu ban than ngan gon bang tieng Nhat.",
        "Dung mau cau ve ten, quoc tich, nghe nghiep, tuoi, so thich.",
        "Ket thuc phan gioi thieu bang Yoroshiku onegaishimasu."
      ],
      has_quiz: true,
      quiz_info: { quiz_id: "quiz-lesson-006-02", question_count: 5, is_mandatory: false, pass_threshold: 70, time_limit: 12 },
      quiz_questions: [
        { id: "quiz-006-02-q1", order: 1, question_text: '"Watashi wa ~ desu" dung de noi gi?', options: [
          { option_id: "A", content: "Nghe nghiep" },
          { option_id: "B", content: "Ten ban than" },
          { option_id: "C", content: "Tuoi" },
          { option_id: "D", content: "So thich" }
        ], correct_answer: "B", explanation: "Mau nay gioi thieu ten/ban than." },
        { id: "quiz-006-02-q2", order: 2, question_text: 'Mau "~kara kimashita" dien dat dieu gi?', options: [
          { option_id: "A", content: "Toi song o ..." },
          { option_id: "B", content: "Toi den tu ..." },
          { option_id: "C", content: "Toi lam o ..." },
          { option_id: "D", content: "Toi thich ..." }
        ], correct_answer: "B", explanation: "...kara kimashita = toi den tu (quoc gia/dia diem)." },
        { id: "quiz-006-02-q3", order: 3, question_text: "Cau ket thuc lich su sau khi gioi thieu:", options: [
          { option_id: "A", content: "Arigatou gozaimasu" },
          { option_id: "B", content: "Konbanwa" },
          { option_id: "C", content: "Yoroshiku onegaishimasu" },
          { option_id: "D", content: "Oyasuminasai" }
        ], correct_answer: "C", explanation: "Yoroshiku onegaishimasu dung de ket thuc phan gioi thieu." },
        { id: "quiz-006-02-q4", order: 4, question_text: '"Shumi wa sakka desu" nghia la gi?', options: [
          { option_id: "A", content: "Toi thich bong da" },
          { option_id: "B", content: "Toi la cau thu" },
          { option_id: "C", content: "Toi den tu CLB bong da" },
          { option_id: "D", content: "Toi choi bong da moi ngay" }
        ], correct_answer: "A", explanation: "Cau dien dat so thich." },
        { id: "quiz-006-02-q5", order: 5, question_text: 'Mau noi tuoi "~sai desu" dung the nao?', options: [
          { option_id: "A", content: "Noi nghe nghiep" },
          { option_id: "B", content: "Noi so thich" },
          { option_id: "C", content: "Noi tuoi" },
          { option_id: "D", content: "Noi quoc tich" }
        ], correct_answer: "C", explanation: "...sai desu dung de noi tuoi." }
      ],
      completion_status: { is_completed: false, completion_date: null, time_spent_minutes: 0, video_progress_percent: 0 },
      navigation: { previous_lesson: { id: "lesson-006-01", title: "Chao hoi & tam biet" }, next_lesson: { id: null, title: null, is_locked: true } },
      created_at: "2025-02-20T08:00:00.000Z",
      updated_at: "2025-02-20T08:00:00.000Z"
    }
  },
  "course-007": {
    "lesson-007-01": {
      id: "lesson-007-01",
      module_id: "module-007-01",
      course_id: "course-007",
      title: "Tap hop so tu nhien & truc so",
      description: "Tap hop so tu nhien, doc/viet so va nhan biet thu tu tren truc so.",
      order: 1,
      duration_minutes: 25,
      content_type: "mixed",
      content: {
        text_content: "<h3>Noi dung chinh</h3><ul><li>Dinh nghia tap hop so tu nhien, ky hieu N.</li><li>Cach viet dang tong quat va tap con cua N.</li><li>Truc so: vi tri so 0, thu tu trai - phai.</li><li>So lien ke, so dung truoc, dung sau.</li></ul>",
        video_url: "https://www.youtube.com/watch?v=zvR9nCMsLfo",
        video_duration: 540,
        video_thumbnail: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=60",
        code_snippets: []
      },
      resources: [
        { id: "res-007-01-pdf", type: "pdf", title: "So tu nhien & truc so", description: "Tom tat cong thuc va vi du ve N.", url: "https://example.com/resources/math6-natural-number-handout.pdf", file_size_bytes: 42e4, is_downloadable: true }
      ],
      learning_objectives: [
        "Nhan dang va viet duoc tap hop so tu nhien, so lien ke.",
        "Dat duoc so tren truc so, so sanh thu tu ben trai/ben phai.",
        "Viet duoc dang tong quat cua tap hop con cua N."
      ],
      has_quiz: true,
      quiz_info: { quiz_id: "quiz-lesson-007-01", question_count: 5, is_mandatory: false, pass_threshold: 70, time_limit: 12 },
      quiz_questions: [
        { id: "quiz-007-01-q1", order: 1, question_text: "Tap hop so tu nhien ky hieu la gi?", options: [
          { option_id: "A", content: "Z" },
          { option_id: "B", content: "Q" },
          { option_id: "C", content: "N" },
          { option_id: "D", content: "R" }
        ], correct_answer: "C", explanation: "So tu nhien ky hieu N." },
        { id: "quiz-007-01-q2", order: 2, question_text: "So lien sau cua 99 la:", options: [
          { option_id: "A", content: "98" },
          { option_id: "B", content: "99" },
          { option_id: "C", content: "100" },
          { option_id: "D", content: "101" }
        ], correct_answer: "C", explanation: "Lien sau 99 la 100." },
        { id: "quiz-007-01-q3", order: 3, question_text: "So nao sau day KHONG thuoc N?", options: [
          { option_id: "A", content: "0" },
          { option_id: "B", content: "1" },
          { option_id: "C", content: "-1" },
          { option_id: "D", content: "10" }
        ], correct_answer: "C", explanation: "So tu nhien khong bao gom so am." },
        { id: "quiz-007-01-q4", order: 4, question_text: "Tren truc so, so nao nam ben trai 5?", options: [
          { option_id: "A", content: "6" },
          { option_id: "B", content: "7" },
          { option_id: "C", content: "4" },
          { option_id: "D", content: "10" }
        ], correct_answer: "C", explanation: "So 4 nam ben trai 5." },
        { id: "quiz-007-01-q5", order: 5, question_text: "So dung truoc 0 tren truc so la:", options: [
          { option_id: "A", content: "-1" },
          { option_id: "B", content: "1" },
          { option_id: "C", content: "-2" },
          { option_id: "D", content: "Khong co trong N" }
        ], correct_answer: "D", explanation: "Tap N khong co so dung truoc 0." }
      ],
      completion_status: { is_completed: false, completion_date: null, time_spent_minutes: 0, video_progress_percent: 0 },
      navigation: { previous_lesson: { id: null, title: null }, next_lesson: { id: "lesson-007-02", title: "Cong tru so tu nhien", is_locked: false } },
      created_at: "2025-03-01T09:00:00.000Z",
      updated_at: "2025-03-01T09:00:00.000Z"
    },
    "lesson-007-02": {
      id: "lesson-007-02",
      module_id: "module-007-01",
      course_id: "course-007",
      title: "Cong tru so tu nhien",
      description: "Tinh chat phep cong, phep tru; dat tinh va kiem tra ket qua.",
      order: 2,
      duration_minutes: 25,
      content_type: "mixed",
      content: { text_content: "<p>Tinh chat giao hoan, ket hop cua phep cong; phep tru khong co giao hoan/ket hop.</p>", video_url: "https://www.youtube.com/watch?v=wJmpflb23uM", video_duration: 600, video_thumbnail: "https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=900&q=60", code_snippets: [] },
      resources: [{ id: "res-007-02-pdf", type: "pdf", title: "Cong tru so tu nhien", description: "Phieu bai tap cong tru.", url: "https://example.com/resources/math6-add-subtract.pdf", file_size_bytes: 36e4, is_downloadable: true }],
      learning_objectives: ["Ap dung giao hoan/ket hop de tinh nhanh", "Dat tinh va tinh chinh xac", "Kiem tra ket qua bang phep tinh nguoc"],
      has_quiz: true,
      quiz_info: { quiz_id: "quiz-lesson-007-02", question_count: 3, is_mandatory: false, pass_threshold: 70, time_limit: 8 },
      quiz_questions: [
        { id: "quiz-007-02-q1", order: 1, question_text: "125 + 375 = ?", options: [{ option_id: "A", content: "490" }, { option_id: "B", content: "500" }, { option_id: "C", content: "505" }, { option_id: "D", content: "510" }], correct_answer: "B", explanation: "125 + 375 = 500." },
        { id: "quiz-007-02-q2", order: 2, question_text: "Phep cong co tinh chat nao?", options: [{ option_id: "A", content: "Giao hoan" }, { option_id: "B", content: "Ket hop" }, { option_id: "C", content: "Ca hai A va B" }, { option_id: "D", content: "Khong co tinh chat" }], correct_answer: "C", explanation: "Phep cong co giao hoan va ket hop." },
        { id: "quiz-007-02-q3", order: 3, question_text: "Hieu 1000 - 478 = ?", options: [{ option_id: "A", content: "522" }, { option_id: "B", content: "532" }, { option_id: "C", content: "542" }, { option_id: "D", content: "552" }], correct_answer: "A", explanation: "1000 - 478 = 522." }
      ],
      completion_status: { is_completed: false, completion_date: null, time_spent_minutes: 0, video_progress_percent: 0 },
      navigation: { previous_lesson: { id: "lesson-007-01", title: "Tap hop so tu nhien & truc so" }, next_lesson: { id: "lesson-007-03", title: "Nhan, chia va luy thua", is_locked: false } },
      created_at: "2025-03-01T09:00:00.000Z",
      updated_at: "2025-03-01T09:00:00.000Z"
    },
    "lesson-007-03": {
      id: "lesson-007-03",
      module_id: "module-007-01",
      course_id: "course-007",
      title: "Nhan, chia va luy thua",
      description: "Tinh chat phep nhan, phep chia; y nghia luy thua.",
      order: 3,
      duration_minutes: 30,
      content_type: "mixed",
      content: { text_content: "<p>Giao hoan, ket hop, phan phoi cua phep nhan; phep chia co du/het; luy thua co so va so mu.</p>", video_url: "https://www.youtube.com/watch?v=tN0JDz8YgXQ", video_duration: 720, video_thumbnail: "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&w=900&q=60", code_snippets: [] },
      resources: [{ id: "res-007-03-pdf", type: "pdf", title: "Nhan chia luy thua", description: "Bai tap ap dung tinh chat nhan, chia, luy thua.", url: "https://example.com/resources/math6-multiplication.pdf", file_size_bytes: 4e5, is_downloadable: true }],
      learning_objectives: ["Van dung tinh chat nhan de tinh nhanh", "Nhan biet phep chia co du/het", "Tinh gia tri luy thua don gian"],
      has_quiz: true,
      quiz_info: { quiz_id: "quiz-lesson-007-03", question_count: 4, is_mandatory: false, pass_threshold: 70, time_limit: 10 },
      quiz_questions: [
        { id: "quiz-007-03-q1", order: 1, question_text: "25 x 4 = ?", options: [{ option_id: "A", content: "80" }, { option_id: "B", content: "90" }, { option_id: "C", content: "100" }, { option_id: "D", content: "110" }], correct_answer: "C", explanation: "25 nhan 4 = 100." },
        { id: "quiz-007-03-q2", order: 2, question_text: "Chia het khi nao?", options: [{ option_id: "A", content: "Du > 0" }, { option_id: "B", content: "Du < b" }, { option_id: "C", content: "Du = 0" }, { option_id: "D", content: "b = 0" }], correct_answer: "C", explanation: "Chia het khi du bang 0." },
        { id: "quiz-007-03-q3", order: 3, question_text: "Gia tri 3^4 = ?", options: [{ option_id: "A", content: "3 + 4" }, { option_id: "B", content: "3 x 4" }, { option_id: "C", content: "81" }, { option_id: "D", content: "12" }], correct_answer: "C", explanation: "3^4 = 81." },
        { id: "quiz-007-03-q4", order: 4, question_text: "Nhan so tu nhien voi 10^n thi:", options: [{ option_id: "A", content: "Them n chu so 0" }, { option_id: "B", content: "Bot n chu so 0" }, { option_id: "C", content: "Khong doi" }, { option_id: "D", content: "Chia cho n" }], correct_answer: "A", explanation: "Nhan 10^n thi them n chu so 0 neu la so nguyen." }
      ],
      completion_status: { is_completed: false, completion_date: null, time_spent_minutes: 0, video_progress_percent: 0 },
      navigation: { previous_lesson: { id: "lesson-007-02", title: "Cong tru so tu nhien" }, next_lesson: { id: "lesson-007-04", title: "Uoc, boi, UCLN & BCNN", is_locked: false } },
      created_at: "2025-03-01T09:00:00.000Z",
      updated_at: "2025-03-01T09:00:00.000Z"
    },
    "lesson-007-04": {
      id: "lesson-007-04",
      module_id: "module-007-01",
      course_id: "course-007",
      title: "Uoc, boi, UCLN & BCNN",
      description: "Dau hieu chia het 2,3,5,9; tim uoc, boi; phan tich thua so nguyen to, tim UCLN, BCNN.",
      order: 4,
      duration_minutes: 30,
      content_type: "mixed",
      content: { text_content: "<p>Dau hieu chia het; tim uoc/boi; phan tich thua so nguyen to; tinh UCLN, BCNN.</p>", video_url: "https://www.youtube.com/watch?v=KsbzG2_yZsQ", video_duration: 780, video_thumbnail: "https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=900&q=60", code_snippets: [] },
      resources: [{ id: "res-007-04-pdf", type: "pdf", title: "Uoc boi, UCLN, BCNN", description: "Bang mau va bai tap UCLN, BCNN.", url: "https://example.com/resources/math6-gcd-lcm.pdf", file_size_bytes: 54e4, is_downloadable: true }],
      learning_objectives: ["Nhan biet dau hieu chia het", "Tim uoc, boi va phan tich thua so", "Tinh UCLN, BCNN tu phan tich thua so"],
      has_quiz: true,
      quiz_info: { quiz_id: "quiz-lesson-007-04", question_count: 3, is_mandatory: false, pass_threshold: 70, time_limit: 10 },
      quiz_questions: [
        { id: "quiz-007-04-q1", order: 1, question_text: "235 chia het cho 5 khong?", options: [{ option_id: "A", content: "Co, vi tan cung la 5" }, { option_id: "B", content: "Khong, vi tan cung la 3" }, { option_id: "C", content: "Khong, vi tong chu so khong chia het cho 9" }, { option_id: "D", content: "Khong, vi khong chia het cho 2" }], correct_answer: "A", explanation: "Tan cung 5 -> chia het cho 5." },
        { id: "quiz-007-04-q2", order: 2, question_text: "Uoc chung lon nhat cua 18 va 24 la:", options: [{ option_id: "A", content: "2" }, { option_id: "B", content: "3" }, { option_id: "C", content: "6" }, { option_id: "D", content: "12" }], correct_answer: "C", explanation: "UCLN(18,24)=6." },
        { id: "quiz-007-04-q3", order: 3, question_text: "BCNN cua 6 va 8 la:", options: [{ option_id: "A", content: "12" }, { option_id: "B", content: "18" }, { option_id: "C", content: "24" }, { option_id: "D", content: "48" }], correct_answer: "C", explanation: "BCNN = 24." }
      ],
      completion_status: { is_completed: false, completion_date: null, time_spent_minutes: 0, video_progress_percent: 0 },
      navigation: { previous_lesson: { id: "lesson-007-03", title: "Nhan, chia va luy thua" }, next_lesson: { id: null, title: null, is_locked: true } },
      created_at: "2025-03-01T09:00:00.000Z",
      updated_at: "2025-03-01T09:00:00.000Z"
    }
  }
};
var mockLessonAPI = {
  async getLessonDetail(courseId, lessonId) {
    await simulateDelay();
    const lessons = lessonDetailsByCourse[courseId];
    if (!lessons) throw new Error("Course lessons not found (mock)");
    const lesson = lessons[lessonId];
    if (!lesson) throw new Error("Lesson not found (mock)");
    return deepClone(lesson);
  },
  async getCourseLessons(courseId) {
    await simulateDelay();
    const lessons = lessonDetailsByCourse[courseId];
    if (!lessons) throw new Error("Course lessons not found (mock)");
    return deepClone(Object.values(lessons).sort((a, b) => a.order - b.order));
  }
};
export {
  lessonDetailsByCourse,
  mockLessonAPI
};
