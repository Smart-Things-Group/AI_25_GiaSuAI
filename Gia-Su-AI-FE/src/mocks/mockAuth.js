const MOCK_USER_KEY = 'mock_auth_users_v1'

/*
* Đăng nhập đăng ký
*/
const defaultUsers = [
  {
    id: 'u-student-001',
    full_name: 'Nguyễn Thị Học Viên',
    email: 'student@example.com',
    password: 'Student@123',
    role: 'student',
    status: 'active',
    avatar: null,
    created_at: '2024-01-01T08:00:00.000Z'
  },
  {
    id: 'u-instructor-002',
    full_name: 'MR.Phước',
    email: 'instructor@example.com',
    password: 'Instructor@123',
    role: 'instructor',
    status: 'active',
    avatar: null,
    created_at: '2024-01-05T08:00:00.000Z'
  },
  {
    id: 'u-admin-003',
    full_name: 'Lê Thu Admin',
    email: 'admin@example.com',
    password: 'Admin@123',
    role: 'admin',
    status: 'active',
    avatar: null,
    created_at: '2024-01-10T08:00:00.000Z'
  }
]

const getStorage = () => {
  if (typeof window === 'undefined') return null
  return window.localStorage
}

const loadUsers = () => {
  const storage = getStorage()
  if (!storage) return [...defaultUsers]

  try {
    const raw = storage.getItem(MOCK_USER_KEY)
    if (!raw) return [...defaultUsers]
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return [...defaultUsers]
    return parsed
  } catch (error) {
    console.warn('Failed to parse mock users, fallback to defaults', error)
    return [...defaultUsers]
  }
}

let users = loadUsers()

const persistUsers = () => {
  const storage = getStorage()
  if (!storage) return
  storage.setItem(MOCK_USER_KEY, JSON.stringify(users))
}

const simulateDelay = (ms = 600) =>
  new Promise((resolve) => setTimeout(resolve, ms))

const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `mock_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`
}

const createToken = (prefix) =>
  `${prefix}_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email ?? '')

const isStrongPassword = (password = '') =>
  /[A-Z]/.test(password) &&
  /[0-9]/.test(password) &&
  /[^A-Za-z0-9]/.test(password) &&
  password.length >= 8

const hasAtLeastTwoWords = (fullName = '') =>
  fullName.trim().split(/\s+/).filter(Boolean).length >= 2

const sanitizeUser = (user) => {
  const { password, ...rest } = user
  return rest
}

export const mockAuthAPI = {
  async register({ full_name, email, password }) {
    await simulateDelay()

    if (!hasAtLeastTwoWords(full_name)) {
      throw new Error('Full name must have at least 2 words')
    }

    if (!isValidEmail(email)) {
      throw new Error('Invalid email format')
    }

    if (!isStrongPassword(password)) {
      throw new Error('Password too weak')
    }

    const normalizedEmail = email.trim().toLowerCase()
    const existed = users.find(
      (user) => user.email.toLowerCase() === normalizedEmail
    )

    if (existed) {
      throw new Error('Email already exists')
    }

    const newUser = {
      id: generateId(),
      full_name: full_name.trim(),
      email: normalizedEmail,
      password,
      role: 'student',
      status: 'active',
      avatar: null,
      created_at: new Date().toISOString()
    }

    users = [...users, newUser]
    persistUsers()

    return {
      id: newUser.id,
      full_name: newUser.full_name,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status,
      created_at: newUser.created_at,
      message: 'Đăng ký tài khoản thành công'
    }
  },

  async login({ email, password, remember_me = false }) {
    await simulateDelay()

    if (!email || !password) {
      throw new Error('Email and password are required')
    }

    const normalizedEmail = email.trim().toLowerCase()
    const user = users.find(
      (item) => item.email.toLowerCase() === normalizedEmail
    )

    if (!user || user.password !== password) {
      throw new Error('Invalid email or password')
    }

    if (user.status !== 'active') {
      throw new Error('Account is inactive')
    }

    const access_token = createToken('access')
    const refresh_token = createToken(remember_me ? 'refresh7d' : 'refresh1d')

    return {
      access_token,
      refresh_token,
      token_type: 'Bearer',
      user: sanitizeUser(user)
    }
  }
}
