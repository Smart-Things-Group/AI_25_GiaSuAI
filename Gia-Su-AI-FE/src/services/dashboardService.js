import api, { handleApiError, handleApiResponse } from './api'
import { USE_MOCK_API, mockDashboardAPI } from '@mocks'

const FORCE_DASHBOARD_MOCK = false
const SHOULD_FALLBACK_TO_DASHBOARD_MOCK = false

const dashboardService = {
  async getStudentDashboard() {
    const loadMock = () => mockDashboardAPI.getStudentDashboard()
    if (FORCE_DASHBOARD_MOCK) return loadMock()

    try {
      const response = await api.get('/dashboard/student')
      return handleApiResponse(response)
    } catch (error) {
      if (SHOULD_FALLBACK_TO_DASHBOARD_MOCK) {
        try {
          return await loadMock()
        } catch (mockError) {
          console.warn('Mock dashboard overview fallback failed', mockError)
        }
      }
      handleApiError(error)
    }
  },

  async getLearningStats() {
    const loadMock = () => mockDashboardAPI.getLearningStats()
    if (FORCE_DASHBOARD_MOCK) return loadMock()

    try {
      const response = await api.get('/analytics/learning-stats')
      return handleApiResponse(response)
    } catch (error) {
      if (SHOULD_FALLBACK_TO_DASHBOARD_MOCK) {
        try {
          return await loadMock()
        } catch (mockError) {
          console.warn('Mock dashboard stats fallback failed', mockError)
        }
      }
      handleApiError(error)
    }
  },

  async getProgressChart(params = {}) {
    const loadMock = () => mockDashboardAPI.getProgressChart(params)
    if (FORCE_DASHBOARD_MOCK) return loadMock()

    try {
      const response = await api.get('/analytics/progress-chart', {
        params: {
          time_range: '30d',
          ...params
        }
      })
      return handleApiResponse(response)
    } catch (error) {
      if (SHOULD_FALLBACK_TO_DASHBOARD_MOCK) {
        try {
          return await loadMock()
        } catch (mockError) {
          console.warn('Mock progress chart fallback failed', mockError)
        }
      }
      handleApiError(error)
    }
  },

  async getRecommendations() {
    const loadMock = () => mockDashboardAPI.getRecommendations()
    if (FORCE_DASHBOARD_MOCK) return loadMock()

    try {
      const response = await api.get('/recommendations')
      return handleApiResponse(response)
    } catch (error) {
      if (SHOULD_FALLBACK_TO_DASHBOARD_MOCK) {
        try {
          return await loadMock()
        } catch (mockError) {
          console.warn('Mock recommendations fallback failed', mockError)
        }
      }
      handleApiError(error)
    }
  }
}

export default dashboardService
