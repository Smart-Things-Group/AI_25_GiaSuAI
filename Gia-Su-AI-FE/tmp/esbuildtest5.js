// src/mocks/mockCourseDetails.js
import japanGTThumb from "@/img/JapanGT.png";
import math6Thumb from "@/img/Math6.png";
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
    status: "C\xF4ng khai",
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
    title: "To\xE1n 6 - S\u1ED1 t\u1EF1 nhi\xEAn",
    description: "M\xF4-\u0111un \u0111\u1EA7u ti\xEAn ch\u01B0\u01A1ng tr\xECnh To\xE1n 6: t\u1EADp h\u1EE3p s\u1ED1 t\u1EF1 nhi\xEAn, ph\xE9p t\xEDnh c\u01A1 b\u1EA3n, \u01B0\u1EDBc b\u1ED9i, UCLN v\xE0 BCNN.",
    category: "Math",
    subcategory: "L\u1EDBp 6",
    level: "Beginner",
    thumbnail_url: math6Thumb,
    preview_video_url: null,
    language: "vi",
    status: "C\xF4ng khai",
    owner_info: {
      id: "instr-007",
      name: "C\xF4 Mai Anh",
      avatar_url: null,
      bio: "Gi\xE1o vi\xEAn To\xE1n THCS, h\u01A1n 10 n\u0103m gi\u1EA3ng d\u1EA1y v\xE0 bi\xEAn so\u1EA1n t\xE0i li\u1EC7u To\xE1n l\u1EDBp 6.",
      experience_years: 10
    },
    learning_outcomes: [
      { description: "Bi\u1EC3u di\u1EC5n t\u1EADp h\u1EE3p, \u0111\u1ECDc vi\u1EBFt s\u1ED1 t\u1EF1 nhi\xEAn, s\u1EED d\u1EE5ng tr\u1EE5c s\u1ED1.", skill_tag: "S\u1ED1 t\u1EF1 nhi\xEAn" },
      { description: "Th\u1EF1c hi\u1EC7n c\u1ED9ng, tr\u1EEB, nh\xE2n, chia, l\u0169y th\u1EEBa v\u1EDBi s\u1ED1 m\u0169 t\u1EF1 nhi\xEAn.", skill_tag: "Ph\xE9p t\xEDnh c\u01A1 b\u1EA3n" },
      { description: "V\u1EADn d\u1EE5ng d\u1EA5u hi\u1EC7u chia h\u1EBFt, t\xECm \u01B0\u1EDBc b\u1ED9i, UCLN v\xE0 BCNN.", skill_tag: "\u01AF\u1EDBc - B\u1ED9i" }
    ],
    prerequisites: ["Ki\u1EBFn th\u1EE9c To\xE1n l\u1EDBp 5 c\u01A1 b\u1EA3n"],
    modules: [
      {
        id: "module-007-01",
        title: "S\u1ED1 t\u1EF1 nhi\xEAn",
        description: "Gi\u1EDBi thi\u1EC7u v\u1EC1 s\u1ED1 t\u1EF1 nhi\xEAn, ph\xE9p t\xEDnh c\u01A1 b\u1EA3n v\xE0 \u01B0\u1EDBc b\u1ED9i.",
        difficulty: "Basic",
        estimated_hours: 5,
        lessons: [
          { id: "lesson-007-01", title: "T\u1EADp h\u1EE3p s\u1ED1 t\u1EF1 nhi\xEAn & tr\u1EE5c s\u1ED1", order: 1, duration_minutes: 25, content_type: "video", is_completed: false },
          { id: "lesson-007-02", title: "C\u1ED9ng tr\u1EEB s\u1ED1 t\u1EF1 nhi\xEAn", order: 2, duration_minutes: 25, content_type: "video", is_completed: false },
          { id: "lesson-007-03", title: "Nh\xE2n, chia v\xE0 l\u0169y th\u1EEBa", order: 3, duration_minutes: 30, content_type: "mixed", is_completed: false },
          { id: "lesson-007-04", title: "\u01AF\u1EDBc, b\u1ED9i, UCLN & BCNN", order: 4, duration_minutes: 30, content_type: "quiz", is_completed: false }
        ]
      }
    ],
    course_statistics: { total_modules: 1, total_lessons: 4, total_duration_minutes: 110, enrollment_count: 0, completion_rate: 0, avg_rating: 4.8 },
    enrollment_info: { is_enrolled: false, enrollment_id: null, enrolled_at: null, progress_percent: null, can_access_content: false },
    created_at: "2025-03-01T09:00:00.000Z",
    updated_at: "2025-03-01T09:00:00.000Z"
  }
};

// src/mocks/mockCourses.js
import japanGTThumb2 from "@/img/JapanGT.png";
import math6Thumb2 from "@/img/Math6.png";
var simulateDelay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));
var deepClone = (data) => JSON.parse(JSON.stringify(data));
var paginate = (arr, start = 0, end = 10) => arr.slice(start, end);
var courses = [
  {
    id: "course-006",
    title: "Ti\u1EBFng Nh\u1EADt Giao Ti\u1EBFp",
    description: "Luy\u1EC7n nghe n\xF3i giao ti\u1EBFp c\u01A1 b\u1EA3n.",
    category: "Language Learning",
    level: "Beginner",
    thumbnail_url: japanGTThumb2,
    total_modules: 1,
    total_lessons: 2,
    total_duration_minutes: 35,
    enrollment_count: 0,
    avg_rating: 4.7,
    instructor_name: "Yamada Kenji",
    instructor_avatar: null,
    is_enrolled: false,
    created_at: "2025-02-20T08:00:00.000Z",
    tags: ["japanese", "communication", "beginner"]
  },
  {
    id: "course-007",
    title: "To\xE1n 6 - S\u1ED1 t\u1EF1 nhi\xEAn",
    description: "T\u1EADp h\u1EE3p s\u1ED1 t\u1EF1 nhi\xEAn, ph\xE9p t\xEDnh c\u01A1 b\u1EA3n, \u01B0\u1EDBc b\u1ED9i, UCLN v\xE0 BCNN.",
    category: "Math",
    level: "Beginner",
    thumbnail_url: math6Thumb2,
    total_modules: 1,
    total_lessons: 4,
    total_duration_minutes: 110,
    enrollment_count: 0,
    avg_rating: 4.8,
    instructor_name: "C\xF4 Mai Anh",
    instructor_avatar: null,
    is_enrolled: false,
    created_at: "2025-03-01T09:00:00.000Z"
  },
  {
    id: "course-001",
    title: "Lap trinh Python ung dung",
    description: "Python co ban den trung cap.",
    category: "Programming",
    level: "Beginner",
    thumbnail_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=60",
    total_modules: 4,
    total_lessons: 20,
    total_duration_minutes: 320,
    enrollment_count: 100,
    avg_rating: 4.6,
    instructor_name: "Nguyen Van A",
    instructor_avatar: null,
    is_enrolled: true,
    created_at: "2025-02-08T09:00:00.000Z"
  }
];
var buildSummary = () => {
  const totalCourses = courses.length;
  const enrolled = courses.filter((c) => c.is_enrolled).length;
  const avgRating = courses.reduce((sum, c) => sum + (c.avg_rating || 0), 0) / (courses.length || 1);
  return { total: totalCourses, enrolled, avg_rating: Number(avgRating.toFixed(2)) };
};
var enrollments = courses.filter((c) => c.is_enrolled).map((course) => ({
  id: `enroll-${course.id}`,
  course_id: course.id,
  course_title: course.title,
  course_description: course.description,
  course_thumbnail: course.thumbnail_url,
  course_level: course.level,
  instructor_name: course.instructor_name,
  status: "active",
  progress_percent: 0,
  enrolled_at: course.created_at,
  completed_at: null,
  last_accessed_at: course.created_at,
  avg_quiz_score: null,
  total_time_spent_minutes: 0,
  next_lesson: { lesson_id: null, lesson_title: null, module_title: null }
}));
var filterCourses = (params) => {
  const { search = "", category, level, tags = [], sort_by = "created_at", order = "desc" } = params;
  const query = search.toLowerCase().trim();
  let result = courses.filter((course) => {
    const matchSearch = !query || course.title.toLowerCase().includes(query) || course.description.toLowerCase().includes(query);
    const matchCategory = category ? course.category === category : true;
    const matchLevel = level ? course.level === level : true;
    const matchTags = !tags?.length || tags.every((tag) => (course.tags || []).includes(tag));
    return matchSearch && matchCategory && matchLevel && matchTags;
  });
  result = result.sort((a, b) => {
    const dir = order === "asc" ? 1 : -1;
    switch (sort_by) {
      case "name":
        return a.title.localeCompare(b.title) * dir;
      case "enrollment":
        return (a.enrollment_count - b.enrollment_count) * dir;
      case "rating":
        return (a.avg_rating - b.avg_rating) * dir;
      case "created_at":
      default:
        return (new Date(a.created_at) - new Date(b.created_at)) * dir;
    }
  });
  return result;
};
var getEnrollmentStatusByCourse = (courseId) => {
  const enrollment = enrollments.find((enroll) => enroll.course_id === courseId);
  return enrollment ? {
    enrolled: true,
    status: enrollment.status,
    enrollment_id: enrollment.id,
    can_access_content: enrollment.status !== "cancelled",
    enrollment_date: enrollment.enrolled_at,
    progress_percent: enrollment.progress_percent
  } : {
    enrolled: false,
    status: null,
    enrollment_id: null,
    can_access_content: false,
    enrollment_date: null,
    progress_percent: null
  };
};
var createEnrollment = (courseId) => {
  const course = courses.find((item) => item.id === courseId);
  if (!course) throw new Error("Course not found");
  const existing = enrollments.find((item) => item.course_id === courseId && item.status !== "cancelled");
  if (existing) {
    courses = courses.map((c) => c.id === courseId ? { ...c, is_enrolled: true } : c);
    return existing;
  }
  const newEnrollment = {
    id: `enroll-${Date.now()}`,
    course_id: course.id,
    course_title: course.title,
    course_description: course.description,
    course_thumbnail: course.thumbnail_url,
    course_level: course.level,
    instructor_name: course.instructor_name,
    status: "active",
    progress_percent: 0,
    enrolled_at: (/* @__PURE__ */ new Date()).toISOString(),
    completed_at: null,
    last_accessed_at: (/* @__PURE__ */ new Date()).toISOString(),
    avg_quiz_score: null,
    total_time_spent_minutes: 0,
    next_lesson: { lesson_id: null, lesson_title: null, module_title: null }
  };
  enrollments = [newEnrollment, ...enrollments];
  courses = courses.map((c) => c.id === courseId ? { ...c, is_enrolled: true } : c);
  return newEnrollment;
};
var mockCourseAPI = {
  async searchCourses(params = {}) {
    return this.listCourses(params);
  },
  async listCourses(params = {}) {
    await simulateDelay();
    const { skip = 0, limit = 10 } = params;
    const filtered = filterCourses(params);
    return {
      courses: paginate(filtered, Number(skip), Number(skip) + Number(limit)),
      total: filtered.length,
      skip: Number(skip),
      limit: Number(limit),
      summary: buildSummary()
    };
  },
  async getCourseDetail(courseId) {
    return this.getCourse(courseId);
  },
  async getCourse(courseId) {
    await simulateDelay();
    const detail = courseDetailsById[courseId];
    if (detail) return deepClone(detail);
    const fallback = courses.find((c) => c.id === courseId);
    if (!fallback) throw new Error("Course not found");
    return deepClone(fallback);
  }
};
var mockEnrollmentAPI = {
  async enrollCourse(courseId) {
    await simulateDelay();
    const enrollment = createEnrollment(courseId);
    return {
      id: enrollment.id,
      user_id: "user-001",
      course_id: enrollment.course_id,
      course_title: enrollment.course_title,
      status: "active",
      enrolled_at: enrollment.enrolled_at,
      progress_percent: 0,
      message: "Dang ky khoa hoc thanh cong. Chuc ban hoc tap hieu qua!"
    };
  },
  async getMyCourses(params = {}) {
    await simulateDelay();
    const { status, skip = 0, limit = 10 } = params;
    const filtered = enrollments.filter((enroll) => status ? enroll.status === status : true);
    return {
      enrollments: paginate(filtered, Number(skip), Number(skip) + Number(limit)),
      summary: buildSummary(),
      skip: Number(skip),
      limit: Number(limit)
    };
  },
  async getEnrollmentDetail(enrollmentId) {
    await simulateDelay();
    const enrollment = enrollments.find((item) => item.id === enrollmentId);
    if (!enrollment) throw new Error("Enrollment not found");
    const course = courses.find((item) => item.id === enrollment.course_id);
    return {
      ...enrollment,
      course_title: course?.title || enrollment.course_title,
      total_modules: course?.total_modules || 0,
      completed_modules: Math.round(enrollment.progress_percent / 100 * (course?.total_modules || 0)),
      total_lessons: course?.total_lessons || 0,
      completed_lessons: Math.round(enrollment.progress_percent / 100 * (course?.total_lessons || 0))
    };
  },
  async getEnrollmentStatus(courseId) {
    await simulateDelay();
    return getEnrollmentStatusByCourse(courseId);
  },
  async cancelEnrollment(enrollmentId) {
    await simulateDelay();
    enrollments = enrollments.map((item) => item.id === enrollmentId ? { ...item, status: "cancelled" } : item);
    return {
      message: "Huy dang ky khoa hoc thanh cong",
      note: "Du lieu hoc tap cua ban da duoc luu lai"
    };
  }
};
export {
  mockCourseAPI,
  mockEnrollmentAPI
};
