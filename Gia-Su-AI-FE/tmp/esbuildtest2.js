// src/mocks/mockCourseDetails.js
import japanGTThumb from "@/img/JapanGT.png";
import math6Thumb from "@/img/Math6.png";
var simulateDelay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));
var deepClone = (data) => JSON.parse(JSON.stringify(data));
var courseDetailsById = {
  "course-006": {
    id: "course-006",
    title: "Tieng Nhat Giao Tiep (Japanese Communication Course)",
    description: "Khoa giao tiep giup luyen nghe \u2013 noi co ban: chao hoi, gioi thieu ban than va giao tiep hang ngay.",
    category: "Language Learning",
    subcategory: "Japanese",
    level: "Beginner",
    thumbnail_url: japanGTThumb,
    preview_video_url: null,
    language: "vi-ja",
    status: "published",
    owner_info: {
      id: "instr-006",
      name: "Yamada Kenji",
      avatar_url: null,
      bio: "Giang vien tieng Nhat, 8 nam kinh nghiem day giao tiep cho nguoi Viet.",
      experience_years: 8
    },
    learning_outcomes: [
      { description: "Chao hoi, gioi thieu, cam on, xin loi trong cac tinh huong co ban.", skill_tag: "Conversation" },
      { description: "Phat am chuan va phan xa nghe \u2013 noi nhanh.", skill_tag: "Speaking & Listening" },
      { description: "Hieu phep lich su va van hoa giao tiep tieng Nhat.", skill_tag: "Culture" }
    ],
    prerequisites: [
      "Khong yeu cau trinh do tieng Nhat truoc do.",
      "Thiet bi nghe/nhin va co the ghi am giong noi.",
      "Khuyen khich dung tai nghe khi luyen nghe \u2013 noi."
    ],
    modules: [
      {
        id: "module-006-01",
        title: "Chao hoi va gioi thieu ban than",
        description: "Mau cau chao hoi, tam biet, gioi thieu co ban.",
        difficulty: "Basic",
        estimated_hours: 1.5,
        lessons: [
          { id: "lesson-006-01", title: "Chao hoi & tam biet", order: 1, duration_minutes: 15, content_type: "video", is_completed: false },
          { id: "lesson-006-02", title: "Gioi thieu ban than", order: 2, duration_minutes: 20, content_type: "video", is_completed: false }
        ]
      }
    ],
    course_statistics: { total_modules: 1, total_lessons: 2, total_duration_minutes: 35, enrollment_count: 0, completion_rate: 0, avg_rating: 4.7 },
    enrollment_info: { is_enrolled: false, enrollment_id: null, enrolled_at: null, progress_percent: null, can_access_content: false },
    created_at: "2025-02-20T08:00:00.000Z",
    updated_at: "2025-02-20T08:00:00.000Z"
  },
  "course-007": {
    id: "course-007",
    title: "Toan 6 - So tu nhien",
    description: "Mo-dun dau tien chuong trinh Toan 6: tap hop so tu nhien, phep tinh co ban, uoc boi, UCLN va BCNN.",
    category: "Math",
    subcategory: "Lop 6",
    level: "Beginner",
    thumbnail_url: math6Thumb,
    preview_video_url: null,
    language: "vi",
    status: "published",
    owner_info: {
      id: "instr-007",
      name: "Co Mai Anh",
      avatar_url: null,
      bio: "Giao vien Toan THCS, hon 10 nam giang day va bien soan tai lieu Toan lop 6.",
      experience_years: 10
    },
    learning_outcomes: [
      { description: "Bieu dien tap hop, doc viet so tu nhien, su dung truc so.", skill_tag: "So tu nhien" },
      { description: "Thuc hien cong, tru, nhan, chia, luy thua voi so mu tu nhien.", skill_tag: "Phep tinh co ban" },
      { description: "Van dung dau hieu chia het, tim uoc boi, UCLN va BCNN.", skill_tag: "Uoc - Boi" }
    ],
    prerequisites: ["Kien thuc Toan lop 5 co ban"],
    modules: [
      {
        id: "module-007-01",
        title: "So tu nhien",
        description: "Gioi thieu ve so tu nhien, phep tinh co ban va uoc boi.",
        difficulty: "Basic",
        estimated_hours: 5,
        lessons: [
          { id: "lesson-007-01", title: "Tap hop so tu nhien & truc so", order: 1, duration_minutes: 25, content_type: "video", is_completed: false },
          { id: "lesson-007-02", title: "Cong tru so tu nhien", order: 2, duration_minutes: 25, content_type: "video", is_completed: false },
          { id: "lesson-007-03", title: "Nhan, chia va luy thua", order: 3, duration_minutes: 30, content_type: "mixed", is_completed: false },
          { id: "lesson-007-04", title: "Uoc, boi, UCLN & BCNN", order: 4, duration_minutes: 30, content_type: "quiz", is_completed: false }
        ]
      }
    ],
    course_statistics: { total_modules: 1, total_lessons: 4, total_duration_minutes: 110, enrollment_count: 0, completion_rate: 0, avg_rating: 4.8 },
    enrollment_info: { is_enrolled: false, enrollment_id: null, enrolled_at: null, progress_percent: null, can_access_content: false },
    created_at: "2025-03-01T09:00:00.000Z",
    updated_at: "2025-03-01T09:00:00.000Z"
  }
};
var mockCourseDetailsAPI = {
  async fetchCourseDetail(courseId) {
    await simulateDelay();
    const detail = courseDetailsById[courseId];
    if (!detail) throw new Error("Course not found (mock)");
    return deepClone(detail);
  }
};
export {
  courseDetailsById,
  mockCourseDetailsAPI
};
