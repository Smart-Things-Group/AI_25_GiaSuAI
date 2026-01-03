import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCourseStore } from '@stores/courseStore'
import './ModuleDetailPage.css'

const ModuleDetailPage = () => {
  const { courseId, moduleId } = useParams()
  const navigate = useNavigate()
  const {
    currentModule: moduleData,
    isLoading: loading,
    error,
    getModule
  } = useCourseStore()

  useEffect(() => {
    const fetchModule = async () => {
      await getModule(courseId, moduleId)
    }
    fetchModule()
  }, [courseId, moduleId, getModule])

  if (loading) {
    return <div className="module-detail-page">Đang tải thông tin module...</div>
  }

  if (error) {
    return <div className="module-detail-page error">{error}</div>
  }

  if (!moduleData) return null

  const nextLesson = moduleData.lessons?.find((lesson) => !lesson.is_completed)
  const lessonToContinue = nextLesson || moduleData.lessons?.[0]

  return (
    <div className="module-detail-page">
      <header className="module-detail-header">
        <div className="breadcrumb">
          <Link to={`/dashboard/courses/${courseId}`}>← Quay lại khóa học</Link>
        </div>
        <div className="module-hero">
          <div>
            <p className="hero-label">Module {moduleData.order}</p>
            <h1>{moduleData.title}</h1>
            <p className="module-description">{moduleData.description}</p>
            <div className="module-meta">
              <span>Độ khó: {moduleData.difficulty}</span>
              <span>{moduleData.estimated_hours} giờ học</span>
              <span>Điểm đạt: {moduleData.pass_threshold}%</span>
            </div>
          </div>
          <div className="module-progress-card">
            <p>Tiến độ module</p>
            <strong>{moduleData.progress_info?.progress_percent ?? 0}%</strong>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${moduleData.progress_info?.progress_percent ?? 0}%` }}
              />
            </div>
            <small>
              {moduleData.progress_info?.completed_lessons || 0}/
              {moduleData.progress_info?.total_lessons || 0} bài học
            </small>
            <button
              type="button"
              className={`primary ${moduleData.progress_info?.is_accessible ? 'success' : ''}`}
              disabled={!moduleData.progress_info?.is_accessible || !lessonToContinue}
              onClick={() => {
                if (moduleData.progress_info?.is_accessible && lessonToContinue) {
                  navigate(`/dashboard/courses/${courseId}/lessons/${lessonToContinue.id}`)
                }
              }}
            >
              {moduleData.progress_info?.is_accessible ? 'Tiếp tục học' : 'Khóa module trước'}
            </button>
          </div>
        </div>
      </header>

      <div className="module-detail-content">
        <section className="card">
          <h2>Kết quả học tập</h2>
          {moduleData.learning_outcomes?.length ? (
            <ul className="outcome-list">
              {moduleData.learning_outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>Module này chưa có kết quả học tập cụ thể.</p>
          )}
        </section>

        <section className="card">
          <div className="section-heading">
            <h2>Danh sách bài học</h2>
            <span>{moduleData.lessons?.length || 0} bài</span>
          </div>
          <ul className="lesson-detail-list">
            {moduleData.lessons?.map((lesson) => (
              <li key={lesson.id} className={lesson.is_completed ? 'completed' : ''}>
                <div>
                  <p>{lesson.title}</p>
                  <small>
                    {lesson.duration_minutes} phút · {lesson.content_type} ·{' '}
                    {lesson.has_quiz ? 'Có quiz' : 'Không có quiz'}
                  </small>
                </div>
                <div className="lesson-status">
                  <span>{lesson.is_completed ? 'Đã hoàn thành' : 'Chưa học'}</span>
                  {lesson.completion_date && <small>{lesson.completion_date}</small>}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h2>Tài nguyên</h2>
          {moduleData.resources?.length ? (
            <ul className="resource-list">
              {moduleData.resources.map((resource) => (
                <li key={resource.id}>
                  <div>
                    <p>{resource.title}</p>
                    <small>{resource.type}</small>
                  </div>
                  <a href={resource.url} target="_blank" rel="noreferrer">
                    Xem
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>Module chưa có tài nguyên bổ sung.</p>
          )}
        </section>

        <section className="card">
          <h2>Thông tin khác</h2>
          <ul className="info-list">
            <li>
              <span>Ngày tạo</span>
              <strong>{new Date(moduleData.created_at).toLocaleDateString('vi-VN')}</strong>
            </li>
            <li>
              <span>Cập nhật</span>
              <strong>{new Date(moduleData.updated_at).toLocaleDateString('vi-VN')}</strong>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default ModuleDetailPage
