import api, { handleApiError, handleApiResponse } from './api'
import { USE_MOCK_API, mockChatAPI } from '@mocks'

const FORCE_CHAT_MOCK = false
const SHOULD_FALLBACK_TO_CHAT_MOCK = false

const loadMock = () => mockChatAPI

const chatService = {
  async sendCourseChat(courseId, payload = {}) {
    const sendMock = () => loadMock().sendCourseChat(courseId, payload)

    if (FORCE_CHAT_MOCK) return sendMock()

    try {
      const res = await api.post(`/api/v1/chat/course/${courseId}`, payload)
      return handleApiResponse(res)
    } catch (error) {
      if (SHOULD_FALLBACK_TO_CHAT_MOCK) {
        try {
          return await sendMock()
        } catch (mockErr) {
          console.warn('Mock chat fallback failed', mockErr)
        }
      }
      handleApiError(error)
    }
  },

  async getChatHistory(params = {}) {
    const sendMock = () => loadMock().getChatHistory(params)
    if (FORCE_CHAT_MOCK) return sendMock()

    try {
      const res = await api.get('/api/v1/chat/history', { params })
      return handleApiResponse(res)
    } catch (error) {
      if (SHOULD_FALLBACK_TO_CHAT_MOCK) {
        try {
          return await sendMock()
        } catch (mockErr) {
          console.warn('Mock chat history fallback failed', mockErr)
        }
      }
      handleApiError(error)
    }
  },

  async getConversationDetail(conversationId) {
    const sendMock = () => loadMock().getConversationDetail(conversationId)
    if (FORCE_CHAT_MOCK) return sendMock()

    try {
      const res = await api.get(`/api/v1/chat/conversations/${conversationId}`)
      return handleApiResponse(res)
    } catch (error) {
      if (SHOULD_FALLBACK_TO_CHAT_MOCK) {
        try {
          return await sendMock()
        } catch (mockErr) {
          console.warn('Mock chat detail fallback failed', mockErr)
        }
      }
      handleApiError(error)
    }
  },

  async deleteAllConversations() {
    const sendMock = () => loadMock().deleteAllConversations()
    if (FORCE_CHAT_MOCK) return sendMock()

    try {
      const res = await api.delete('/api/v1/chat/conversations')
      return handleApiResponse(res)
    } catch (error) {
      if (SHOULD_FALLBACK_TO_CHAT_MOCK) {
        try {
          return await sendMock()
        } catch (mockErr) {
          console.warn('Mock delete all conversations fallback failed', mockErr)
        }
      }
      handleApiError(error)
    }
  },

  async deleteConversation(conversationId) {
    const sendMock = () => loadMock().deleteConversation(conversationId)
    if (FORCE_CHAT_MOCK) return sendMock()

    try {
      const res = await api.delete(`/api/v1/chat/history/${conversationId}`)
      return handleApiResponse(res)
    } catch (error) {
      if (SHOULD_FALLBACK_TO_CHAT_MOCK) {
        try {
          return await sendMock()
        } catch (mockErr) {
          console.warn('Mock delete conversation fallback failed', mockErr)
        }
      }
      handleApiError(error)
    }
  }
}

export default chatService
