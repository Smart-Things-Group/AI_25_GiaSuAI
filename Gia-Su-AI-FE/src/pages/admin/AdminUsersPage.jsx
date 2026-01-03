import React, { useMemo, useState } from 'react'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'
import {
  adminUsersMock,
  getAdminUserDetailMock,
  mockCreateAdminUser,
  mockUpdateAdminUser,
  mockChangeAdminUserRole,
  mockResetAdminUserPassword
} from '@/mocks/mockAdminUsers'
import './AdminUsersPage.css'

const roleLabel = {
  student: 'Học viên',
  instructor: 'Giảng viên',
  admin: 'Quản trị viên'
}

const statusLabel = {
  active: 'Hoạt động',
  inactive: 'Không hoạt động',
  banned: 'Bị khóa'
}

const AdminUsersPage = () => {
  const [users, setUsers] = useState(adminUsersMock?.data || [])
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('created_at')
  const [order, setOrder] = useState('desc')
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [createForm, setCreateForm] = useState({
    full_name: '',
    email: '',
    password: '',
    role: 'student',
    status: 'active'
  })
  const [createResult, setCreateResult] = useState(null)
  const [createError, setCreateError] = useState(null)
  const [creating, setCreating] = useState(false)
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [editForm, setEditForm] = useState({ full_name: '', email: '', status: 'active' })
  const [roleChange, setRoleChange] = useState('')
  const [resetPassword, setResetPassword] = useState('')
  const [actionError, setActionError] = useState(null)
  const [actionSuccess, setActionSuccess] = useState('')

  const summaryFromMock = adminUsersMock?.summary || {}

  const summary = useMemo(() => {
    const counts = users.reduce(
      (acc, user) => {
        acc.total += 1
        if (user.status === 'active') acc.active += 1
        if (user.role === 'instructor') acc.instructor += 1
        if (user.role === 'admin') acc.admin += 1
        return acc
      },
      { total: 0, active: 0, instructor: 0, admin: 0 }
    )

    return {
      total_users: counts.total,
      active_users: counts.active,
      instructors: counts.instructor,
      admins: counts.admin,
      new_users_this_month: summaryFromMock.new_users_this_month ?? 0
    }
  }, [users, summaryFromMock])

  const filteredUsers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    const sorted = [...users].sort((a, b) => {
      const orderFactor = order === 'asc' ? 1 : -1
      if (sortBy === 'name') {
        return a.full_name.localeCompare(b.full_name, 'vi') * orderFactor
      }
      if (sortBy === 'last_login') {
        return (new Date(a.last_login) - new Date(b.last_login)) * orderFactor
      }
      return (new Date(a.created_at) - new Date(b.created_at)) * orderFactor
    })

    return sorted.filter((user) => {
      const matchRole = roleFilter === 'all' || user.role === roleFilter
      const matchStatus = statusFilter === 'all' || user.status === statusFilter
      const matchSearch =
        !normalizedSearch ||
        user.full_name.toLowerCase().includes(normalizedSearch) ||
        user.email.toLowerCase().includes(normalizedSearch)

      return matchRole && matchStatus && matchSearch
    })
  }, [users, search, roleFilter, statusFilter, sortBy, order])

  const selectedBaseUser = useMemo(
    () => users.find((u) => u.user_id === selectedUserId),
    [users, selectedUserId]
  )

  const selectedDetail = useMemo(() => {
    if (!selectedUserId) return null
    const detail = getAdminUserDetailMock(selectedUserId)
    if (detail) return detail
    if (!selectedBaseUser) return null
    return {
      user_id: selectedBaseUser.user_id,
      full_name: selectedBaseUser.full_name,
      email: selectedBaseUser.email,
      role: selectedBaseUser.role,
      status: selectedBaseUser.status,
      created_at: selectedBaseUser.created_at,
      last_login_at: selectedBaseUser.last_login,
      profile: selectedBaseUser.profile || {},
      activity_summary: selectedBaseUser.activity_summary || {}
    }
  }, [selectedUserId, selectedBaseUser])

  const openDetail = (userId) => {
    setSelectedUserId(userId)
    resetActionStates()
    setShowUpdateForm(false)
  }
  const closeDetail = () => {
    setSelectedUserId(null)
    resetActionStates()
    setShowUpdateForm(false)
  }
  const resetActionStates = () => {
    setRoleChange('')
    setResetPassword('')
    setActionError(null)
    setActionSuccess('')
  }

  const openCreateModal = () => {
    setCreateModalOpen(true)
    setCreateResult(null)
    setCreateForm({
      full_name: '',
      email: '',
      password: '',
      role: 'student',
      status: 'active'
    })
  }

  const closeCreateModal = () => {
    setCreateModalOpen(false)
    setCreateResult(null)
  }

  const handleCreateChange = (field, value) => {
    setCreateForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleCreateSubmit = async (e) => {
    e.preventDefault()
    setCreating(true)
    setCreateError(null)
    setCreateResult(null)

    try {
      const response = mockCreateAdminUser({
        full_name: createForm.full_name,
        email: createForm.email,
        password: createForm.password,
        role: createForm.role,
        status: createForm.status
      })
      setCreateResult(response)

      const newUser = {
        user_id: response.user_id,
        full_name: response.full_name,
        email: response.email,
        role: response.role,
        status: response.status,
        created_at: response.created_at,
        last_login: null,
        courses_enrolled: 0,
        classes_created: 0,
        profile: {},
        activity_summary: {
          courses_enrolled: 0,
          classes_created: 0,
          total_study_hours: 0,
          login_streak_days: 0
        }
      }
      setUsers((prev) => [newUser, ...prev])
      setSelectedUserId(response.user_id)
    } catch (err) {
      setCreateError(err?.message || 'Đã xảy ra lỗi')
    } finally {
      setCreating(false)
    }
  }

  const handleOpenUpdateForm = () => {
    if (!selectedDetail) return
    setEditForm({
      full_name: selectedDetail.full_name,
      email: selectedDetail.email,
      status: selectedDetail.status
    })
    setRoleChange(selectedDetail.role)
    setResetPassword('')
    setActionError(null)
    setActionSuccess('')
    setShowUpdateForm(true)
  }

  const handleSaveAll = (e) => {
    e.preventDefault()
    if (!selectedDetail) return
    setActionError(null)
    setActionSuccess('')

    const updates = []

    try {
      const infoRes = mockUpdateAdminUser({
        user_id: selectedDetail.user_id,
        full_name: editForm.full_name,
        email: editForm.email,
        status: editForm.status
      })
      updates.push(infoRes.message)

      if (roleChange && roleChange !== selectedDetail.role) {
        const roleRes = mockChangeAdminUserRole({
          user_id: selectedDetail.user_id,
          old_role: selectedDetail.role,
          new_role: roleChange
        })
        updates.push(roleRes.message)
      }

      if (resetPassword) {
        if (resetPassword.length < 8) {
          setActionError('Mật khẩu tối thiểu 8 ký tự')
          return
        }
        const passRes = mockResetAdminUserPassword({ user_id: selectedDetail.user_id })
        updates.push(passRes.message)
      }

      const newRole = roleChange || selectedDetail.role
      setUsers((prev) =>
        prev.map((u) =>
          u.user_id === selectedDetail.user_id
            ? {
                ...u,
                full_name: editForm.full_name,
                email: editForm.email,
                status: editForm.status,
                role: newRole
              }
            : u
        )
      )
      setSelectedUserId(selectedDetail.user_id)
      setActionSuccess(updates.join(' · '))
      setShowUpdateForm(false)
    } catch (err) {
      setActionError(err?.message || 'Đã xảy ra lỗi')
    }
  }

  const formatDate = (value) => {
    if (!value) return '—'
    const date = new Date(value)
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`
  }

  const formatDateTime = (value) => {
    if (!value) return '—'
    const date = new Date(value)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${day}/${month}/${year} ${hours}:${minutes}`
  }

  const renderCourseInfo = (user) => {
    if (user.role === 'student') return `${user.courses_enrolled ?? 0} khóa học`
    if (user.role === 'instructor') return `${user.classes_created ?? 0} lớp`
    return '—'
  }

  const renderAvatar = (user) => {
    const avatarUrl = user?.profile?.avatar_url
    if (avatarUrl) {
      return <img src={avatarUrl} alt={user.full_name} />
    }
    const initials = user.full_name
      .split(' ')
      .filter(Boolean)
      .slice(-2)
      .map((part) => part[0])
      .join('')
      .toUpperCase()
    return <span>{initials}</span>
  }

  return (
    <div className="admin-users-page">
      <div className="users-page-header">
        <div>
          <h2>Quản lý người dùng</h2>
          <p>Quản lý tài khoản và quyền hạn người dùng</p>
        </div>
        <Button variant="primary" size="md" className="add-user-btn" onClick={openCreateModal}>
          <AddUserIcon />
          Thêm người dùng
        </Button>
      </div>

      <div className="users-summary-grid">
        <Card className="summary-card" padding="lg">
          <div className="summary-value">{summary.total_users}</div>
          <div className="summary-label">Tổng người dùng</div>
        </Card>
        <Card className="summary-card" padding="lg">
          <div className="summary-value active">{summary.active_users}</div>
          <div className="summary-label">Đang hoạt động</div>
        </Card>
        <Card className="summary-card" padding="lg">
          <div className="summary-value instructor">{summary.instructors}</div>
          <div className="summary-label">Giảng viên</div>
        </Card>
        <Card className="summary-card" padding="lg">
          <div className="summary-value admin">{summary.admins}</div>
          <div className="summary-label">Quản trị viên</div>
        </Card>
      </div>

      <Card className="users-table-card" padding="lg">
        <div className="users-filters">
          <div className="search-input">
            <SearchIcon />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filters-row">
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
              <option value="all">Tất cả vai trò</option>
              <option value="student">Học viên</option>
              <option value="instructor">Giảng viên</option>
              <option value="admin">Quản trị viên</option>
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
              <option value="banned">Bị khóa</option>
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="created_at">Ngày tham gia</option>
              <option value="last_login">Lần đăng nhập cuối</option>
              <option value="name">Tên</option>
            </select>
            <select value={order} onChange={(e) => setOrder(e.target.value)}>
              <option value="desc">Mới nhất</option>
              <option value="asc">Cũ nhất</option>
            </select>
          </div>
        </div>

        <div className="users-table" role="table" aria-label="Danh sách người dùng">
          <div className="table-head" role="row">
            <div className="col-user" role="columnheader">Người dùng</div>
            <div className="col-role" role="columnheader">Vai trò</div>
            <div className="col-status" role="columnheader">Trạng thái</div>
            <div className="col-date" role="columnheader">Ngày tham gia</div>
            <div className="col-course" role="columnheader">Khóa học</div>
            <div className="col-actions" role="columnheader">Thao tác</div>
          </div>

          <div className="table-body">
            {filteredUsers.map((user) => (
              <div
                className="table-row clickable"
                key={user.user_id}
                role="row"
                tabIndex={0}
                onClick={() => openDetail(user.user_id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    openDetail(user.user_id)
                  }
                }}
              >
                <div className="col-user" role="cell">
                  <div className="user-info">
                    <div className={`user-avatar ${user?.profile?.avatar_url ? 'has-img' : ''}`}>
                      {renderAvatar(user)}
                    </div>
                    <div>
                      <div className="user-name">{user.full_name}</div>
                      <div className="user-email">{user.email}</div>
                    </div>
                  </div>
                </div>
                <div className="col-role" role="cell">
                  <span className={`badge badge-role role-${user.role}`}>
                    {roleLabel[user.role]}
                  </span>
                </div>
                <div className="col-status" role="cell">
                  <span className={`badge badge-status status-${user.status}`}>
                    {statusLabel[user.status]}
                  </span>
                </div>
                <div className="col-date" role="cell">{formatDate(user.created_at)}</div>
                <div className="col-course" role="cell">{renderCourseInfo(user)}</div>
                <div className="col-actions" role="cell">
                  <button className="icon-button" aria-label="Thao tác">
                    <MoreIcon />
                  </button>
                </div>
              </div>
            ))}

            {filteredUsers.length === 0 && (
              <div className="empty-state">
                <p>Không tìm thấy người dùng phù hợp.</p>
              </div>
            )}
          </div>
        </div>
      </Card>

      {createModalOpen && (
        <div className="user-detail-modal" role="dialog" aria-modal="true">
          <div className="modal-backdrop" onClick={closeCreateModal} />
          <div className="modal-content">
            <button className="modal-close" aria-label="Đóng" onClick={closeCreateModal}>
              ×
            </button>
            <h3 className="modal-title">Thêm người dùng mới</h3>
            <form className="form-grid" onSubmit={handleCreateSubmit}>
              <div className="form-group">
                <label>Họ và tên *</label>
                <input
                  type="text"
                  value={createForm.full_name}
                  onChange={(e) => handleCreateChange('full_name', e.target.value)}
                  required
                  placeholder="Nhập họ và tên"
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={createForm.email}
                  onChange={(e) => handleCreateChange('email', e.target.value)}
                  required
                  placeholder="email@example.com"
                />
              </div>
              <div className="form-group">
                <label>Mật khẩu *</label>
                <input
                  type="password"
                  value={createForm.password}
                  onChange={(e) => handleCreateChange('password', e.target.value)}
                  required
                  minLength={8}
                  placeholder="Tối thiểu 8 ký tự"
                />
              </div>
              <div className="form-group">
                <label>Vai trò</label>
                <select
                  value={createForm.role}
                  onChange={(e) => handleCreateChange('role', e.target.value)}
                >
                  <option value="student">Học viên</option>
                  <option value="instructor">Giảng viên</option>
                  <option value="admin">Quản trị viên</option>
                </select>
              </div>
              <div className="form-group">
                <label>Trạng thái</label>
                <select
                  value={createForm.status}
                  onChange={(e) => handleCreateChange('status', e.target.value)}
                >
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Không hoạt động</option>
                </select>
              </div>
              <div className="modal-actions">
                <Button type="submit" variant="primary" disabled={creating}>
                  {creating ? 'Đang tạo...' : 'Tạo người dùng'}
                </Button>
              </div>

              {createError && <p className="form-error">{createError}</p>}
            </form>

              {createResult && (
                <div className="create-result">
                  <div className="result-header">
                    <h4>Kết quả</h4>
                    <span className="badge badge-status status-active">201 Created</span>
                  </div>
                  <p className="info-value">{createResult.message}</p>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">User ID</span>
                    <span className="info-value">{createResult.user_id}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Họ tên</span>
                    <span className="info-value">{createResult.full_name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email</span>
                    <span className="info-value">{createResult.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Vai trò</span>
                    <span className="info-value">{roleLabel[createResult.role]}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Trạng thái</span>
                    <span className="info-value">{statusLabel[createResult.status]}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Ngày tạo</span>
                    <span className="info-value">{formatDateTime(createResult.created_at)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedDetail && !createModalOpen && (
        <div className="user-detail-modal" role="dialog" aria-modal="true">
          <div className="modal-backdrop" onClick={closeDetail} />
          <div className="modal-content">
            <button className="modal-close" aria-label="Đóng" onClick={closeDetail}>
              ×
            </button>
            <div className="modal-header">
              <div className={`user-avatar large ${selectedDetail?.profile?.avatar_url ? 'has-img' : ''}`}>
                {selectedDetail?.profile?.avatar_url ? (
                  <img src={selectedDetail.profile.avatar_url} alt={selectedDetail.full_name} />
                ) : (
                  <span>
                    {selectedDetail.full_name
                      .split(' ')
                      .filter(Boolean)
                      .slice(-2)
                      .map((part) => part[0])
                      .join('')
                      .toUpperCase()}
                  </span>
                )}
              </div>
              <div className="modal-user-meta">
                <h3>{selectedDetail.full_name}</h3>
                <p>{selectedDetail.email}</p>
                <div className="modal-badges">
                  <span className={`badge badge-role role-${selectedDetail.role}`}>
                    {roleLabel[selectedDetail.role]}
                  </span>
                  <span className={`badge badge-status status-${selectedDetail.status}`}>
                    {statusLabel[selectedDetail.status]}
                  </span>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="update-info-btn"
                    onClick={handleOpenUpdateForm}
                  >
                    Cập nhật thông tin
                  </Button>
                </div>
              </div>
            </div>

            <div className="modal-body">
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Vai trò</span>
                  <span className="info-value">{roleLabel[selectedDetail.role]}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Trạng thái</span>
                  <span className="info-value">{statusLabel[selectedDetail.status]}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Ngày tạo</span>
                  <span className="info-value">{formatDate(selectedDetail.created_at)}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Đăng nhập gần nhất</span>
                  <span className="info-value">{formatDateTime(selectedDetail.last_login_at)}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Số điện thoại</span>
                  <span className="info-value">{selectedDetail.profile?.phone || 'Chưa cập nhật'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Học viên (đăng ký)</span>
                  <span className="info-value">
                    {selectedDetail.activity_summary?.courses_enrolled ?? '—'}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Lớp đã tạo</span>
                  <span className="info-value">
                    {selectedDetail.activity_summary?.classes_created ?? '—'}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Giờ học</span>
                  <span className="info-value">
                    {selectedDetail.activity_summary?.total_study_hours ?? '—'} giờ
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Chuỗi đăng nhập</span>
                  <span className="info-value">
                    {selectedDetail.activity_summary?.login_streak_days ?? '—'} ngày
                  </span>
                </div>
              </div>

              {selectedDetail.profile?.bio && (
                <div className="info-item full">
                  <span className="info-label">Giới thiệu</span>
                  <p className="info-value">{selectedDetail.profile.bio}</p>
                </div>
              )}

              {showUpdateForm && (
                <form className="form-grid action-form" onSubmit={handleSaveAll}>
                  <div className="form-group">
                    <label>Họ tên</label>
                    <input
                      type="text"
                      value={editForm.full_name}
                      onChange={(e) => setEditForm((p) => ({ ...p, full_name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm((p) => ({ ...p, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Trạng thái</label>
                    <select
                      value={editForm.status}
                      onChange={(e) => setEditForm((p) => ({ ...p, status: e.target.value }))}
                    >
                      <option value="active">Hoạt động</option>
                      <option value="inactive">Không hoạt động</option>
                      <option value="banned">Bị khóa</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Vai trò</label>
                    <select value={roleChange} onChange={(e) => setRoleChange(e.target.value)}>
                      <option value="student">Học viên</option>
                      <option value="instructor">Giảng viên</option>
                      <option value="admin">Quản trị viên</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Mật khẩu mới</label>
                    <input
                      type="password"
                      value={resetPassword}
                      onChange={(e) => setResetPassword(e.target.value)}
                      placeholder="Tối thiểu 8 ký tự"
                    />
                  </div>
                  <div className="modal-actions">
                    <Button type="submit" variant="secondary" size="sm" className="save-info-btn">
                      Lưu thông tin
                    </Button>
                  </div>
                </form>
              )}

              {actionError && <p className="form-error">{actionError}</p>}
              {actionSuccess && <p className="form-success">{actionSuccess}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
)

const AddUserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <line x1="19" y1="8" x2="19" y2="14"></line>
    <line x1="22" y1="11" x2="16" y2="11"></line>
  </svg>
)

const MoreIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="19" cy="12" r="1"></circle>
    <circle cx="5" cy="12" r="1"></circle>
  </svg>
)

export default AdminUsersPage
