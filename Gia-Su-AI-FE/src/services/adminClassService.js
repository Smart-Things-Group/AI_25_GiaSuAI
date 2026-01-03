import api, { handleApiError, handleApiResponse } from './api'
import { USE_MOCK_API } from '@mocks'
import { mockAdminClassAPI } from '@mocks/mockAdminClasses'

const shouldUseMock = USE_MOCK_API === true || USE_MOCK_API === 'true'

export const adminClassService = {
  async listClasses(params = {}) {
    const loadMock = () => mockAdminClassAPI.listClasses(params)
    if (shouldUseMock) return loadMock()
    try {
      const response = await api.get('/api/v1/admin/classes', { params })
      return handleApiResponse(response)
    } catch (error) {
      if (shouldUseMock) return loadMock()
      handleApiError(error)
    }
  },

  async createClass(data) {
    const loadMock = () => mockAdminClassAPI.createClass(data)
    if (shouldUseMock) return loadMock()
    try {
      const response = await api.post('/api/v1/admin/classes', data)
      return handleApiResponse(response)
    } catch (error) {
      if (shouldUseMock) return loadMock()
      handleApiError(error)
    }
  }
}

export default adminClassService
