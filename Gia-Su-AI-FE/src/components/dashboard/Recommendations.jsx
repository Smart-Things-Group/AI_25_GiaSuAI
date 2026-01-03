import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@components/ui/Card'

const Recommendations = ({ courses }) => {
  const safeCourses = Array.isArray(courses) ? courses : []

  return (
    <Card className="home-card" padding="lg">
      <div className="section-header">
        <h3>Khóa Học Được Gợi Ý</h3>
        <Link to="/courses" className="section-link">
          Khám Phá Thêm
        </Link>
      </div>

      {safeCourses.length === 0 ? (
        <p className="empty-state">
          Chua co goi y nao o thoi diem nay. Hay hoan thanh them bai hoc de nhan duoc de xuat phu hop.
        </p>
      ) : (
        <div className="recommend-list">
          {safeCourses.map((course) => (
            <div key={course.course_id || course.id} className="recommend-item">
              <div>
                <p className="recommend-title">{course.title}</p>
                <p className="recommend-reason">{course.reason}</p>
              </div>
              {course.relevance_score != null && (
                <span className="recommend-score">{course.relevance_score}%</span>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

export default Recommendations
