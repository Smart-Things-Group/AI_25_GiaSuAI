import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@components/ui/Card'

const PendingQuizzes = ({ quizzes, formatDateTime }) => {
  const safeQuizzes = Array.isArray(quizzes) ? quizzes : []

  return (
    <Card className="home-card" padding="lg">
      <div className="section-header">
        <h3>Quiz cần làm</h3>
        <Link to="/dashboard/quiz" className="section-link">
          Xem lich
        </Link>
      </div>

      {safeQuizzes.length === 0 ? (
        <p className="empty-state">Ban da hoan thanh het cac quiz gan day. Tiep tuc duy tri nhip do nay!</p>
      ) : (
        <div className="quiz-list">
          {safeQuizzes.map((quiz) => (
            <div key={quiz.quiz_id || quiz.id} className="quiz-item">
              <div>
                <p className="quiz-title">{quiz.title}</p>
                <p className="quiz-course">{quiz.course_title}</p>
              </div>
              <div className="quiz-meta">
                {quiz.due_at ? (
                  <span>Han: {formatDateTime ? formatDateTime(quiz.due_at) : quiz.due_at}</span>
                ) : (
                  <span>Khong co han</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

export default PendingQuizzes
