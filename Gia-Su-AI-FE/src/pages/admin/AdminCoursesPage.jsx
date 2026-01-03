import React, { useEffect, useMemo, useState } from 'react'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'
import adminCourseService from '@services/adminCourseService'
import './AdminCoursesPage.css'

const AdminCoursesPage = () => {
  const [courses, setCourses] = useState([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState('')
  const [createForm, setCreateForm] = useState({
    title: '',
    description: '',
    creator_id: '',
    creator_name: '',
    creator_email: '',
    category: '',
    level: 'Beginner',
    status: 'draft'
  })

  const filteredCourses = useMemo(() => {
    const kw = search.trim().toLowerCase()
    return courses.filter((c) => {
      const matchSearch =
        !kw ||
        c.title.toLowerCase().includes(kw) ||
        c.creator_name.toLowerCase().includes(kw) ||
        (c.category || '').toLowerCase().includes(kw)
      const matchStatus = statusFilter === 'all' || c.status === statusFilter
      const matchCategory = categoryFilter === 'all' || c.category === categoryFilter
      return matchSearch && matchStatus && matchCategory
    })
  }, [courses, search, statusFilter, categoryFilter])

  const summary = useMemo(() => {
    const total = courses.length
    const published = courses.filter((c) => c.status === 'active').length
    const drafts = courses.filter((c) => c.status === 'draft').length
    const archived = courses.filter((c) => c.status === 'archived').length
    const totalStudents = courses.reduce((sum, c) => sum + (c.enrollment_count || 0), 0)
    return { total, published, drafts, archived, totalStudents }
  }, [courses])

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await adminCourseService.listCourses({ limit: 50 })
        setCourses(res?.data || [])
      } catch (err) {
        setError(err?.message || 'Không thể tải danh sách khóa học (mock).')
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  const categories = Array.from(new Set(courses.map((c) => c.category).filter(Boolean)))

  return (
    <div className="admin-courses-page">
      <div className="courses-header">
        <div>
          <h2>Quản lý khóa học</h2>
        </div>
        <Button variant="primary" size="md" className="create-btn" onClick={() => setCreateOpen(true)}>
          <PlusIcon /> Tạo khóa học mới
        </Button>
      </div>

      <div className="stats-cards">
        <Card className="stat-card">
          <div className="stat-value">{summary.total}</div>
          <div className="stat-label">Tổng khóa học</div>
        </Card>
        <Card className="stat-card">
          <div className="stat-value success">{summary.published}</div>
          <div className="stat-label">Đã xuất bản</div>
        </Card>
        <Card className="stat-card">
          <div className="stat-value warning">{summary.drafts}</div>
          <div className="stat-label">Bản nháp</div>
        </Card>
        <Card className="stat-card">
          <div className="stat-value info">
            {summary.totalStudents.toLocaleString('vi-VN')}
          </div>
          <div className="stat-label">Tổng học viên</div>
        </Card>
      </div>

      <Card className="courses-card" padding="lg">
        <div className="courses-card-header">
          <div>
            <h3>Danh sách khóa học</h3>
            <p className="muted">Tìm kiếm, lọc và quản lý khóa học</p>
          </div>

          <div className="filters-row">
            <div className="search-input">
              <SearchIcon />
              <input
                type="text"
                placeholder="Tìm kiếm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="all">Tất cả danh mục</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">Tất cả</option>
              <option value="active">Đã xuất bản</option>
              <option value="draft">Bản nháp</option>
              <option value="archived">Lưu trữ</option>
            </select>
          </div>
        </div>

        {error && <div className="courses-error">{error}</div>}

        <div className="courses-grid table-like">
          {loading ? (
            <div className="loading">Đang tải...</div>
          ) : filteredCourses.length === 0 ? (
            <div className="empty-state">Chưa có khóa học nào.</div>
          ) : (
            <>
              <div className="table-head">
                <div>Khóa học</div>
                <div>Giảng viên</div>
                <div>Danh mục</div>
                <div>Cấp độ</div>
                <div>Trạng thái</div>
                <div>Học viên</div>
                <div>Cập nhật</div>
              </div>

              {filteredCourses.map((course) => (
                <div key={course.course_id} className="table-row">
                  <div>
                    <div className="course-title">{course.title}</div>
                    <div className="course-sub">
                      Tạo ngày{' '}
                      {new Date(course.created_at).toLocaleDateString('vi-VN')}
                    </div>
                  </div>

                  <div>{course.creator_name}</div>

                  <div>
                    <span className="pill">{course.category}</span>
                  </div>

                  <div>
                    <span className="pill">{course.level}</span>
                  </div>

                  <div>
                    <span className={`pill status-${course.status}`}>
                      {course.status === 'active'
                        ? 'Đã xuất bản'
                        : course.status === 'draft'
                        ? 'Bản nháp'
                        : 'Lưu trữ'}
                    </span>
                  </div>

                  <div className="icon-text">{course.enrollment_count}</div>

                  <div className="date-text">
                    {new Date(course.last_updated).toLocaleDateString('vi-VN')}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </Card>

      {createOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h3>Tạo khóa học mới</h3>
              <button className="close-btn" onClick={() => setCreateOpen(false)} aria-label="Đóng">
                ×
              </button>
            </div>
            <form
              className="form-grid"
              onSubmit={async (e) => {
                e.preventDefault()
                setCreating(true)
                setCreateError('')
                try {
                  const res = await adminCourseService.createCourse(createForm)
                  const newItem = {
                    course_id: res.course_id,
                    title: res.title,
                    creator_name: res.creator_name || '',
                    category: createForm.category,
                    level: createForm.level,
                    status: res.status || createForm.status,
                    enrollment_count: 0,
                    created_at: res.created_at,
                    last_updated: res.created_at
                  }
                  setCourses((prev) => [newItem, ...prev])
                  setCreateOpen(false)
                  setCreateForm({
                    title: '',
                    description: '',
                    creator_id: '',
                    creator_name: '',
                    creator_email: '',
                    category: '',
                    level: 'Beginner',
                    status: 'draft'
                  })
                } catch (err) {
                  setCreateError(err?.message || 'Không thể tạo khóa học (mock).')
                } finally {
                  setCreating(false)
                }
              }}
            >
              <label>
                Tiêu đề*
                <input
                  required
                  value={createForm.title}
                  onChange={(e) => setCreateForm((p) => ({ ...p, title: e.target.value }))}
                />
              </label>
              <label>
                Mô tả*
                <textarea
                  required
                  value={createForm.description}
                  onChange={(e) => setCreateForm((p) => ({ ...p, description: e.target.value }))}
                />
              </label>
              <label>
                Creator ID*
                <input
                  required
                  value={createForm.creator_id}
                  onChange={(e) => setCreateForm((p) => ({ ...p, creator_id: e.target.value }))}
                  placeholder="UUID giảng viên"
                />
              </label>
              <label>
                Tên giảng viên
                <input
                  value={createForm.creator_name}
                  onChange={(e) => setCreateForm((p) => ({ ...p, creator_name: e.target.value }))}
                />
              </label>
              <label>
                Email giảng viên
                <input
                  type="email"
                  value={createForm.creator_email}
                  onChange={(e) => setCreateForm((p) => ({ ...p, creator_email: e.target.value }))}
                />
              </label>
              <label>
                Danh mục*
                <input
                  required
                  value={createForm.category}
                  onChange={(e) => setCreateForm((p) => ({ ...p, category: e.target.value }))}
                />
              </label>
              <label>
                Cấp độ*
                <select
                  value={createForm.level}
                  onChange={(e) => setCreateForm((p) => ({ ...p, level: e.target.value }))}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </label>
              <label>
                Trạng thái
                <select
                  value={createForm.status}
                  onChange={(e) => setCreateForm((p) => ({ ...p, status: e.target.value }))}
                >
                  <option value="draft">draft</option>
                  <option value="active">active</option>
                </select>
              </label>
              {createError && <div className="form-error">{createError}</div>}
              <div className="modal-actions">
                <Button type="button" variant="secondary" onClick={() => setCreateOpen(false)}>
                  Hủy
                </Button>
                <Button type="submit" variant="primary" disabled={creating}>
                  {creating ? 'Đang tạo...' : 'Tạo khóa học'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminCoursesPage

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
)

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
)
