import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import searchService from '@services/searchService'
import './CourseSearchBar.css'

const MIN_QUERY_LENGTH = 2
const DEBOUNCE_TIME = 350

const typeLabels = {
  course: 'Khóa học',
  class: 'Lớp học',
  lesson: 'Bài học',
  user: 'Người dùng'
}

const CourseSearchBar = () => {
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!keyword.trim() || keyword.trim().length < MIN_QUERY_LENGTH) {
      setResults([])
      setError(null)
      return
    }

    const handler = setTimeout(async () => {
      try {
        setLoading(true)
        const response = await searchService.globalSearch({
          q: keyword.trim(),
          limit: 6
        })
        setResults(response.results || [])
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }, DEBOUNCE_TIME)

    return () => clearTimeout(handler)
  }, [keyword])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getResultLink = (item) => {
    switch (item.type) {
      case 'course':
        return `/dashboard/courses/${item.id}`
      case 'class':
        return `/dashboard/classes/${item.id}`
      case 'lesson':
        return `/dashboard/lessons/${item.id}`
      case 'user':
        return `/dashboard/users/${item.id}`
      default:
        return '#'
    }
  }

  const renderResults = () => {
    if (error) {
      return <p className="search-message error">{error}</p>
    }

    if (loading) {
      return <p className="search-message">Đang tìm kiếm...</p>
    }

    if (keyword.trim().length < MIN_QUERY_LENGTH) {
      return <p className="search-message">Nhập ít nhất {MIN_QUERY_LENGTH} ký tự để tìm kiếm</p>
    }

    if (!results.length) {
      return <p className="search-message">Không có kết quả phù hợp với “{keyword}”.</p>
    }

    return results.map((item) => (
      <Link
        key={`${item.type}-${item.id}`}
        to={getResultLink(item)}
        className="search-result-item"
        onClick={() => setOpen(false)}
      >
        <div>
          <p className="result-title">
            {item.title}
            <span className="result-type">{typeLabels[item.type] || item.type}</span>
          </p>
          <p className="result-meta">{item.description}</p>
          {item.highlight && <p className="result-highlight">{item.highlight}</p>}
        </div>
        <span className="result-pill">{Math.round(item.relevance_score)}%</span>
      </Link>
    ))
  }

  return (
    <div className="course-search" ref={containerRef}>
      <div className="global-search-field">
        <SearchIcon />
        <input
          type="text"
          placeholder="Tìm kiếm khóa học, bài học..."
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          onFocus={() => setOpen(true)}
        />
        {loading && <div className="search-spinner"></div>}
      </div>

      {open && <div className="course-search-results">{renderResults()}</div>}
    </div>
  )
}

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
)

export default CourseSearchBar
