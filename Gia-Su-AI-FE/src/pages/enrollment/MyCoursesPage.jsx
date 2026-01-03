import React from "react";
import Card, { CardHeader, CardBody } from "@components/ui/Card";
/* 
* Trang quản lý học viên - GV
*/
const students = [
  { name: "Nguyễn Văn A", email: "nguyenvana@email.com", courses: "3 đang học / 1 hoàn thành", progress: 65, lastActive: "2 giờ trước", status: "Đang học" },
  { name: "Trần Thị B", email: "tranthib@email.com", courses: "2 đang học / 2 hoàn thành", progress: 100, lastActive: "1 ngày trước", status: "Hoàn thành" },
  { name: "Lê Văn C", email: "levanc@email.com", courses: "4 đang học / 0 hoàn thành", progress: 25, lastActive: "5 giờ trước", status: "Đang học" },
  { name: "Phạm Thị D", email: "phamthid@email.com", courses: "1 đang học / 0 hoàn thành", progress: 45, lastActive: "3 ngày trước", status: "Đang học" },
  { name: "Hoàng Văn E", email: "hoangvane@email.com", courses: "3 đang học / 1 hoàn thành", progress: 80, lastActive: "1 giờ trước", status: "Đang học" },
];

const StudentManagementPage = () => {
  return (
    <div style={{ padding: "24px", background: "#f9f9f9", minHeight: "100vh" }}>

      {/* Tiêu đề */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: 0 }}>Quản lý học viên</h1>
        <p style={{ color: "#666", margin: "8px 0 0" }}>Theo dõi và hỗ trợ học viên của bạn</p>
      </div>

      {/* 4 ô thống kê */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "32px" }}>
        {[
          { num: "1,234", label: "Tổng học viên", color: "#1976d2" },
          { num: "892", label: "Đang học", color: "#2e7d32" },
          { num: "342", label: "Đã hoàn thành", color: "#6a1b9a" },
          { num: "72%", label: "Tỷ lệ hoàn thành TB", color: "#ef6c00" },
        ].map((stat, i) => (
          <div key={i} style={{ background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", textAlign: "center" }}>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: stat.color }}>{stat.num}</div>
            <div style={{ color: "#666", fontSize: "14px" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Bảng học viên */}
      <Card style={{ borderRadius: "12px", overflow: "hidden" }}>
        <CardHeader style={{ padding: "20px 24px", borderBottom: "1px solid #eee" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "600", margin: 0 }}>Danh sách học viên</h3>
              <p style={{ color: "#666", fontSize: "14px", margin: "4px 0 0" }}>Quản lý và theo dõi tiến độ học viên</p>
            </div>
            <button style={{ padding: "8px 16px", border: "1px solid #ddd", borderRadius: "8px", background: "#fff", cursor: "pointer" }}>
              Lọc
            </button>
          </div>
        </CardHeader>

        <CardBody style={{ padding: 0 }}>
          {/* Tìm kiếm */}
          <div style={{ padding: "16px 24px", borderBottom: "1px solid #eee" }}>
            <input
              type="text"
              placeholder="Tìm kiếm học viên..."
              style={{ width: "100%", padding: "10px 16px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px" }}
            />
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f9f9f9", textAlign: "left" }}>
                  <th style={{ padding: "16px 24px", fontSize: "14px", color: "#555" }}>Học viên</th>
                  <th style={{ padding: "16px 24px", fontSize: "14px", color: "#555" }}>Khóa học</th>
                  <th style={{ padding: "16px 24px", fontSize: "14px", color: "#555" }}>Tiến độ</th>
                  <th style={{ padding: "16px 24px", fontSize: "14px", color: "#555" }}>Hoạt động</th>
                  <th style={{ padding: "16px 24px", fontSize: "14px", color: "#555" }}>Trạng thái</th>
                  <th style={{ padding: "16px 24px", fontSize: "14px", color: "#555" }}>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr key={i} style={{ borderBottom: i < students.length - 1 ? "1px solid #eee" : "none" }}>
                    <td style={{ padding: "16px 24px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#ddd", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold" }}>
                          {s.name[0]}
                        </div>
                        <div>
                          <div style={{ fontWeight: "600" }}>{s.name}</div>
                          <div style={{ fontSize: "13px", color: "#888" }}>{s.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "16px 24px", fontSize: "14px" }}>{s.courses}</td>
                    <td style={{ padding: "16px 24px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ fontWeight: "600" }}>{s.progress}%</span>
                        <div style={{ flex: 1, background: "#e0e0e0", borderRadius: "4px", height: "6px" }}>
                          <div
                            style={{
                              width: `${s.progress}%`,
                              height: "100%",
                              borderRadius: "4px",
                              background: s.progress === 100 ? "#2e7d32" : "#1976d2"
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "16px 24px", fontSize: "14px", color: "#666" }}>{s.lastActive}</td>
                    <td style={{ padding: "16px 24px" }}>
                      <span style={{
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "500",
                        background: s.status === "Hoàn thành" ? "#e8f5e9" : "#e3f2fd",
                        color: s.status === "Hoàn thành" ? "#2e7d32" : "#1976d2"
                      }}>
                        {s.status}
                      </span>
                    </td>
                    <td style={{ padding: "16px 24px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button style={{ width: 36, height: 36, border: "1px solid #ddd", borderRadius: "8px", background: "#fff", cursor: "pointer" }} title="Gửi email">Email</button>
                        <button style={{ width: 36, height: 36, border: "1px solid #ddd", borderRadius: "8px", background: "#fff", cursor: "pointer" }} title="Xem hồ sơ">Document</button>
                        <button style={{ width: 36, height: 36, border: "1px solid #ddd", borderRadius: "8px", background: "#fff", cursor: "pointer" }} title="Xóa">Trash</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default StudentManagementPage;