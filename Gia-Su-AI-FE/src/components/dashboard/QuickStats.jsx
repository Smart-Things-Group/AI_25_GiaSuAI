import React from 'react'
import Card from '@components/ui/Card'

const QuickStats = ({ stats = [] }) => {
  return (
    <div className="quick-stats-grid">
      {stats.map((stat) => (
        <Card key={stat.id || stat.label} className="quick-stat-card" padding="lg">
          <p className="stat-label">{stat.label}</p>
          <p className="stat-value">{stat.value}</p>
          {stat.description && <p className="stat-description">{stat.description}</p>}
        </Card>
      ))}
    </div>
  )
}

export default QuickStats
