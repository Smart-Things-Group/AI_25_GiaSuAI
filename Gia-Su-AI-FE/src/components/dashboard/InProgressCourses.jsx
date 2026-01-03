import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@components/ui/Card'

const InProgressCourses = ({ courses, formatDateTime }) => {
  const safeCourses = Array.isArray(courses) ? courses : []

  return (
    <Card className="home-card" padding="lg">
      <div className="section-header">
        <h3>Khóa Học Đang Học</h3>
        <Link to="/dashboard/my-courses" className="section-link">
          Xem tat ca
        </Link>
      </div>

      {safeCourses.length === 0 ? (
        <p className="empty-state">
          Ban chua dang ky khoa hoc nao. Hay kham pha khoa hoc de bat dau hanh trinh hoc tap.
        </p>
      ) : (
        <div className="course-list">
          {safeCourses.map((course) => (
            <div key={course.course_id || course.id} className="course-item">
              <div>
                <p className="course-title">{course.title}</p>
                <p className="course-meta">
                  Truy cap lan cuoi:{' '}
                  {formatDateTime ? formatDateTime(course.last_accessed) : course.last_accessed || '---'}
                </p>
              </div>
              <div className="course-progress">
                <span>{course.progress ?? 0}%</span>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${course.progress ?? 0}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

export default InProgressCourses
