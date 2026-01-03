import React from 'react'
import Card from '@components/ui/Card'

const LearningStreak = ({ streak }) => {
  const currentStreak = Math.max(0, Number(streak?.current || 0))
  const displayDays = 7
  const dayItems = Array.from({ length: displayDays }, (_, idx) => idx + 1)

  return (
    <Card className="home-card streak-card" padding="lg">
      <div className="streak-header">
        <span className="streak-icon" aria-hidden="true" />
        <h3>Chuỗi học tập</h3>
      </div>

      <div className="streak-main">
        <div className="streak-count">{currentStreak}</div>
        <div className="streak-subtitle">ngày liên tiếp</div>
      </div>

      <div className="streak-days">
        {dayItems.map((day, index) => (
          <span
            key={`streak-day-${day}`}
            className={`streak-day ${index < currentStreak ? 'active' : ''}`}
          >
            {day}
          </span>
        ))}
      </div>

      <p className="streak-note">Tiếp tục duy trì!</p>
    </Card>
  )
}

export default LearningStreak
