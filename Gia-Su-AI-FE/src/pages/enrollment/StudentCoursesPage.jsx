import React, { useEffect, useMemo, useState } from "react";
import Card from "@components/ui/Card";
import Button from "@components/ui/Button";
import { mockEnrollmentAPI } from "@/mocks/mockCourses";
import "./StudentCoursesPage.css";

const StudentCoursesPage = () => {
  const [tab, setTab] = useState("all");
  const [enrollments, setEnrollments] = useState([]);
  const [summary, setSummary] = useState({ total: 0, in_progress: 0, completed: 0, cancelled: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await mockEnrollmentAPI.getMyCourses({ limit: 20, skip: 0 });
        setEnrollments(res.enrollments || []);
        setSummary({
          total: res.summary?.total_enrollments || 0,
          in_progress: res.summary?.in_progress || 0,
          completed: res.summary?.completed || 0,
          cancelled: res.summary?.cancelled || 0,
        });
      } catch (err) {
        setError(err?.message || "Không thể tải danh sách khóa học (mock).");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
  }, []);

  const cards = useMemo(() => {
    const enrolledCards = (enrollments || []).map((c) => ({
      id: c.id || c.course_id,
      title: c.course_title,
      description: c.course_description,
      thumbnail: c.course_thumbnail,
      level: c.course_level,
      instructor: c.instructor_name,
      status: c.status,
      progress: c.progress_percent ?? 0,
      enrolledAt: c.enrolled_at,
      modules: c.total_modules || 1,
      lessons: c.total_lessons || 0,
      isEnrolled: true,
    }));

    return enrolledCards.filter((c) => {
      if (tab === "all") return true;
      if (tab === "in-progress") return c.status === "in-progress" || c.status === "active";
      if (tab === "completed") return c.status === "completed";
      if (tab === "cancelled") return c.status === "cancelled";
      return true;
    });
  }, [tab, enrollments]);

  const statusBadge = (status) => {
    if (status === "in-progress" || status === "active") return "Đang học";
    if (status === "completed") return "Hoàn thành";
    if (status === "cancelled") return "Hủy";
    if (status === "available") return "Có sẵn";
    return status;
  };

  return (
    <div className="student-courses-page">
      <div className="page-header">
        <h2>Khóa học của tôi</h2>
        <p>Danh sách khóa đã đăng ký (mock từ /api/v1/enrollments/my-courses)</p>
      </div>

      <div className="status-buttons">
        <button className={`status-btn ${tab === "all" ? "active" : ""}`} onClick={() => setTab("all")}>
          Tất cả ({summary.total})
        </button>
        <button className={`status-btn ${tab === "in-progress" ? "active" : ""}`} onClick={() => setTab("in-progress")}>
          Đang học
        </button>
        <button className={`status-btn ${tab === "completed" ? "active" : ""}`} onClick={() => setTab("completed")}>
          Hoàn thành
        </button>
        <button className={`status-btn ${tab === "cancelled" ? "active" : ""}`} onClick={() => setTab("cancelled")}>
          Đã hủy
        </button>
      </div>

      <div className="summary-row">
        <div className="summary-pill">
          <span className="pill-label">Tổng</span>
          <span className="pill-value">{summary.total}</span>
        </div>
        <div className="summary-pill success">
          <span className="pill-label">Đang học</span>
          <span className="pill-value">{summary.in_progress}</span>
        </div>
        <div className="summary-pill primary">
          <span className="pill-label">Hoàn thành</span>
          <span className="pill-value">{summary.completed}</span>
        </div>
        <div className="summary-pill muted">
          <span className="pill-label">Hủy</span>
          <span className="pill-value">{summary.cancelled}</span>
        </div>
      </div>

      {error && <div className="courses-error">{error}</div>}

      {loading ? (
        <div className="loading">Đang tải...</div>
      ) : cards.length === 0 ? (
        <div className="empty-state">Không có khóa học nào.</div>
      ) : (
        <div className="courses-grid pretty-cards">
          {cards.map((course) => (
            <Card key={course.id} className="course-card wide" padding="lg">
              {course.thumbnail && (
                <div className="course-thumb">
                  <img src={course.thumbnail} alt={course.title} />
                </div>
              )}
              <div className="course-top">
                <div className="course-badges">
                  <span className="pill soft">{course.level || "Cơ bản"}</span>
                  <span className={`pill status ${course.isEnrolled ? "enrolled" : "available"}`}>
                    {course.isEnrolled ? "Đã đăng ký" : "Có sẵn"}
                  </span>
                </div>
                <h3>{course.title}</h3>
                <p className="course-desc">{course.description}</p>
                <div className="course-meta">
                  <span>👥 {course.isEnrolled ? "Học viên đã đăng ký" : "0 học viên"}</span>
                  <span>⚡ {course.progress}%</span>
                  <span>{statusBadge(course.status)}</span>
                </div>
                <p className="instructor">Giảng viên: {course.instructor}</p>
                <p className="price">Miễn phí</p>
                <small>
                  {course.modules} modules • {course.lessons} bài học
                </small>
              </div>
              <div className="course-footer">
                <div className="enrolled-date">
                  {course.isEnrolled ? `Đăng ký: ${new Date(course.enrolledAt).toLocaleDateString("vi-VN")}` : ""}
                </div>
                <div className="actions">
                  {course.isEnrolled ? (
                    <Button size="sm" variant="success">Tiếp tục học</Button>
                  ) : (
                    <Button size="sm" variant="primary">Xem chi tiết</Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentCoursesPage;
