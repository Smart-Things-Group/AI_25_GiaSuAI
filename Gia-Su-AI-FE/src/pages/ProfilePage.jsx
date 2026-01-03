import React, { useEffect, useState } from 'react'
import Card, { CardHeader, CardBody } from '@components/ui/Card'
import Button from '@components/ui/Button'
import { authService } from '@services/authService'

/**
 * Component ProfilePage - Trang thông tin cá nhân
 */

const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await authService.getCurrentUser()
        setUser(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  return (
    <div className="profile-page">
      <div className="page-header">
        <h1>Thông tin cá nhân</h1>
        <p>Quản lý thông tin tài khoản của bạn</p>
      </div>

      <div className="profile-content">
        <Card>
          <CardHeader>
            <h3>Thông tin tài khoản</h3>
          </CardHeader>
          <CardBody>
            {loading ? (
              <div>Đang tải...</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : user ? (
              <div className="profile-info">
                <div className="info-item">
                  <label>Họ và tên:</label>
                  <span>{user.full_name}</span>
                </div>
                <div className="info-item">
                  <label>Email:</label>
                  <span>{user.email}</span>
                </div>
                <div className="info-item">
                  <label>Vai trò:</label>
                  <span>{user.role === 'student' ? 'Học viên' : user.role === 'instructor' ? 'Giảng viên' : 'Quản trị viên'}</span>
                </div>
                {user.avatar_url && (
                  <div className="info-item">
                    <label>Ảnh đại diện:</label>
                    <img src={user.avatar_url} alt="avatar" style={{ width: 64, height: 64, borderRadius: '50%' }} />
                  </div>
                )}
                {user.bio && (
                  <div className="info-item">
                    <label>Giới thiệu:</label>
                    <span>{user.bio}</span>
                  </div>
                )}
                {user.learning_preferences && user.learning_preferences.length > 0 && (
                  <div className="info-item">
                    <label>Sở thích học tập:</label>
                    <span>{user.learning_preferences.join(', ')}</span>
                  </div>
                )}
                {user.contact_info && (
                  <div className="info-item">
                    <label>Liên hệ:</label>
                    <span>{user.contact_info}</span>
                  </div>
                )}
              </div>
            ) : null}
            <div className="profile-actions">
              <Button variant="outline">Chỉnh sửa thông tin</Button>
              <Button variant="outline">Đổi mật khẩu</Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default ProfilePage