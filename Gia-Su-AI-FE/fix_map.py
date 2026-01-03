from pathlib import Path
text = Path('src/mocks/mockCourseModules.js').read_text(encoding='utf-8')
start = text.find('export const courseModulesOverview')
end = text.find('\n\nconst buildCourseModulesFallback', start)
if start == -1 or end == -1:
    raise SystemExit('marker not found')
new_map = """
export const courseModulesOverview = {
  'nihongo-basic-2025': NIHONGO_CURRICULUM_TEMPLATE,
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
  },
  'course-007': {
    course_id: 'course-007',
    course_title: 'Toán 6 - Số tự nhiên',
    total_modules: 1,
    completed_modules: 0,
    overall_progress: 0,
    modules: [
      {
        id: 'module-007-01',
        title: 'Số tự nhiên',
        description: 'Tập hợp số tự nhiên, phép cộng/trừ/nhân/chia, ước bội, UCLN và BCNN.',
        order: 1,
        difficulty: 'Basic',
        estimated_hours: 5,
        total_lessons: 4,
        completed_lessons: 0,
        progress_percent: 0,
        is_accessible: true,
        unlock_condition: null,
        status: 'not_started',
        completion_date: null,
        lessons_outline: [
          { id: 'lesson-007-01', title: 'Tập hợp số tự nhiên & trục số', order: 1, status: 'not_started', duration_minutes: 25, type: 'video', is_locked: false },
          { id: 'lesson-007-02', title: 'Cộng trừ số tự nhiên', order: 2, status: 'not_started', duration_minutes: 25, type: 'video', is_locked: false },
          { id: 'lesson-007-03', title: 'Nhân, chia và lũy thừa', order: 3, status: 'not_started', duration_minutes: 30, type: 'mixed', is_locked: false },
          { id: 'lesson-007-04', title: 'Ước, bội, UCLN & BCNN', order: 4, status: 'not_started', duration_minutes: 30, type: 'quiz', is_locked: false }
        ]
      }
    ]
  }
}
"""
Path('src/mocks/mockCourseModules.js').write_text(text[:start] + new_map + text[end:], encoding='utf-8')
