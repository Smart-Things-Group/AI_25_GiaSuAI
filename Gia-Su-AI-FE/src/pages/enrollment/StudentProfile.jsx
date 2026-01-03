import React, { useEffect, useState } from "react";
import authService from "@services/authService";
import "./StudentProfile.css";

const emptyProfile = {
  full_name: "",
  email: "",
  role: "student",
  avatar_url: "",
  bio: "",
  learning_preferences: [],
  contact_info: ""
};

const StudentProfile = () => {
  const [profile, setProfile] = useState(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await authService.getCurrentUser();
        if (data) {
          setProfile({
            ...emptyProfile,
            ...data,
            learning_preferences: data.learning_preferences || []
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleChange = (field) => (e) => {
    setProfile((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const updated = await authService.updateProfile({
        full_name: profile.full_name,
        avatar_url: profile.avatar_url,
        bio: profile.bio,
        contact_info: profile.contact_info,
        learning_preferences: profile.learning_preferences
      });
      if (updated) {
        setProfile((prev) => ({ ...prev, ...updated }));
        setMessage(updated.message || "Đã lưu thay đổi (mock)");
      }
    } catch (err) {
      setMessage("Không thể lưu. Vui lòng thử lại.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="student-profile-page">Đang tải...</div>;
  }

  return (
    <div className="student-profile-page">
      <header className="profile-header">
        <h1>Cài đặt</h1>
        <p>Quản lý tài khoản và tùy chỉnh trải nghiệm học tập</p>
      </header>

      <section className="profile-card">
        <div className="profile-card__title">
          <div>
            <h3>Thông tin cá nhân</h3>
            <p>Cập nhật thông tin hồ sơ của bạn</p>
          </div>
        </div>

        <div className="profile-grid">
          <div className="avatar-block">
            <img
              className="avatar-img"
              src={
                profile.avatar_url ||
                "https://png.pngtree.com/png-vector/20240917/ourlarge/pngtree-smiling-school-boy-avatar-in-clip-art-style-vector-png-image_13854139.png"
              }
              alt="Avatar"
            />
            <button className="btn ghost">Thay đổi ảnh</button>
            <span className="hint">JPG, PNG tối đa 2MB</span>
          </div>

          <div className="fields">
            <label className="field">
              <span>Họ và tên</span>
              <input
                value={profile.full_name}
                onChange={handleChange("full_name")}
                placeholder="Nhập họ tên"
              />
            </label>

            <label className="field">
              <span>Email</span>
              <input value={profile.email} disabled />
            </label>

            <label className="field">
              <span>Số liên hệ</span>
              <input
                value={profile.contact_info}
                onChange={handleChange("contact_info")}
                placeholder="Thêm số điện thoại hoặc liên hệ"
              />
            </label>

            <label className="field">
              <span>Giới thiệu</span>
              <textarea
                rows={3}
                value={profile.bio || ""}
                onChange={handleChange("bio")}
                placeholder="Viết vài dòng về bản thân..."
              ></textarea>
            </label>

            <div className="field">
              <span>Sở thích học tập</span>
              <div className="chips">
                {(profile.learning_preferences || []).map((pref, idx) => (
                  <span key={idx} className="chip">
                    {pref}
                  </span>
                ))}
                {profile.learning_preferences?.length === 0 && (
                  <span className="chip muted">Chưa cập nhật</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {message && <div className="info-box">{message}</div>}

        <div className="actions">
          <button className="btn primary" onClick={handleSave} disabled={saving}>
            {saving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default StudentProfile;

