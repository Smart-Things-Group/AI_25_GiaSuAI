import api, { handleApiResponse, handleApiError } from "./api"
import { USE_MOCK_API } from "@/mocks"
import { mockProfileAPI } from "@/mocks/mockProfile"
import { mockAuthAPI } from "@/mocks/mockAuth"

/**
 * Service xu ly xac thuc nguoi dung
 */
export const authService = {
  /**
   * Dang nhap nguoi dung
   * @param {string} email - Email nguoi dung
   * @param {string} password - Mat khau
   * @returns {Promise} User data va tokens
   */
  async login(email, password, rememberMe = false) {
    try {
      if (USE_MOCK_API) {
        return await mockAuthAPI.login({
          email,
          password,
          remember_me: rememberMe
        })
      }
      const response = await api.post('/auth/login', {
        email,
        password,
        remember_me: rememberMe
      })
      return handleApiResponse(response)
    } catch (error) {
      handleApiError(error)
    }
  },

  /**
   * Dang ky nguoi dung moi
   * @param {Object} userData - Thong tin nguoi dung
   * @param {string} userData.full_name - Ho va ten
   * @param {string} userData.email - Email
   * @param {string} userData.password - Mat khau
   * @returns {Promise} User data
   */
  async register(userData) {
    try {
      if (USE_MOCK_API) {
        return await mockAuthAPI.register(userData)
      }
      const response = await api.post('/auth/register', userData)
      return handleApiResponse(response)
    } catch (error) {
      handleApiError(error)
    }
  },

  /**
   * Dang xuat nguoi dung
   * @returns {Promise}
   */
  async logout() {
    try {
      if (USE_MOCK_API) {
        return { message: 'Dang xuat (mock) thanh cong' }
      }
      const response = await api.post('/auth/logout')
      return handleApiResponse(response)
    } catch (error) {
      handleApiError(error)
    }
  },

  /**
   * Lay thong tin nguoi dung hien tai
   * @returns {Promise} User data
   */
  async getCurrentUser() {
    try {
      if (USE_MOCK_API) {
        const { data } = await mockProfileAPI.getProfile()
        return data
      }
      const response = await api.get('/users/me')
      return handleApiResponse(response)
    } catch (error) {
      handleApiError(error)
    }
  },

  /**
   * Cap nhat thong tin nguoi dung
   * @param {Object} userData - Thong tin cap nhat
   * @returns {Promise} Updated user data
   */
  async updateProfile(userData) {
    try {
      if (USE_MOCK_API) {
        const { data } = await mockProfileAPI.updateProfile(userData)
        return data
      }
      const response = await api.patch('/users/me', userData)
      return handleApiResponse(response)
    } catch (error) {
      handleApiError(error)
    }
  },

  /**
   * Gui email khoi phuc mat khau
   * @param {string} email - Email nguoi dung
   * @returns {Promise}
   */
  async forgotPassword(email) {
    try {
      if (USE_MOCK_API) {
        return { message: 'Email khoi phuc (mock) da duoc gui' }
      }
      const response = await api.post('/auth/forgot-password', { email })
      return handleApiResponse(response)
    } catch (error) {
      handleApiError(error)
    }
  },

  /**
   * Dat lai mat khau
   * @param {string} token - Reset token
   * @param {string} password - Mat khau moi
   * @returns {Promise}
   */
  async resetPassword(token, password) {
    try {
      if (USE_MOCK_API) {
        return { message: 'Dat lai mat khau (mock) thanh cong' }
      }
      const response = await api.post('/auth/reset-password', {
        token,
        password
      })
      return handleApiResponse(response)
    } catch (error) {
      handleApiError(error)
    }
  },

  /**
   * Xac thuc email
   * @param {string} token - Verification token
   * @returns {Promise}
   */
  async verifyEmail(token) {
    try {
      if (USE_MOCK_API) {
        return { message: 'Xac thuc email (mock) thanh cong' }
      }
      const response = await api.post('/auth/verify-email', { token })
      return handleApiResponse(response)
    } catch (error) {
      handleApiError(error)
    }
  },

  /**
   * Gui lai email xac thuc
   * @param {string} email - Email nguoi dung
   * @returns {Promise}
   */
  async resendVerificationEmail(email) {
    try {
      if (USE_MOCK_API) {
        return { message: 'Da gui lai email xac thuc (mock)' }
      }
      const response = await api.post('/auth/resend-verification', { email })
      return handleApiResponse(response)
    } catch (error) {
      handleApiError(error)
    }
  },

  /**
   * Refresh access token
   * @param {string} refreshToken - Refresh token
   * @returns {Promise} New tokens
   */
  async refreshToken(refreshToken) {
    try {
      if (USE_MOCK_API) {
        return {
          access_token: 'mock_access_token',
          refresh_token: 'mock_refresh_token',
          token_type: 'Bearer'
        }
      }
      const response = await api.post('/auth/refresh', {
        refresh_token: refreshToken
      })
      return handleApiResponse(response)
    } catch (error) {
      handleApiError(error)
    }
  }
}

export default authService
