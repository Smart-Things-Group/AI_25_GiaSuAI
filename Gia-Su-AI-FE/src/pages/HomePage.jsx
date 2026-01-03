import React, { useEffect, useMemo, useState } from 'react'
import { useAuthStore } from '@stores/authStore'
import dashboardService from '@services/dashboardService'
import WelcomeBanner from '@components/dashboard/WelcomeBanner'
import QuickStats from '@components/dashboard/QuickStats'
import InProgressCourses from '@components/dashboard/InProgressCourses'
import LearningStreak from '@components/dashboard/LearningStreak'
import PendingQuizzes from '@components/dashboard/PendingQuizzes'
import ProgressChart from '@components/dashboard/ProgressChart'
import './HomePage.css'

const HomePage = () => {
  const { user } = useAuthStore()
  const [overview, setOverview] = useState(null)
  const [stats, setStats] = useState(null)
  const [progress, setProgress] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let subscribed = true

    const fetchData = async () => {
      try {
        setLoading(true)
        const [overviewRes, statsRes, progressRes] = await Promise.all([
          dashboardService.getStudentDashboard(),
          dashboardService.getLearningStats(),
          dashboardService.getProgressChart({ time_range: '30d' })
        ])

        if (!subscribed) return

        setOverview(overviewRes)
        setStats(statsRes)
        setProgress(progressRes)
        setError(null)
      } catch (err) {
        if (subscribed) {
          setError(err.message || 'Khong the tai du lieu trang chu')
        }
      } finally {
        if (subscribed) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      subscribed = false
    }
  }, [])

  const weeklyHours = useMemo(() => {
    if (!progress?.chart_data) return 0
    const sorted = [...progress.chart_data].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
    const recent = sorted.slice(-7)
    const sum = recent.reduce((total, item) => total + (item.hours_spent || 0), 0)
    return Number(sum.toFixed(1))
  }, [progress])

  const streak = useMemo(() => calculateStreak(progress?.chart_data), [progress])

  const quickStats = useMemo(() => {
    if (!stats) {
      return []
    }

    return [
      {
        label: 'Khóa học đang học',
        value: formatNumber(stats.in_progress_courses || 0),
        description: 'Đang mở'
      },
      {
        label: 'Giờ học tuần này',
        value: `${weeklyHours}h`,
        description: '7 ngày gần nhất'
      },
      {
        label: 'Quiz hoàn thành',
        value: formatNumber(stats.quizzes_passed || 0),
        description: `${stats.quizzes_failed || 0} quiz chưa đạt`
      },
      {
        label: 'Điểm trung bình',
        value: `${stats.avg_quiz_score || 0}%`,
        description: 'Quiz gần đây'
      }
    ]
  }, [stats, weeklyHours])

  const formatDateTime = (value) => {
    if (!value) return 'Không xác định'
    const formatter = new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
    return formatter.format(new Date(value))
  }

  const formatShortDate = (value) => {
    if (!value) return ''
    const formatter = new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: 'short'
    })
    return formatter.format(new Date(value))
  }

  return (
    <div className="home-page">

      {loading ? (
        <div className="home-loading">Đang tải dữ liệu trang chủ...</div>
      ) : (
        <>
          <WelcomeBanner user={user} nextCourse={overview?.in_progress_courses?.[0]} />

          <QuickStats stats={quickStats} />

          <div className="home-grid">
            <div className="home-column">
              <InProgressCourses
                courses={overview?.in_progress_courses}
                formatDateTime={formatDateTime}
              />
              <PendingQuizzes
                quizzes={overview?.pending_quizzes}
                formatDateTime={formatDateTime}
              />
            </div>
            <div className="home-column">
              <LearningStreak
                streak={streak}
              />
            </div>
          </div>

          <ProgressChart
            chartData={progress?.chart_data}
            summary={progress?.summary}
            formatShortDate={formatShortDate}
          />
        </>
      )}
    </div>
  )
}

const formatNumber = (value) => {
  return new Intl.NumberFormat('vi-VN').format(value || 0)
}

const calculateStreak = (chartData = []) => {
  if (!chartData.length) {
    return { current: 0, best: 0 }
  }

  const sorted = [...chartData]
    .map((item) => ({
      ...item,
      dateObj: new Date(item.date),
      hasLessons: (item.lessons_completed || 0) > 0
    }))
    .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())

  let best = 0
  let running = 0
  let previousDate = null

  sorted.forEach((item) => {
    if (!item.hasLessons) {
      running = 0
      previousDate = item.dateObj
      return
    }

    if (!previousDate) {
      running = 1
    } else {
      const diffDays = Math.round(
        (item.dateObj.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24)
      )
      running = diffDays === 1 ? running + 1 : 1
    }

    previousDate = item.dateObj
    best = Math.max(best, running)
  })

  // Tính chuỗi hiện tại tính từ ngày mới nhất
  let current = 0
  for (let i = sorted.length - 1; i >= 0; i--) {
    const item = sorted[i]
    if (!item.hasLessons) break

    if (current === 0) {
      current = 1
    } else {
      const next = sorted[i + 1]
      const diffDays = next
        ? Math.round((next.dateObj.getTime() - item.dateObj.getTime()) / (1000 * 60 * 60 * 24))
        : 0
      if (diffDays === 1) {
        current += 1
      } else {
        break
      }
    }
  }

  return { current, best }
}

export default HomePage
