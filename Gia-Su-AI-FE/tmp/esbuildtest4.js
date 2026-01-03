// src/mocks/mockModuleDetails.js
var simulateDelay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));
var deepClone = (data) => JSON.parse(JSON.stringify(data));
var moduleDetailsByCourse = {
  "course-006": {
    "module-006-01": {
      id: "module-006-01",
      course_id: "course-006",
      title: "Chao hoi va gioi thieu ban than",
      description: "Chao hoi, tam biet, gioi thieu co ban; phap lich su giao tiep.",
      difficulty: "Basic",
      order: 1,
      estimated_hours: 1.5,
      learning_outcomes: [
        "Dung duoc mau chao hoi theo thoi diem trong ngay.",
        "Gioi thieu ban than ngan gon: ten, quoc tich, nghe nghiep.",
        "Thuc hanh phap lich su co ban trong giao tiep tieng Nhat."
      ],
      pass_threshold: 70,
      lessons: [
        {
          id: "lesson-006-01",
          title: "Chao hoi & tam biet",
          order: 1,
          duration_minutes: 15,
          content_type: "video",
          has_quiz: true,
          is_completed: false,
          completion_date: null
        },
        {
          id: "lesson-006-02",
          title: "Gioi thieu ban than",
          order: 2,
          duration_minutes: 20,
          content_type: "video",
          has_quiz: true,
          is_completed: false,
          completion_date: null
        }
      ],
      resources: [
        { id: "res-006-01", title: "Handout chao hoi co ban", type: "pdf", url: "https://example.com/resources/jp-greetings.pdf", is_mandatory: false },
        { id: "res-006-02", title: "Video mau gioi thieu ban than", type: "link", url: "https://www.youtube.com/watch?v=Yh1mV7lAvgk", is_mandatory: false }
      ],
      progress_info: {
        total_lessons: 2,
        completed_lessons: 0,
        progress_percent: 0,
        is_accessible: true
      },
      created_at: "2025-02-20T08:00:00.000Z",
      updated_at: "2025-02-20T08:00:00.000Z"
    }
  },
  "course-007": {
    "module-007-01": {
      id: "module-007-01",
      course_id: "course-007",
      title: "So tu nhien",
      description: "Tap hop so tu nhien, phep cong/tru/nhan/chia, uoc boi va UCLN/BCNN.",
      difficulty: "Basic",
      order: 1,
      estimated_hours: 5,
      learning_outcomes: [
        "Bieu dien tap hop so tu nhien va su dung truc so.",
        "Thuc hien cong, tru, nhan, chia va luy thua co ban.",
        "Van dung dau hieu chia het de tim uoc, boi, UCLN, BCNN."
      ],
      pass_threshold: 70,
      lessons: [
        { id: "lesson-007-01", title: "Tap hop so tu nhien & truc so", order: 1, duration_minutes: 25, content_type: "video", has_quiz: true, is_completed: false, completion_date: null },
        { id: "lesson-007-02", title: "Cong tru so tu nhien", order: 2, duration_minutes: 25, content_type: "video", has_quiz: true, is_completed: false, completion_date: null },
        { id: "lesson-007-03", title: "Nhan, chia va luy thua", order: 3, duration_minutes: 30, content_type: "mixed", has_quiz: true, is_completed: false, completion_date: null },
        { id: "lesson-007-04", title: "Uoc, boi, UCLN & BCNN", order: 4, duration_minutes: 30, content_type: "quiz", has_quiz: true, is_completed: false, completion_date: null }
      ],
      resources: [
        { id: "res-007-01", title: "Handout So tu nhien lop 6", type: "pdf", url: "https://example.com/resources/math6-natural-numbers.pdf", is_mandatory: false },
        { id: "res-007-02", title: "Video on tap phep tinh so tu nhien", type: "link", url: "https://www.youtube.com/watch?v=fake-math6-natural-number", is_mandatory: false }
      ],
      progress_info: {
        total_lessons: 4,
        completed_lessons: 0,
        progress_percent: 0,
        is_accessible: true
      },
      created_at: "2025-03-01T09:00:00.000Z",
      updated_at: "2025-03-01T09:00:00.000Z"
    }
  }
};
var mockModuleAPI = {
  async getModuleDetail(courseId, moduleId) {
    await simulateDelay();
    const courseModules = moduleDetailsByCourse[courseId];
    if (!courseModules) throw new Error("Course modules not found (mock)");
    const module = courseModules[moduleId];
    if (!module) throw new Error("Module not found (mock)");
    return deepClone(module);
  }
};
export {
  mockModuleAPI,
  moduleDetailsByCourse
};
