import api, { handleApiResponse, handleApiError } from './api'
import { USE_MOCK_API } from '@mocks'
import { mockCourseAPI } from '@mocks/mockCourses'
import { mockCourseModulesAPI } from '@mocks/mockCourseModules'
import { mockModuleAPI } from '@mocks/mockModuleDetails'
import { mockLessonAPI } from '@mocks/mockLessonDetails'

const FORCE_COURSE_MOCK = false
const SHOULD_FALLBACK_TO_COURSE_MOCK = false
const FORCE_MODULE_DETAIL_MOCK = false
const SHOULD_FALLBACK_TO_MODULE_MOCK = false
const FORCE_LESSON_DETAIL_MOCK = false
const SHOULD_FALLBACK_TO_LESSON_MOCK = false
const FORCE_COURSE_MODULES_MOCK = false
const SHOULD_FALLBACK_TO_COURSE_MODULES_MOCK = false

/**
 * Service xu ly khoa hoc
 */
export const courseService = {
  /**
   * Lay danh sach khoa hoc cong khai
   * @param {Object} params - Parameters tim kiem
   * @param {number} params.page - Trang hien tai
   * @param {number} params.limit - So luong item moi trang
   * @param {string} params.search - Tu khoa tim kiem
   * @param {string} params.category - Danh muc
   * @param {string} params.level - Cap do
   * @returns {Promise} Danh sach khoa hoc
   */
  async getPublicCourses(params = {}) {
    const loadMock = () => mockCourseAPI.listCourses(params)

    if (FORCE_COURSE_MOCK) {
      return loadMock()
    }

    try {
      const response = await api.get('/courses/public', { params })
      return handleApiResponse(response)
    } catch (error) {
      if (SHOULD_FALLBACK_TO_COURSE_MOCK) {
        try {
          return await loadMock()
        } catch (mockError) {
          console.warn('Mock public courses fallback failed', mockError)
        }
      }
      handleApiError(error)
    }
  },

  /**
   * Tim kiem khoa hoc
   * @param {Object} params - Parameters tim kiem
   * @returns {Promise} Ket qua tim kiem
   */
  async searchCourses(params = {}) {
    const loadMock = () => mockCourseAPI.searchCourses(params)

    if (FORCE_COURSE_MOCK) {
      return loadMock()
    }

    try {
      const response = await api.get('/courses/search', { params })
      return handleApiResponse(response)
    } catch (error) {
      if (SHOULD_FALLBACK_TO_COURSE_MOCK) {
        try {
          return await loadMock()
        } catch (mockError) {
          console.warn('Mock search courses fallback failed', mockError)
        }
      }
      handleApiError(error)
    }
  },

  /**
   * Lay thong tin chi tiet khoa hoc
   * @param {string} courseId - ID khoa hoc
   * @returns {Promise} Thong tin khoa hoc
   */
  async getCourseDetail(courseId) {
    const loadMock = () => mockCourseAPI.getCourseDetail(courseId)

    if (FORCE_COURSE_MOCK) {
      return loadMock()
    }

    try {
      const response = await api.get(`/courses/${courseId}`)
      return handleApiResponse(response)
    } catch (error) {
      if (SHOULD_FALLBACK_TO_COURSE_MOCK) {
        try {
          return await loadMock()
        } catch (mockError) {
          console.warn('Mock course detail fallback failed', mockError)
        }
      }
      handleApiError(error)
    }
  },

  /**
   * Lay danh sach module trong khoa hoc
   * @param {string} courseId - ID khoa hoc
   * @returns {Promise} Tong quan module
   */
  async getCourseModules(courseId) {
    const loadMock = () => mockCourseModulesAPI.getCourseModules(courseId)

    if (FORCE_COURSE_MODULES_MOCK) {
      return loadMock()
    }

    try {
      const response = await api.get(`/courses/${courseId}/modules`)
      return handleApiResponse(response)
    } catch (error) {
      if (SHOULD_FALLBACK_TO_COURSE_MODULES_MOCK) {
        try {
          return await loadMock()
        } catch (mockError) {
          console.warn('Mock course modules fallback failed', mockError)
        }
      }
      handleApiError(error)
    }
  },

  /**
   * Lay thong tin module
   * @param {string} courseId - ID khoa hoc
   * @param {string} moduleId - ID module
   * @returns {Promise} Thong tin module
   */
  async getModule(courseId, moduleId) {
    const loadMock = () => mockModuleAPI.getModuleDetail(courseId, moduleId)

    if (FORCE_MODULE_DETAIL_MOCK) {
      return loadMock()
    }

    try {
      const response = await api.get(`/courses/${courseId}/modules/${moduleId}`)
      return handleApiResponse(response)
    } catch (error) {
      if (SHOULD_FALLBACK_TO_MODULE_MOCK) {
        try {
          return await loadMock()
        } catch (mockError) {
          console.warn('Mock module detail fallback failed', mockError)
        }
      }
      handleApiError(error)
    }
  },

  /**
   * Lay noi dung bai hoc
   * @param {string} courseId - ID khoa hoc
   * @param {string} lessonId - ID bai hoc
   * @returns {Promise} Noi dung bai hoc
   */
  async getLesson(courseId, lessonId) {
    const loadMock = () => mockLessonAPI.getLessonDetail(courseId, lessonId)

    if (FORCE_LESSON_DETAIL_MOCK) {
      return loadMock()
    }

    try {
      const response = await api.get(`/courses/${courseId}/lessons/${lessonId}`)
      return handleApiResponse(response)
    } catch (error) {
      if (SHOULD_FALLBACK_TO_LESSON_MOCK) {
        try {
          return await loadMock()
        } catch (mockError) {
          console.warn('Mock lesson detail fallback failed', mockError)
        }
      }
      handleApiError(error)
    }
  },

  /**
   * Danh dau bai hoc da hoan thanh
   * @param {string} courseId - ID khoa hoc
   * @param {string} lessonId - ID bai hoc
   * @returns {Promise}
   */
  async markLessonComplete(courseId, lessonId) {
    const loadMock = () => ({
      success: true,
      message: 'Mock: lesson marked complete',
      course_id: courseId,
      lesson_id: lessonId,
      completed_at: new Date().toISOString()
    })

    if (FORCE_COURSE_MOCK) {
      return loadMock()
    }

    try {
      const response = await api.post(`/courses/${courseId}/lessons/${lessonId}/complete`)
      return handleApiResponse(response)
    } catch (error) {
      if (SHOULD_FALLBACK_TO_COURSE_MOCK) {
        try {
          return await loadMock()
        } catch (mockError) {
          console.warn('Mock mark lesson complete fallback failed', mockError)
        }
      }
      handleApiError(error)
    }
  },

  /**
   * Lay tien do hoc tap cua khoa hoc
   * @param {string} courseId - ID khoa hoc
   * @returns {Promise} Tien do hoc tap
   */
  async getCourseProgress(courseId) {
    const loadMock = () => ({
      course_id: courseId,
      progress_percent: 0,
      completed_lessons: 0,
      total_lessons: 0
    })

    if (FORCE_COURSE_MOCK) {
      return loadMock()
    }

    try {
      const response = await api.get(`/courses/${courseId}/progress`)
      return handleApiResponse(response)
    } catch (error) {
      if (SHOULD_FALLBACK_TO_COURSE_MOCK) {
        try {
          return await loadMock()
        } catch (mockError) {
          console.warn('Mock course progress fallback failed', mockError)
        }
      }
      handleApiError(error)
    }
  },

  /**
   * Danh gia khoa hoc
   * @param {string} courseId - ID khoa hoc
   * @param {Object} ratingData - Du lieu danh gia
   * @param {number} ratingData.rating - Diem danh gia (1-5)
   * @param {string} ratingData.review - Nhan xet
   * @returns {Promise}
   */
  async rateCourse(courseId, ratingData) {
    const loadMock = () => ({
      course_id: courseId,
      rating: ratingData?.rating ?? null,
      review: ratingData?.review ?? '',
      message: 'Mock: rating submitted'
    })

    if (FORCE_COURSE_MOCK) {
      return loadMock()
    }

    try {
      const response = await api.post(`/courses/${courseId}/rating`, ratingData)
      return handleApiResponse(response)
    } catch (error) {
      if (SHOULD_FALLBACK_TO_COURSE_MOCK) {
        try {
          return await loadMock()
        } catch (mockError) {
          console.warn('Mock rate course fallback failed', mockError)
        }
      }
      handleApiError(error)
    }
  },

  /**
   * Lay danh sach danh gia khoa hoc
   * @param {string} courseId - ID khoa hoc
   * @param {Object} params - Parameters phan trang
   * @returns {Promise} Danh sach danh gia
   */
  async getCourseRatings(courseId, params = {}) {
    const loadMock = async () => ({
      course_id: courseId,
      ratings: [],
      total: 0,
      ...params
    })

    if (FORCE_COURSE_MOCK) {
      return loadMock()
    }

    try {
      const response = await api.get(`/courses/${courseId}/ratings`, { params })
      return handleApiResponse(response)
    } catch (error) {
      if (SHOULD_FALLBACK_TO_COURSE_MOCK) {
        try {
          return await loadMock()
        } catch (mockError) {
          console.warn('Mock course ratings fallback failed', mockError)
        }
      }
      handleApiError(error)
    }
  },

  /**
   * Lay danh sach khoa hoc ca nhan
   * @param {Object} params - bo loc
   * @returns {Promise}
   */
  async getPersonalCourses(params = {}) {
    const loadMock = async () => {
      const result = await mockCourseAPI.listCourses(params)
      const enrolled = (result.courses || []).filter((course) => course.is_enrolled)
      return {
        courses: enrolled,
        total: enrolled.length,
        skip: Number(params.skip || 0),
        limit: Number(params.limit || enrolled.length || 10)
      }
    }

    if (FORCE_COURSE_MOCK) {
      return loadMock()
    }

    try {
      const response = await api.get('/courses/my-personal', { params })
      return handleApiResponse(response)
    } catch (error) {
      if (SHOULD_FALLBACK_TO_COURSE_MOCK) {
        try {
          return await loadMock()
        } catch (mockError) {
          console.warn('Mock personal courses fallback failed', mockError)
        }
      }
      handleApiError(error)
    }
  }
}

export default courseService
