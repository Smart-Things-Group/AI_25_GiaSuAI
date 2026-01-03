import React, { useMemo, useRef, useState } from 'react'
import Card from '@components/ui/Card'

const LINE_COLORS = {
  hours: '#2563eb',
  lessons: '#16a34a',
  quizzes: '#f97316'
}

const ProgressChart = ({ chartData = [], summary, formatShortDate }) => {
  const [hoverIndex, setHoverIndex] = useState(null)
  const svgRef = useRef(null)

  const prepared = useMemo(() => {
    if (!chartData.length) {
      return { points: [], bestIndex: 0, width: 1000 }
    }

    const maxHours = Math.max(...chartData.map((item) => item.hours_spent), 1)
    const maxLessons = Math.max(...chartData.map((item) => item.lessons_completed), 1)
    const maxQuizzes = Math.max(...chartData.map((item) => item.quizzes_completed || 0), 1)
    const maxY = Math.max(maxHours, maxLessons, maxQuizzes)

    const width = 1000
    const height = 240
    const paddingX = 32
    const paddingY = 24
    const innerWidth = width - paddingX * 2
    const innerHeight = height - paddingY * 2

    const points = chartData.map((item, index) => {
      const x = paddingX + (index / Math.max(chartData.length - 1, 1)) * innerWidth
      const y = {
        hours: paddingY + (1 - (item.hours_spent / maxY)) * innerHeight,
        lessons: paddingY + (1 - (item.lessons_completed / maxY)) * innerHeight,
        quizzes: paddingY + (1 - ((item.quizzes_completed || 0) / maxY)) * innerHeight
      }

      return {
        date: item.date,
        hours: item.hours_spent,
        lessons: item.lessons_completed,
        quizzes: item.quizzes_completed || 0,
        x,
        y
      }
    })

    const bestIndex = points.reduce((best, current, index) => {
      const bestValue = points[best].hours + points[best].lessons
      const currentValue = current.hours + current.lessons
      return currentValue > bestValue ? index : best
    }, 0)

    return { points, bestIndex, width }
  }, [chartData])

  if (!chartData.length) {
    return null
  }

  const getPath = (metric) =>
    prepared.points
      .map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x} ${point.y[metric]}`)
      .join(' ')

  const activeIndex = hoverIndex != null ? hoverIndex : prepared.bestIndex
  const activePoint = prepared.points[activeIndex]

  return (
    <Card className="home-card" padding="lg">
      <div className="section-header">
        <h3>Biểu đồ tiến độ</h3>
        <span className="section-hint">{chartData.length} ngày gần đây</span>
      </div>

      <div
        className="line-chart"
        onMouseLeave={() => setHoverIndex(null)}
      >
        <svg
          ref={svgRef}
          width="100%"
          height="260"
          viewBox="0 0 1000 260"
          preserveAspectRatio="none"
        >
          {['hours', 'lessons', 'quizzes'].map((metric) => (
            <path
              key={metric}
              d={getPath(metric)}
              stroke={LINE_COLORS[metric]}
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          ))}

          {prepared.points.map((point, index) => (
            <g key={point.date}>
              {['hours', 'lessons', 'quizzes'].map((metric) => (
                <circle
                  key={metric}
                  cx={point.x}
                  cy={point.y[metric]}
                  r={hoverIndex === index ? 6 : 4}
                  fill={LINE_COLORS[metric]}
                  opacity={hoverIndex === index ? 1 : 0.8}
                  onMouseEnter={() => setHoverIndex(index)}
                />
              ))}
            </g>
          ))}

          {activePoint && (
            <>
              <circle
                cx={activePoint.x}
                cy={activePoint.y.hours}
                r={10}
                fill="rgba(37, 99, 235, 0.15)"
                stroke={LINE_COLORS.hours}
                strokeWidth="1"
              />
              <line
                x1={activePoint.x}
                x2={activePoint.x}
                y1="20"
                y2="220"
                stroke="rgba(148, 163, 184, 0.4)"
                strokeDasharray="6"
              />
              <g transform={`translate(${Math.min(activePoint.x + 14, 820)}, 30)`}>
                <rect width="180" height="96" rx="12" fill="rgba(15, 23, 42, 0.85)" />
                <text x="14" y="24" fill="#fff" fontSize="12" fontWeight="600">
                  {formatShortDate ? formatShortDate(activePoint.date) : activePoint.date}
                </text>
                <text x="14" y="44" fill="#93c5fd" fontSize="12">
                  Giờ học: {activePoint.hours}
                </text>
                <text x="14" y="62" fill="#86efac" fontSize="12">
                  Bài học: {activePoint.lessons}
                </text>
                <text x="14" y="80" fill="#fdba74" fontSize="12">
                  Quiz: {activePoint.quizzes}
                </text>
              </g>
            </>
          )}
        </svg>
      </div>

      <div className="chart-legend">
        <Legend color={LINE_COLORS.hours} label="Giờ học" />
        <Legend color={LINE_COLORS.lessons} label="Bài học" />
        <Legend color={LINE_COLORS.quizzes} label="Quiz" />
      </div>

      {summary && (
        <div className="chart-summary">
          <div>
            <p>Ngày học tốt nhất</p>
            <strong>
              {summary.best_day?.date
                ? formatShortDate
                  ? formatShortDate(summary.best_day.date)
                  : summary.best_day.date
                : '--'}
            </strong>
          </div>
          <div>
            <p>Tổng bài học</p>
            <strong>{summary.total_lessons}</strong>
          </div>
          <div>
            <p>Tổng giờ học</p>
            <strong>{summary.total_hours}</strong>
          </div>
        </div>
      )}
    </Card>
  )
}

const Legend = ({ color, label }) => (
  <div className="legend-item">
    <span style={{ backgroundColor: color }} />
    <p>{label}</p>
  </div>
)

export default ProgressChart
