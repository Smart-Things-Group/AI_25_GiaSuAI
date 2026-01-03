/*
* Tìm kiếm khóa học nâng cao
*/
import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCourseStore } from '@stores/courseStore'
import './ExplorePage.css'

const categories = ['All', 'Programming', 'Math', 'Business', 'Languages']
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']
const tabs = [
  { key: 'all', label: 'Tất cả khóa học' },
  { key: 'enrolled', label: 'Đã đăng ký' },
  { key: 'available', label: 'Có sẵn' }
]

const levelLabels = {
  Beginner: 'Cơ bản',
  Intermediate: 'Trung bình',
  Advanced: 'Nâng cao'
}

const ExplorePage = () => {
  const { courses, isLoading, error, getCourses, setFilters: setStoreFilters } = useCourseStore()
  const [filters, setFilters] = useState({
    keyword: '',
    category: 'All',
    level: 'All',
    sort_by: 'created_at',
    sort_order: 'desc'
  })
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    const fetchCourses = () => {
      const queryParams = {
        search: filters.keyword || undefined,
        category: filters.category !== 'All' ? filters.category : undefined,
        level: filters.level !== 'All' ? filters.level : undefined,
        sortBy: filters.sort_by,
        order: filters.sort_order,
        limit: 12
      }
      getCourses(queryParams)
    }

    fetchCourses()
  }, [filters, getCourses])

  const filteredCourses = useMemo(() => {
    if (activeTab === 'enrolled') {
      return courses.filter((course) => course.is_enrolled)
    }
    if (activeTab === 'available') {
      return courses.filter((course) => !course.is_enrolled)
    }
    return courses
  }, [activeTab, courses])

  const handleKeywordChange = (event) => {
    setFilters((prev) => ({ ...prev, keyword: event.target.value }))
  }

  const handleSelectChange = (field) => (event) => {
    setFilters((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const levelText = (level) => levelLabels[level] || level

  return (
    <div className="explore-page">
      <header className="explore-header">
        <h1>Khóa học</h1>
        <p>Khám phá và học tập với hàng trăm khóa học chất lượng cao.</p>
      </header>

      <div className="explore-search-card">
        <div className="advanced-search-row">
          <div className="search-input-wrapper">
            <SearchIcon />
            <input
              type="text"
              placeholder="Tìm kiếm khóa học..."
              value={filters.keyword}
              onChange={handleKeywordChange}
            />
          </div>
          <select value={filters.category} onChange={handleSelectChange('category')}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'All' ? 'Tất cả danh mục' : category}
              </option>
            ))}
          </select>
          <select value={filters.level} onChange={handleSelectChange('level')}>
            {levels.map((level) => (
              <option key={level} value={level}>
                {level === 'All' ? 'Tất cả cấp độ' : levelText(level)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="explore-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={activeTab === tab.key ? 'active' : ''}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading && <p className="explore-message">Đang tải danh sách khóa học...</p>}
      {error && <p className="explore-message error">{error}</p>}

      {!isLoading && !error && (
        <div className="course-grid">
          {filteredCourses.map((course) => (
            <article key={course.id} className="course-card">
              <div className="course-card-visual">
                {course.thumbnail_url ? (
                  <img src={course.thumbnail_url} alt={course.title} />
                ) : (
                  <div className="course-placeholder">{course.title.charAt(0)}</div>
                )}
              </div>

              <div className="course-card-body">
                <div className="course-card-header">
                  <span className="badge level-badge">{levelText(course.level)}</span>
                  {course.is_enrolled && <span className="badge enrolled">Đã đăng ký</span>}
                </div>

                <h3>{course.title}</h3>
                <p className="course-description">{course.description}</p>

                <div className="course-meta">
                  <span>⏱ {Math.round(course.total_duration_minutes / 60)} giờ</span>
                  <span>👥 {course.enrollment_count} học viên</span>
                  <span>⭐ {course.avg_rating?.toFixed(1) ?? '4.5'}</span>
                </div>
                <p className="course-instructor">Giảng viên: {course.instructor_name}</p>

                <div className="course-footer">
                  <div>
                    <p className="course-price">{course.price_display || 'Miễn phí'}</p>
                    <small>
                      {course.total_modules} modules • {course.total_lessons} bài học
                    </small>
                  </div>
                  <Link
                    to={`/dashboard/courses/${course.id}`}
                    className={`course-action ${course.is_enrolled ? 'action-success' : 'action-secondary'}`}
                  >
                    {course.is_enrolled ? 'Tiếp tục học' : 'Xem chi tiết'}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

const SearchIcon = () => (
  <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
)

export default ExplorePage
