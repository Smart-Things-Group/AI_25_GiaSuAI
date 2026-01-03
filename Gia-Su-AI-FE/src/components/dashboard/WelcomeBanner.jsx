import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@components/ui/Card'

const GRAD_ICON_URL = 'https://png.pngtree.com/png-vector/20230131/ourmid/pngtree-graduation-bachelor-hat-illustration-png-image_6580811.png'

const WelcomeBanner = ({ user, nextCourse }) => {
  return (
    <Card className="home-card welcome-card" padding="lg">
      <div className="welcome-card-content">
        <div className="welcome-main">
          <p className="welcome-label">Xin chào</p>
          <h2>Chào mừng trở lại, {user?.full_name || 'bạn'}!</h2>
          <p className="welcome-description">
            Hôm nay là ngày tuyệt vời để học điều gì đó mới. Hãy tiếp tục hành trình học tập của bạn!
          </p>
          {nextCourse && (
            <p className="welcome-meta">
              Khóa học gần nhất: <strong>{nextCourse.title}</strong> — hoàn thành {nextCourse.progress}%
            </p>
          )}
          <div className="welcome-actions">
          <Link to="/dashboard/explore" className="welcome-btn welcome-btn-primary">
              <span className="welcome-btn-icon" aria-hidden="true">📘</span>
              Khám phá khóa học
            </Link>
            <Link to="/dashboard/chat" className="welcome-btn welcome-btn-secondary">
              Chat với AI Tutor
            </Link>
          </div>
        </div>
        <div className="welcome-graphic" aria-hidden="true">
          <img src={GRAD_ICON_URL} alt="" />
        </div>
      </div>
    </Card>
  )
}

export default WelcomeBanner
