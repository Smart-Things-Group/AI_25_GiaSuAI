export const profileMock = {
  id: "user-mock-001",
  full_name: "Nguyen Van A",
  email: "student@ailearning.com",
  role: "student",
  avatar_url: "https://png.pngtree.com/png-vector/20240917/ourlarge/pngtree-smiling-school-boy-avatar-in-clip-art-style-vector-png-image_13854139.png",
  bio: "Têu thích lập trình Web và thực hành các dự án thực tế.",
  learning_preferences: ["Programming", "Languages", "UI/UX"],
  contact_info: "+84 123 456 789",
  created_at: "2024-01-05T08:00:00Z",
  updated_at: "2024-11-20T09:00:00Z"
};

export const mockProfileAPI = {
  async getProfile() {
    return { data: { ...profileMock } };
  },
  async updateProfile(updates = {}) {
    Object.assign(profileMock, updates, { updated_at: new Date().toISOString() });
    return {
      data: {
        ...profileMock,
        message: "Cap nhat ho so thanh cong"
      }
    };
  }
};


