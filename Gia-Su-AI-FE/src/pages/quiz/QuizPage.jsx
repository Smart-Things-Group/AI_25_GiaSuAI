import React, { useEffect, useState } from 'react'
import Card, { CardHeader, CardBody } from '@components/ui/Card'
import Button from '@components/ui/Button'
import { quizService } from '@services/quizService'

/**
 * Component QuizPage - Trang danh sách quiz
 */

const QuizPage = () => {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        // Lấy danh sách quiz đã tạo hoặc pending quiz từ API (ví dụ: /quizzes/my-quizzes hoặc /dashboard/student)
        // Ở đây demo lấy pending_quizzes từ dashboard
        const dashboard = await quizService.getStudentDashboard?.()
        const quizList = dashboard?.pending_quizzes || []
        setQuizzes(quizList)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchQuizzes()
  }, [])

  return (
    <div className="quiz-page">
      <div className="page-header">
        <h1>Bài Quiz</h1>
        <p>Thực hành với các bài quiz</p>
      </div>

      <div className="quiz-content">
        {loading ? (
          <div>Đang tải...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="quiz-grid">
            {quizzes.length === 0 ? (
              <div>Không có quiz nào cần làm.</div>
            ) : (
              quizzes.map((quiz) => (
                <Card key={quiz.quiz_id || quiz.id}>
                  <CardHeader>
                    <h3>{quiz.title}</h3>
                  </CardHeader>
                  <CardBody>
                    <p>{quiz.course_title && <span>Khóa học: {quiz.course_title}</span>}</p>
                    <div className="quiz-info">
                      <span>{quiz.question_count || 0} câu hỏi</span>
                      <span>{quiz.time_limit || 0} phút</span>
                    </div>
                    <Button>Bắt đầu làm</Button>
                  </CardBody>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default QuizPage