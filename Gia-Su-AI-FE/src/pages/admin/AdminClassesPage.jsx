import React, { useEffect, useMemo, useState } from 'react'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'
import adminClassService from '@services/adminClassService'
import './AdminClassesPage.css'

const AdminClassesPage = () => {
  const [classes, setClasses] = useState([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const filtered = useMemo(() => {
    const kw = search.trim().toLowerCase()
    return classes.filter((c) => {
      const matchSearch =
        !kw ||
        c.class_name.toLowerCase().includes(kw) ||
        c.instructor_name.toLowerCase().includes(kw) ||
        c.course_title.toLowerCase().includes(kw)
      const matchStatus = statusFilter === 'all' || c.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [classes, search, statusFilter])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await adminClassService.listClasses({ limit: 50 })
        setClasses(res?.data || [])
      } catch (err) {
        setError(err?.message || 'Không thể tải danh sách lớp (mock).')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="admin-classes-page">
      <div className="classes-header">
        <div>
          <h2>Giám sát lớp học</h2>
          <p>Xem danh sách lớp theo schema admin (mock)</p>
        </div>
      </div>

      <Card className="classes-card" padding="lg">
        <div className="classes-card-header">
          <div>
            <h3>Danh sách lớp học</h3>
            <p className="muted">Lớp, khóa học, giảng viên, trạng thái</p>
          </div>
          <div className="filters-row">
            <div className="search-input">
              <SearchIcon />
              <input
                type="text"
                placeholder="Tìm kiếm lớp hoặc giảng viên..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">Tất cả</option>
              <option value="active">Đang hoạt động</option>
              <option value="completed">Đã hoàn thành</option>
            </select>
          </div>
        </div>

        {error && <div className="classes-error">{error}</div>}

        <div className="classes-table">
          <div className="table-head">
            <div>Lớp học</div>
            <div>Khóa học</div>
            <div>Giảng viên</div>
            <div>Học viên</div>
            <div>Trạng thái</div>
            <div>Ngày tạo</div>
          </div>

          {loading ? (
            <div className="loading">Đang tải...</div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">Không có lớp nào.</div>
          ) : (
            filtered.map((item) => (
              <div key={item.class_id} className="table-row">
                <div>
                  <div className="title">{item.class_name}</div>
                </div>
                <div>{item.course_title}</div>
                <div>{item.instructor_name}</div>
                <div>{item.student_count}</div>
                <div>
                  <span className={`pill status-${item.status}`}>
                    {item.status === 'active' ? 'Active' : 'Completed'}
                  </span>
                </div>
                <div>{new Date(item.created_at).toLocaleDateString('vi-VN')}</div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  )
}

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
)

export default AdminClassesPage
