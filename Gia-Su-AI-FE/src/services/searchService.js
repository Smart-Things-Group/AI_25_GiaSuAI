import api, { handleApiResponse, handleApiError } from './api'

const searchService = {
  async globalSearch(params = {}) {
    try {
      const response = await api.get('/search', { params })
      return handleApiResponse(response)
    } catch (error) {
      handleApiError(error)
    }
  },

  async getFilters(params = {}) {
    try {
      const response = await api.get('/search/filter', { params })
      return handleApiResponse(response)
    } catch (error) {
      handleApiError(error)
    }
  }
}

export default searchService
