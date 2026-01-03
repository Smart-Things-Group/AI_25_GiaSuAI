// src/mocks/mockCourseModules.js
var simulateDelay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));
var deepClone = (data) => JSON.parse(JSON.stringify(data));
var fallbackTemplate = (courseId, courseTitle, moduleCount = 1, lessonCount = 3) => {
  const modules = Array.from({ length: moduleCount }).map((_, mIdx) => {
    const moduleId = `${courseId}-module-${String(mIdx + 1).padStart(2, "0")}`;
    return {
      id: moduleId,
      title: `Module ${mIdx + 1}`,
      description: "Module mock placeholder.",
      order: mIdx + 1,
      difficulty: "Basic",
      estimated_hours: 1.5,
      total_lessons: lessonCount,
      completed_lessons: 0,
      progress_percent: 0,
      is_accessible: true,
      unlock_condition: null,
      status: "not_started",
      completion_date: null,
      lessons_outline: Array.from({ length: lessonCount }).map((__, lIdx) => ({
        id: `${moduleId}-lesson-${String(lIdx + 1).padStart(2, "0")}`,
        title: `Bai ${lIdx + 1}`,
        order: lIdx + 1,
        status: "not_started",
        duration_minutes: 15,
        type: "video",
        is_locked: false
      }))
    };
  });
  return {
    course_id: courseId,
    course_title: courseTitle,
    total_modules: moduleCount,
    completed_modules: 0,
    overall_progress: 0,
    modules
  };
};
var courseModulesOverview = {
  "course-006": {
    course_id: "course-006",
    course_title: "Tieng Nhat Giao Tiep",
    total_modules: 1,
    completed_modules: 0,
    overall_progress: 0,
    modules: [
      {
        id: "module-006-01",
        title: "Chao hoi va gioi thieu ban than",
        description: "Chao hoi, tam biet, gioi thieu co ban.",
        order: 1,
        difficulty: "Basic",
        estimated_hours: 1.5,
        total_lessons: 2,
        completed_lessons: 0,
        progress_percent: 0,
        is_accessible: true,
        unlock_condition: null,
        status: "not_started",
        completion_date: null,
        lessons_outline: [
          {
            id: "lesson-006-01",
            title: "Chao hoi & tam biet",
            order: 1,
            status: "not_started",
            duration_minutes: 15,
            type: "video",
            is_locked: false
          },
          {
            id: "lesson-006-02",
            title: "Gioi thieu ban than",
            order: 2,
            status: "not_started",
            duration_minutes: 20,
            type: "video",
            is_locked: false
          }
        ]
      }
    ]
  },
  "course-007": {
    course_id: "course-007",
    course_title: "Toan 6 - So tu nhien",
    total_modules: 1,
    completed_modules: 0,
    overall_progress: 0,
    modules: [
      {
        id: "module-007-01",
        title: "So tu nhien",
        description: "Tap hop so tu nhien, phep tinh co ban, uoc boi.",
        order: 1,
        difficulty: "Basic",
        estimated_hours: 5,
        total_lessons: 4,
        completed_lessons: 0,
        progress_percent: 0,
        is_accessible: true,
        unlock_condition: null,
        status: "not_started",
        completion_date: null,
        lessons_outline: [
          {
            id: "lesson-007-01",
            title: "Tap hop so tu nhien & truc so",
            order: 1,
            status: "not_started",
            duration_minutes: 25,
            type: "video",
            is_locked: false
          },
          {
            id: "lesson-007-02",
            title: "Cong tru so tu nhien",
            order: 2,
            status: "not_started",
            duration_minutes: 25,
            type: "video",
            is_locked: false
          },
          {
            id: "lesson-007-03",
            title: "Nhan, chia va luy thua",
            order: 3,
            status: "not_started",
            duration_minutes: 30,
            type: "mixed",
            is_locked: false
          },
          {
            id: "lesson-007-04",
            title: "Uoc, boi, UCLN & BCNN",
            order: 4,
            status: "not_started",
            duration_minutes: 30,
            type: "quiz",
            is_locked: false
          }
        ]
      }
    ]
  }
};
var buildCourseModulesFallback = (courseId = "course-mock") => fallbackTemplate(courseId, "Course mock", 1, 3);
var mockCourseModulesAPI = {
  async getCourseModules(courseId = "course-mock") {
    await simulateDelay();
    const overview = courseModulesOverview[courseId];
    if (overview) return deepClone(overview);
    return buildCourseModulesFallback(courseId);
  }
};
export {
  courseModulesOverview,
  mockCourseModulesAPI
};
