import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCourseStore } from '@stores/courseStore'
import { useAuthStore } from '@stores/authStore'
import { enrollmentService } from '@services/enrollmentService'
import Button from '@components/ui/Button'
import './CourseDetailPage.css'

const tabs = ['overview', 'curriculum', 'reviews', 'resources']

const CourseDetailPage = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { 
    currentCourse: course, 
    isLoading: loading, 
    error, 
    getCourseDetail 
  } = useCourseStore()
  const { user } = useAuthStore()
  
  const [actionLoading, setActionLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedModules, setExpandedModules] = useState(new Set())

  useEffect(() => {
    const fetchCourse = async () => {
      await getCourseDetail(courseId)
    }
    fetchCourse()
  }, [courseId, getCourseDetail])

  useEffect(() => {
    if (course && course.modules) {
      setExpandedModules(new Set(course.modules.slice(0, 1).map((module) => module.id)))
    }
  }, [course])

  const refreshEnrollmentStatus = async () => {
    try {
      // TODO: Replace with real enrollment service call
      await getCourseDetail(courseId)
    } catch (err) {
      console.error(err)
    }
  }

  const getFirstLessonPath = () => {
    if (!course?.modules?.length) return null
    const sortedModules = [...course.modules].sort((a, b) => (a.order || 0) - (b.order || 0))
    const firstWithLesson = sortedModules.find((mod) => mod.lessons && mod.lessons.length)
    if (!firstWithLesson) return null
    const firstLesson = [...firstWithLesson.lessons].sort((a, b) => (a.order || 0) - (b.order || 0))[0]
    if (!firstLesson?.id) return null
    return `/dashboard/courses/${course.id}/lessons/${firstLesson.id}`
  }

  const handleEnroll = async () => {
    if (!course) return
    try {
      setActionLoading(true)
      const targetLessonPath = getFirstLessonPath()
      if (course.enrollment_info?.is_enrolled) {
        navigate(targetLessonPath || `/dashboard/courses/${course.id}`)
        return
      }
      await enrollmentService.enrollCourse(course.id)
      await refreshEnrollmentStatus()
      navigate(targetLessonPath || `/dashboard/courses/${course.id}`)
    } catch (err) {
      console.error(err.message || 'Có lỗi xảy ra khi đăng ký khóa học')
    } finally {
      setActionLoading(false)
    }
  }

  const toggleModule = (moduleId) => {
    const newSet = new Set(expandedModules)
    if (newSet.has(moduleId)) {
      newSet.delete(moduleId)
    } else {
      newSet.add(moduleId)
    }
    setExpandedModules(newSet)
  }

  if (loading) {
    return <div className="course-detail-page">Đang tải thông tin khóa học...</div>
  }

  if (error) {
    return <div className="course-detail-page error">{error}</div>
  }

  if (!course) return null

  const isEnrolled = course.enrollment_info?.is_enrolled
  const enrollmentProgress = course.enrollment_info?.progress_percent || 0

  return (
    <div className="course-detail-page">
      <header className="detail-header">
        <Link to="/dashboard/courses" className="back-link">
          ← Quay lại danh sách khóa học
        </Link>
        <div className="detail-hero">
          <div className="detail-thumbnail">
            <img src={course.thumbnail_url} alt={course.title} />
          </div>
          <div className="detail-hero-content">
            <div className="hero-badges">
              <span className="hero-badge">{course.category}</span>
              <span className="hero-badge">{course.level}</span>
              {isEnrolled && <span className="hero-badge enrolled">Đã đăng ký</span>}
            </div>
            <h1>{course.title}</h1>
            <p className="hero-description">{course.description}</p>
            <div className="hero-meta">
              <span>⏱ {Math.round(course.course_statistics.total_duration_minutes / 60)} giờ</span>
              <span>📚 {course.course_statistics.total_lessons} bài học</span>
              <span>👥 {course.course_statistics.enrollment_count} học viên</span>
              <span>⭐ {course.course_statistics.avg_rating?.toFixed(1)}</span>
            </div>

            {isEnrolled && (
              <div className="progress-card">
                <div className="progress-header">
                  <p>Tiến độ học tập</p>
                  <span>{enrollmentProgress}%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${enrollmentProgress}%` }} />
                </div>
              </div>
            )}

            <div className="hero-actions">
              <Button
                onClick={handleEnroll}
                loading={actionLoading}
                variant={isEnrolled ? 'success' : 'primary'}
              >
                {isEnrolled ? 'Tiếp tục học' : 'Đăng ký khóa học'}
              </Button>
              {course.preview_video_url && (
                <a className="preview-link" href={course.preview_video_url} target="_blank" rel="noreferrer">
                  Xem video giới thiệu
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="detail-layout">
        <main>
          <div className="tab-list">
            {tabs.map((tabKey) => (
              <button
                key={tabKey}
                className={activeTab === tabKey ? 'active' : ''}
                onClick={() => setActiveTab(tabKey)}
              >
                {tabKey === 'overview' && 'Tổng quan'}
                {tabKey === 'curriculum' && 'Chương trình'}
                {tabKey === 'reviews' && 'Đánh giá'}
                {tabKey === 'resources' && 'Tài nguyên'}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <section className="card">
              <h2>Bạn sẽ học được gì</h2>
              <ul className="checklist">
                {course.learning_outcomes?.map((outcome) => (
                  <li key={outcome.description}>
                    <span>✔</span>
                    <div>
                      <p>{outcome.description}</p>
                      <small>{outcome.skill_tag}</small>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {activeTab === 'overview' && (
            <section className="card">
              <h2>Yêu cầu đầu vào</h2>
              <ul className="bullet-list">
                {course.prerequisites?.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {activeTab === 'curriculum' && (
            <section className="card">
              <h2>Chương trình học</h2>
              {course.modules.map((module) => {
                const expanded = expandedModules.has(module.id)
                return (
                  <div key={module.id} className="module-section">
                    <div className="module-header-row">
                      <button className="module-header" onClick={() => toggleModule(module.id)}>
                        <div>
                          <p className="module-title">{module.title}</p>
                          <small>
                            {module.lessons.length} bài · {module.estimated_hours} giờ ·{' '}
                            {module.difficulty}
                          </small>
                        </div>
                        <span>{expanded ? '−' : '+'}</span>
                      </button>
                      <Link
                        to={`/dashboard/courses/${course.id}/modules/${module.id}`}
                        className="module-detail-link"
                      >
                        Chi tiết
                      </Link>
                    </div>
                    {expanded && (
                      <ul className="lesson-list">
                        {module.lessons.map((lesson) => (
                          <li key={lesson.id}>
                            <div>
                              <span>{lesson.content_type === 'video' ? '🎬' : '📝'}</span>
                              <p>{lesson.title}</p>
                            </div>
                            <span>{lesson.duration_minutes} phút</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )
              })}
            </section>
          )}

          {activeTab === 'reviews' && (
            <section className="card">
              <h2>Đánh giá từ học viên</h2>
              <p>Chức năng đánh giá đang được cập nhật.</p>
            </section>
          )}

          {activeTab === 'resources' && (
            <section className="card">
              <h2>Tài nguyên khóa học</h2>
              <p>Các tài nguyên bổ sung sẽ hiển thị khi bạn đăng ký khóa học.</p>
            </section>
          )}
        </main>

        <aside>
          <div className="card">
            <h3>Giảng viên</h3>
            <p className="instructor-name">{course.owner_info.name}</p>
            <p className="instructor-bio">{course.owner_info.bio}</p>
            <small>{course.owner_info.experience_years}+ năm kinh nghiệm</small>
          </div>

          <div className="card">
            <h3>Thông tin khóa học</h3>
            <ul className="info-list">
              <li>
                <span>Thời lượng</span>
                <strong>{Math.round(course.course_statistics.total_duration_minutes / 60)} giờ</strong>
              </li>
              <li>
                <span>Ngôn ngữ</span>
                <strong>{course.language === 'vi' ? 'Tiếng Việt' : course.language}</strong>
              </li>
              <li>
                <span>Trạng thái</span>
                <strong>{course.status}</strong>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default CourseDetailPage
