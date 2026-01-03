import React from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'
import ScrollTopButton from '@components/ui/ScrollTopButton'

const stats = [
  { value: '10,000+', label: 'Học viên tích cực' },
  { value: '500+', label: 'Khóa học chất lượng' },
  { value: '98%', label: 'Tỷ lệ hài lòng' }
]

const features = [
  {
    title: 'Gia sư AI 24/7',
    description: 'Trợ lý AI cá nhân hoá luôn sẵn sàng giải đáp, nhắc học và kèm cặp bạn mọi lúc.',
    icon: BrainIcon
  },
  {
    title: 'Kho nội dung đa dạng',
    description: 'Hàng trăm khóa học từ cơ bản đến nâng cao cho nhiều lĩnh vực khác nhau.',
    icon: BookIcon
  },
  {
    title: 'Chat tương tác',
    description: 'Trao đổi trực tiếp với AI, đặt câu hỏi và nhận phản hồi tức thì trong khi học.',
    icon: ChatBubbleIcon
  },
  {
    title: 'Bài kiểm tra thông minh',
    description: 'Tự động tạo quiz bám sát mục tiêu học tập và cung cấp nhận xét chi tiết.',
    icon: TrophyIcon
  },
  {
    title: 'Cộng đồng học tập',
    description: 'Kết nối với học viên cùng mục tiêu, chia sẻ tài nguyên và động lực học.',
    icon: CommunityIcon
  },
  {
    title: 'Theo dõi tiến độ',
    description: 'Dashboard trực quan giúp bạn nắm rõ năng lực và mục tiêu tiếp theo.',
    icon: ProgressIcon
  }
]

const testimonials = [
  {
    quote:
      'Gia sư AI đã thay đổi hoàn toàn cách tôi học. Phản hồi tức thì và sự trợ giúp cá nhân hoá giúp tôi tiến bộ nhanh chóng.',
    name: 'Nguyễn Thị Hương',
    role: 'Sinh viên Khoa học Máy tính',
    avatar: 'https://i.pravatar.cc/120?img=32'
  },
  {
    quote: 'Giao diện thân thiện, nội dung chất lượng. Tôi đã hoàn thành 5 khóa học chỉ trong 3 tháng.',
    name: 'Trần Minh Tuấn',
    role: 'Quản lý Marketing',
    avatar: 'https://i.pravatar.cc/120?img=12'
  },
  {
    quote: 'Hệ thống bài kiểm tra và theo dõi tiến độ rất chi tiết. Tôi luôn biết mình đang ở đâu trong hành trình học tập.',
    name: 'Lê Thị Mai',
    role: 'Chuyên viên Phân tích Dữ liệu',
    avatar: 'https://i.pravatar.cc/120?img=5'
  }
]

const footerColumns = [
  {
    title: 'Sản phẩm',
    links: [
      { label: 'Gia sư AI', to: '/courses' },
      { label: 'Bài kiểm tra', to: '/quiz' },
      { label: 'Theo dõi tiến độ', to: '/dashboard' },
      { label: 'Tài nguyên', to: '/resources' }
    ]
  },
  {
    title: 'Hỗ trợ',
    links: [
      { label: 'Trung tâm trợ giúp', to: '/help' },
      { label: 'Liên hệ', to: '/contact' },
      { label: 'Câu hỏi thường gặp', to: '/faq' }
    ]
  },
  {
    title: 'Công ty',
    links: [
      { label: 'Về chúng tôi', to: '/about' },
      { label: 'Tuyển dụng', to: '/careers' },
      { label: 'Chính sách bảo mật', to: '/privacy' },
      { label: 'Điều khoản dịch vụ', to: '/terms' }
    ]
  }
]

const brandLogo = 'https://i.pinimg.com/originals/a2/3c/6f/a23c6fafa41d474975f9539d4a742e67.png'

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="brand">
              <span className="brand-icon">
                <img src={brandLogo} alt="AI Tutor logo" className="brand-logo" loading="lazy" />
              </span>
              <span className="brand-name">AI Tutor</span>
            </Link>

            <nav className="header-nav">
              <Link to="/auth/login" className="nav-link">
                Đăng nhập
              </Link>
              <Link to="/auth/register" className="nav-button">
                Đăng ký
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="container hero-wrapper">
            <div className="hero-content">
              <div className="hero-label">Được hỗ trợ bởi AI tiên tiến</div>
              <h1 className="hero-title">Học thông minh hơn với trợ lý AI</h1>
              <p className="hero-description">
                Trải nghiệm học tập cá nhân hóa với gia sư AI thông minh. Nhận phản hồi tức thì, bài kiểm tra tương tác
                và theo dõi tiến độ của bạn theo thời gian thực.
              </p>
              <div className="hero-actions">
                <Link to="/auth/register" className="hero-btn hero-btn-primary">
                  Bắt đầu học ngay
                  <ArrowIcon />
                </Link>
                <Link to="/courses" className="hero-btn hero-btn-secondary">
                  <PlayIcon />
                  Xem demo
                </Link>
              </div>
              <div className="hero-stats">
                {stats.map((stat) => (
                  <div key={stat.label} className="stat-card">
                    <p className="stat-value">{stat.value}</p>
                    <p className="stat-label">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="container">
            <div className="section-heading">
              <h2 className="section-title">Tính năng mạnh mẽ</h2>
              <p className="section-subtitle">Khám phá các công cụ giúp việc học trở nên hiệu quả và hấp dẫn hơn.</p>
            </div>
            <div className="features-grid">
              {features.map(({ title, description, icon: Icon }) => (
                <div key={title} className="feature-card">
                  <div className="feature-icon">
                    <Icon />
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <div className="container">
            <div className="section-heading">
              <h2 className="section-title">Học viên nói gì về chúng tôi</h2>
            </div>
            <div className="testimonials-grid">
              {testimonials.map(({ quote, name, role, avatar }) => (
                <div key={name} className="testimonial-card">
                  <div className="stars">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <StarIcon key={index} />
                    ))}
                  </div>
                  <p className="testimonial-quote">“{quote}”</p>
                  <div className="testimonial-author">
                    <img src={avatar} alt={name} loading="lazy" />
                    <div>
                      <p className="testimonial-name">{name}</p>
                      <p className="testimonial-role">{role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <div className="cta-card">
              <h2>Sẵn sàng bắt đầu hành trình học tập?</h2>
              <p>Tham gia cùng hàng nghìn học viên tin tưởng AI Learning.</p>
              <Link to="/auth/register" className="hero-btn hero-btn-light">
                Bắt đầu miễn phí
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="brand-icon">
                <img src={brandLogo} alt="AI Tutor logo" className="brand-logo" loading="lazy" />
              </div>
              <div>
                <h3>AI Tutor</h3>
                <p>Nền tảng học tập AI tiên tiến, mang đến trải nghiệm tốt nhất cho bạn.</p>
              </div>
            </div>
            <div className="footer-links">
              {footerColumns.map((column) => (
                <div key={column.title} className="footer-column">
                  <h4>{column.title}</h4>
                  <ul>
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link to={link.to}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 AI Learning. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
      <ScrollTopButton />
    </div>
  )
}

function BrainIcon () {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 6a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3v3a2 2 0 0 0 4 0V6a3 3 0 0 0-4 0z"></path>
      <path d="M17 6a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3v3a2 2 0 0 1-4 0V6a3 3 0 0 1 4 0z"></path>
    </svg>
  )
}

function BookIcon () {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 7H20"></path>
      <path d="M6.5 17A2.5 2.5 0 0 0 4 19.5V4.5A2.5 2.5 0 0 1 6.5 7"></path>
      <path d="M20 17V4H6.5"></path>
    </svg>
  )
}

function ChatBubbleIcon () {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 11.5a8.38 8.38 0 0 1-1.9 5.4 8.5 8.5 0 0 1-13.6 0L2 20l1.6-4A8.5 8.5 0 1 1 21 11.5z"></path>
    </svg>
  )
}

function TrophyIcon () {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 21h8"></path>
      <path d="M12 17v4"></path>
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4z"></path>
      <path d="M5 9a3 3 0 0 0 2-5"></path>
      <path d="M19 9a3 3 0 0 1-2-5"></path>
    </svg>
  )
}

function CommunityIcon () {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M17 11a4 4 0 1 0-4-4"></path>
      <path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"></path>
      <path d="M17 21v-2a4 4 0 0 0-1-2.7"></path>
    </svg>
  )
}

function ProgressIcon () {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 3v18h18"></path>
      <path d="M7 14l4-4 3 3 5-5"></path>
    </svg>
  )
}

function PlayIcon () {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z"></path>
    </svg>
  )
}

function ArrowIcon () {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14"></path>
      <path d="M12 5l7 7-7 7"></path>
    </svg>
  )
}

function StarIcon () {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24" stroke="none">
      <path d="M12 2l2.9 6.6L22 9.3l-5 4.9L18.2 22 12 18.6 5.8 22 7 14.2 2 9.3l7.1-0.7z"></path>
    </svg>
  )
}

export default LandingPage
