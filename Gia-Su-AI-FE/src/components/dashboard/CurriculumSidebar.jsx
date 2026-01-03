import React, { useEffect, useMemo, useState } from 'react'
import courseService from '@services/courseService'
import './CurriculumSidebar.css'

const getLessonStatus = (lesson = {}) => {
  if (lesson.is_locked || lesson.status === 'locked') return 'locked'
  if (lesson.status === 'completed' || lesson.is_completed) return 'completed'
  if (lesson.status === 'in_progress') return 'in_progress'
  return 'not_started'
}

const getLessonSecondaryText = (lesson = {}) => {
  if (lesson.subtitle) return lesson.subtitle
  if (lesson.short_description) return lesson.short_description
  if (lesson.description) {
    const plain = lesson.description.replace(/<[^>]+>/g, '')
    return plain.length > 60 ? `${plain.slice(0, 57)}...` : plain
  }
  if (lesson.type) return `Loai bai hoc: ${lesson.type}`
  return null
}

const CurriculumSidebar = ({ courseId, activeLessonId, onSelectLesson, variant = 'panel' }) => {
  const [overview, setOverview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchModules = async () => {
      if (!courseId) {
        setOverview(null)
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const data = await courseService.getCourseModules(courseId)
        if (!isMounted) return
        setOverview(data)
        setError(null)
      } catch (err) {
        if (!isMounted) return
        setError(err.message || 'Khong the tai chuong trinh hoc')
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchModules()

    return () => {
      isMounted = false
    }
  }, [courseId])

  const { totalLessons, completedLessons } = useMemo(() => {
    if (!overview?.modules?.length) {
      return { totalLessons: 0, completedLessons: 0 }
    }

    return overview.modules.reduce(
      (acc, module) => {
        const moduleTotal =
          module.total_lessons ?? module.lessons_outline?.length ?? module.lessons?.length ?? 0
        const moduleCompleted =
          module.completed_lessons ??
          module.lessons_outline?.filter((lesson) => getLessonStatus(lesson) === 'completed')
            .length ??
          module.lessons?.filter((lesson) => getLessonStatus(lesson) === 'completed').length ??
          0

        return {
          totalLessons: acc.totalLessons + moduleTotal,
          completedLessons: acc.completedLessons + moduleCompleted
        }
      },
      { totalLessons: 0, completedLessons: 0 }
    )
  }, [overview])

  const progressPercent =
    overview?.overall_progress ??
    (totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0)

  const handleLessonClick = (lesson) => {
    if (!lesson || getLessonStatus(lesson) === 'locked') return
    if (typeof onSelectLesson === 'function') {
      onSelectLesson(lesson.id)
    }
  }

  const renderLessonRow = (module, lesson) => {
    const status = getLessonStatus(lesson)
    const isActive = activeLessonId && lesson.id === activeLessonId
    const secondaryText = getLessonSecondaryText(lesson)
    const duration = lesson.duration_minutes ? `${lesson.duration_minutes}p` : null

    return (
      <li key={lesson.id}>
        <button
          type="button"
          className={`module-lesson-row ${status} ${isActive ? 'active' : ''}`}
          disabled={status === 'locked'}
          onClick={() => handleLessonClick(lesson)}
        >
          <div className="lesson-row-left">
            <span className={`lesson-check ${status}`}>{status === 'completed' ? '✓' : ''}</span>
            <div>
              <p className="lesson-row-title">{lesson.title}</p>
              {secondaryText && <small>{secondaryText}</small>}
            </div>
          </div>
          {duration && <span className="lesson-duration">{duration}</span>}
        </button>
      </li>
    )
  }

  const renderModules = () => {
    if (!overview?.modules?.length) {
      if (loading) {
        return <p className="curriculum-placeholder">Dang tai chuong trinh hoc...</p>
      }
      if (error) {
        return <p className="curriculum-placeholder error">{error}</p>
      }
      return <p className="curriculum-placeholder">Chua co module nao trong khoa hoc nay.</p>
    }

    return overview.modules.map((module, moduleIndex) => {
      const moduleLessons = module.lessons_outline || module.lessons || []
      const moduleOrder = module.order ?? moduleIndex + 1
      const moduleTotal = module.total_lessons ?? moduleLessons.length
      const moduleCompleted =
        module.completed_lessons ??
        moduleLessons.filter((lesson) => getLessonStatus(lesson) === 'completed').length

      return (
        <article className="curriculum-module" key={module.id || moduleOrder}>
          <div className="module-outline-head">
            <div>
              <p className="module-outline-title">
                {`CHUONG ${moduleOrder}: ${module.title}`}
              </p>
            </div>
            <span className="module-outline-count">
              {moduleCompleted}/{moduleTotal}
            </span>
          </div>
          <div className="module-outline-progress">
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${module.progress_percent || 0}%` }}
              ></div>
            </div>
          </div>
          <ul className="module-lesson-list">
            {moduleLessons.map((lesson) => renderLessonRow(module, lesson))}
          </ul>
        </article>
      )
    })
  }

  return (
    <section className={`curriculum-panel ${variant}`}>
      <header className="curriculum-panel-head">
        <p className="curriculum-panel-title">Chuong trinh hoc</p>
      </header>

      <div className="curriculum-panel-body">
        <div className="curriculum-progress-block">
          <div className="progress-meta">
            <span>Tien do khoa hoc</span>
            <strong>{progressPercent}%</strong>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <p className="progress-caption">
            {completedLessons}/{totalLessons || '0'} bai da hoan thanh
          </p>
        </div>

        <div className="curriculum-modules-list">{renderModules()}</div>
      </div>
    </section>
  )
}

export default CurriculumSidebar
