import api, { handleApiError, handleApiResponse } from './api'
import { USE_MOCK_API } from '@mocks'
import { mockAdminCourseAPI } from '@mocks/mockAdminCourses'

const shouldUseMock = USE_MOCK_API === true || USE_MOCK_API === 'true'

export const adminCourseService = {
  async listCourses(params = {}) {
    const loadMock = () => mockAdminCourseAPI.listCourses(params)
    if (shouldUseMock) return loadMock()
    try {
      const response = await api.get('/api/v1/admin/courses', { params })
      return handleApiResponse(response)
    } catch (error) {
      if (shouldUseMock) return loadMock()
      handleApiError(error)
    }
  },

  async getCourseDetail(courseId) {
    const loadMock = () => mockAdminCourseAPI.getCourseDetail(courseId)
    if (shouldUseMock) return loadMock()
    try {
      const response = await api.get(`/api/v1/admin/courses/${courseId}`)
      return handleApiResponse(response)
    } catch (error) {
      if (shouldUseMock) return loadMock()
      handleApiError(error)
    }
  },

  async createCourse(data) {
    const loadMock = () => mockAdminCourseAPI.createCourse(data)
    if (shouldUseMock) return loadMock()
    try {
      const response = await api.post('/api/v1/admin/courses', data)
      return handleApiResponse(response)
    } catch (error) {
      if (shouldUseMock) return loadMock()
      handleApiError(error)
    }
  },

  async updateCourse(courseId, data) {
    const loadMock = () => mockAdminCourseAPI.updateCourse(courseId, data)
    if (shouldUseMock) return loadMock()
    try {
      const response = await api.put(`/api/v1/admin/courses/${courseId}`, data)
      return handleApiResponse(response)
    } catch (error) {
      if (shouldUseMock) return loadMock()
      handleApiError(error)
    }
  },

  async deleteCourse(courseId) {
    const loadMock = () => mockAdminCourseAPI.deleteCourse(courseId)
    if (shouldUseMock) return loadMock()
    try {
      const response = await api.delete(`/api/v1/admin/courses/${courseId}`)
      return handleApiResponse(response)
    } catch (error) {
      if (shouldUseMock) return loadMock()
      handleApiError(error)
    }
  }
}

export default adminCourseService
