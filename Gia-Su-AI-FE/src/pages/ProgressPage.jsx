import React, { useEffect, useState } from 'react'
import Card, { CardHeader, CardBody } from '@components/ui/Card'
import { authService } from '@services/authService'
import api from '@services/api'

/**
 * Component ProgressPage - Trang tiến độ học tập
 */

const ProgressPage = () => {
  const [stats, setStats] = useState(null)
  const [progress, setProgress] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        // Lấy thống kê học tập tổng quan
        const statsData = await api.get('/analytics/learning-stats')
        setStats(statsData.data)
        // Lấy tiến độ học tập theo khóa học
        const progressData = await api.get('/enrollments/my-courses', { params: { skip: 0, limit: 10 } })
        setProgress(progressData.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProgress()
  }, [])

  return (
    <div className="progress-page">
      <div className="page-header">
        <h1>Tiến độ học tập</h1>
        <p>Theo dõi quá trình học tập của bạn</p>
      </div>

      <div className="progress-content">
        {loading ? (
          <div>Đang tải...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            <Card>
              <CardHeader>
                <h3>Tổng quan tiến độ</h3>
              </CardHeader>
              <CardBody>
                <div className="progress-stats">
                  <div className="stat-item">
                    <div className="stat-number">{stats?.completed_courses ?? 0}</div>
                    <div className="stat-label">Khóa học đã hoàn thành</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">{stats?.quizzes_passed ?? 0}</div>
                    <div className="stat-label">Bài quiz đã pass</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">{stats?.avg_quiz_score ?? 0}%</div>
                    <div className="stat-label">Điểm quiz TB</div>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3>Khóa học đang học</h3>
              </CardHeader>
              <CardBody>
                {progress?.enrollments && progress.enrollments.length > 0 ? (
                  <ul>
                    {progress.enrollments.map((enroll) => (
                      <li key={enroll.id}>
                        <strong>{enroll.course_title}</strong> - Tiến độ: {enroll.progress_percent ?? 0}%
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Bạn chưa đăng ký khóa học nào</p>
                )}
              </CardBody>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}

export default ProgressPage