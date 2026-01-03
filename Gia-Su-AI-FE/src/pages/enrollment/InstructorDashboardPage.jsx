import React from 'react'
import Card, { CardHeader, CardBody } from '@components/ui/Card'
import './DashboardPage.css'

const featuredCourses = [
  { title: 'Lập trình Python nâng cao', tag: 'Công khai', students: '234 học viên', price: '₫1.25M', rating: 4.9, time: '2 ngày trước' },
  { title: 'Machine Learning cơ bản', tag: 'Công khai', students: '189 học viên', price: '₫8.9M', rating: 4.7, time: '5 ngày trước' },
  { title: 'React & Next.js Full Stack', tag: 'Riêng tư', students: '156 học viên', price: '₫7.2M', rating: 4.8, time: '1 tuần trước' }
]

const quickActions = ['Tạo khóa học', 'Quản lý học viên', 'Xem thống kê', 'Cài đặt thanh toán']
const activities = [
  '15 học viên mới đăng ký khóa Python nâng cao · 30 phút trước',
  'Nhận 5 đánh giá mới (4.8 sao trung bình) · 2 giờ trước',
  '8 câu hỏi mới từ học viên chờ phản hồi · 3 giờ trước',
  'Cập nhật nội dung khóa React & Next.js · 5 giờ trước'
]

const achievements = [
  { title: 'Giảng viên xuất sắc', desc: 'Top 10% giảng viên', icon: '🏆', background: '#fff8e1' },
  { title: '1000+ học viên', desc: 'Đạt mốc quan trọng', icon: '🎯', background: '#e3f2fd' }
]

const InstructorDashboardPage = () => {
  return (
    <div className="dashboard-page" style={{ padding: '24px' }}>
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1>Dashboard</h1>
          <p>Chào mừng bạn đến với trang quản lý</p>
        </div>
        <button style={{ padding: '8px 16px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500 }}>
          Thêm học sinh
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '40px' }}>
        <Card><CardHeader><h3>Khóa học của tôi</h3></CardHeader><CardBody><p>Quản lý các khóa học bạn đã đăng ký</p></CardBody></Card>
        <Card><CardHeader><h3>Tiến độ học tập</h3></CardHeader><CardBody><p>Theo dõi tiến độ học tập của bạn</p></CardBody></Card>
        <Card><CardHeader><h3>Bài quiz</h3></CardHeader><CardBody><p>Thực hành với các bài quiz</p></CardBody></Card>
        <Card><CardHeader><h3>Trò chuyện</h3></CardHeader><CardBody><p>Tương tác với AI và cộng đồng</p></CardBody></Card>
        <Card>
          <CardHeader><h3>Giảng viên</h3></CardHeader>
          <CardBody>
            <div><strong>Văn Thị Mỹ Duyên</strong></div>
            <p style={{ margin: '6px 0', fontSize: '14px' }}>Chuyên gia AI với 8 năm kinh nghiệm phát triển trợ lý ảo và hệ thống hội thoại.</p>
            <span style={{ color: '#888', fontSize: '13px' }}>8+ năm kinh nghiệm</span>
          </CardBody>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div>
          <Card style={{ marginBottom: '24px' }}>
            <CardHeader>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Khóa học của bạn</h3>
                <button style={{ border: 'none', background: 'none', color: '#1976d2', cursor: 'pointer', fontWeight: '500' }}>
                  Xem tất cả
                </button>
              </div>
            </CardHeader>
            <CardBody>
              {featuredCourses.map((course, index) => (
                <div key={course.title} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', borderBottom: index < featuredCourses.length - 1 ? '1px solid #eee' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: 64, height: 64, background: '#e0e0e0', borderRadius: 10 }}></div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '15px' }}>
                        {course.title}
                        <span style={{ marginLeft: 10, padding: '3px 9px', borderRadius: 6, fontSize: '11px', fontWeight: '500', background: course.tag === 'Công khai' ? '#e8f5e9' : '#fff3e0', color: course.tag === 'Công khai' ? '#2e7d32' : '#ef6c00' }}>
                          {course.tag}
                        </span>
                      </div>
                      <div style={{ fontSize: '13.5px', color: '#666', marginTop: '4px' }}>
                        {course.students} • {course.price} ★ {course.rating} • {course.time}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      title="Xem chi tiết"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '0 14px',
                        height: 38,
                        borderRadius: 12,
                        border: '1px solid #dfe3eb',
                        background: '#fff',
                        cursor: 'pointer',
                        fontWeight: 600,
                        color: '#111'
                      }}
                    >
                      <EyeIcon />
                      <span>Xem</span>
                    </button>
                    <button
                      title="Chỉnh sửa khóa học"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '0 14px',
                        height: 38,
                        borderRadius: 12,
                        border: '1px solid #dfe3eb',
                        background: '#fff',
                        cursor: 'pointer',
                        fontWeight: 600,
                        color: '#111'
                      }}
                    >
                      <EditPenIcon />
                      <span>Chỉnh sửa</span>
                    </button>
                    <button
                      title="Xóa khóa học"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '0 12px',
                        height: 38,
                        borderRadius: 12,
                        border: '1px solid #fca5a5',
                        background: '#fff7f7',
                        cursor: 'pointer',
                        fontWeight: 600,
                        color: '#d90429'
                      }}
                    >
                      <TrashIcon />
                      <span>Thùng rác</span>
                    </button>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader><h3>Hành động nhanh</h3></CardHeader>
            <CardBody>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
                {quickActions.map((item) => (
                  <button key={item} style={{ padding: '20px 10px', border: '1px solid #ddd', borderRadius: 14, background: '#fff', cursor: 'pointer', textAlign: 'center', transition: '0.2s' }}>
                    <div style={{ fontSize: '30px', color: '#1976d2' }}>+</div>
                    <div style={{ fontSize: '13.5px', marginTop: 6, fontWeight: '500' }}>{item}</div>
                  </button>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Card>
            <CardHeader><h3>Hoạt động gần đây</h3></CardHeader>
            <CardBody>
              <ul style={{ margin: 0, paddingLeft: 22, lineHeight: '2', fontSize: '14px' }}>
                {activities.map((activity) => (
                  <li key={activity} style={{ marginBottom: 4 }}>{activity}</li>
                ))}
              </ul>
            </CardBody>
          </Card>

          <Card>
            <CardHeader><h3>Thành tích</h3></CardHeader>
            <CardBody>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {achievements.map((item) => (
                  <div key={item.title} style={{ background: item.background, padding: 20, borderRadius: 12, textAlign: 'center' }}>
                    <div style={{ fontSize: '42px' }}>{item.icon}</div>
                    <div style={{ fontWeight: 600, marginTop: 8 }}>{item.title}</div>
                    <div style={{ color: '#666', fontSize: '14px' }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

const EyeIcon = ({ color = '#111' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const EditPenIcon = ({ color = '#111' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
)

const TrashIcon = ({ color = '#d90429' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
)

export default InstructorDashboardPage
