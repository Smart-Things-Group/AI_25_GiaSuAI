import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@stores/authStore";
import CourseSearchBar from "@components/dashboard/CourseSearchBar";
import "./DashboardLayout.css";

const roleLabel = {
  student: "Học viên",
  instructor: "Giảng viên",
  admin: "Quản trị viên",
};

const roleChipLabel = {
  student: "HV",
  instructor: "GV",
  admin: "Admin",
};

const SidebarNavItem = ({ to, icon, label, isActive, onClick }) => (
  <Link
    to={to}
    className={`sidebar-nav-item ${isActive ? "nav-item-active" : ""}`}
    title={label}
    aria-label={label}
    onClick={onClick}
  >
    <span className="nav-item-icon">{icon}</span>
    <span className="nav-item-label">{label}</span>
  </Link>
);

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const isLessonFocusPage = /^\/dashboard\/courses\/[^/]+\/lessons\//.test(location.pathname);
  const isExplorePage = location.pathname.startsWith("/dashboard/explore");

  const toggleSidebar = () => setSidebarOpen((v) => !v);
  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth/login");
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  const studentNav = [
  { to: "/dashboard", label: "Trang chủ", icon: <DashboardIcon /> },
  { to: "/dashboard/explore", label: "Khám phá", icon: <ExploreIcon /> },
  { to: "/dashboard/chat", label: "AI Tutor", icon: <ChatIcon /> },
  { to: "/dashboard/student-courses", label: "Khóa học của tôi", icon: <CoursesIcon /> },
  { to: "/dashboard/student-profile", label: "Cá nhân", icon: <UserIcon /> },
];


  const instructorNav = [
    { to: "/dashboard", label: "Tổng quan", icon: <DashboardIcon /> },
    { to: "/dashboard/courses", label: "Khóa học của tôi", icon: <CoursesIcon /> },
    { to: "/dashboard/my-courses", label: "Học viên", icon: <MyCoursesIcon /> },
    { to: "/dashboard/quiz", label: "Bài kiểm tra", icon: <QuizIcon /> },
    { to: "/dashboard/chat", label: "AI Chat", icon: <ChatIcon /> },
  ];

  const adminNav = [
  { to: "/dashboard/admin/users", label: "Quản lý người dùng", icon: <UserManageIcon /> },
  { to: "/dashboard/admin/courses", label: "Quản lý khóa học", icon: <CoursesIcon /> },
  { to: "/dashboard/admin/classes", label: "Giám sát lớp học", icon: <MyCoursesIcon /> },
  { to: "/dashboard/admin/settings", label: "Cài đặt", icon: <SettingsIcon /> },
];

  const navItems =
    user?.role === "student" ? studentNav : user?.role === "instructor" ? instructorNav : adminNav;

  const avatarUrlFallback =
    user?.avatar_url ||
    "https://png.pngtree.com/png-vector/20240917/ourlarge/pngtree-smiling-school-boy-avatar-in-clip-art-style-vector-png-image_13854139.png";
  const showSearchBar = !(user?.role === "student" && isExplorePage);

  return (
    <div className={`dashboard-layout ${isLessonFocusPage ? "lesson-focus-mode" : ""}`}>
      <aside
        className={`dashboard-sidebar ${sidebarOpen ? "sidebar-open" : ""} ${
          isLessonFocusPage ? "sidebar-compact" : ""
        }`}
      >
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <img
              src="https://i.pinimg.com/originals/a2/3c/6f/a23c6fafa41d474975f9539d4a742e67.png"
              alt="AI Learning logo"
              className="sidebar-logo-img"
            />
            <div className="sidebar-logo-text">AI Learning</div>
          </div>
          <button className="sidebar-close" onClick={toggleSidebar} aria-label="Close sidebar">
            <CloseIcon />
          </button>
        </div>

        <div className="sidebar-user">
          <div className="user-avatar small">
            <img src={avatarUrlFallback} alt={user?.full_name || "Avatar"} />
          </div>
          <div className="user-info-text">
            <div className={`user-role-label role-${user?.role || "student"}`}>
              {roleLabel[user?.role] || "Học viên"}
            </div>
            <p>{user?.email}</p>
          </div>
          <span className="role-chip">{roleChipLabel[user?.role] || "HV"}</span>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const isActive =
              item.to === "/dashboard"
                ? location.pathname === "/dashboard"
                : location.pathname.startsWith(item.to);
            return (
              <SidebarNavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                isActive={isActive}
                onClick={closeSidebar}
              />
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout} title="Đăng xuất" aria-label="Đăng xuất">
            <LogoutIcon />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      <div className="dashboard-main">
        <header className="dashboard-header">
          <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Open sidebar">
            <MenuIcon />
          </button>

          <div className="dashboard-header-content">
            {showSearchBar && <CourseSearchBar />}
          </div>

          <div className="header-actions">
            <button className="notification-button" aria-label="Thông báo">
              <BellIcon />
              <span className="notification-badge">3</span>
            </button>
            <Link to="/profile" className="profile-link">
              <div className="user-avatar">
                <img src={avatarUrlFallback} alt={user?.full_name || "Avatar"} />
              </div>
            </Link>
          </div>
        </header>

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const DashboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="9"></rect>
    <rect x="14" y="3" width="7" height="5"></rect>
    <rect x="14" y="12" width="7" height="9"></rect>
    <rect x="3" y="16" width="7" height="5"></rect>
  </svg>
);

const CoursesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

const MyCoursesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 4h13a2 2 0 0 1 2 2v12"></path>
    <path d="M3 4v13a2 2 0 0 0 2 2h13"></path>
    <path d="M9 9h6"></path>
    <path d="M9 13h4"></path>
  </svg>
);

const QuizIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 17h.01"></path>
    <path d="M12 13a3 3 0 1 1 2.83-4.12"></path>
    <path d="M12 21a9 9 0 1 1 9-9"></path>
  </svg>
);

const ExploreIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    <path d="M11 8l2 4-4 2z"></path>
  </svg>
);

const ChatIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="7" r="4"></circle>
    <path d="M5.5 21a6.5 6.5 0 0 1 13 0"></path>
  </svg>
);

const UserManageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="7" r="3"></circle>
    <path d="M2 21v-1a6 6 0 0 1 6-6h2"></path>
    <circle cx="17" cy="7" r="3"></circle>
    <path d="M22 21v-1a6 6 0 0 0-6-6h-2"></path>
  </svg>
);

const ProgressIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 6v6l4 2"></path>
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c0 .69.4 1.3 1.02 1.58.31.15.64.22.98.22H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2z"></path>
    <path d="M18 16V11a6 6 0 1 0-12 0v5l-2 2h16z"></path>
  </svg>
);

const AdminIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
    <path d="M2 17l10 5 10-5"></path>
    <path d="M2 12l10 5 10-5"></path>
  </svg>
);

const LogoutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

export default DashboardLayout;