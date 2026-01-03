/*  
* Thanh tìm kiếm toàn cầu
*/
const simulateDelay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms))
const availableCategories = ['Programming', 'Math', 'Business', 'Languages']
const availableLevels = ['Beginner', 'Intermediate', 'Advanced']
const availableTypes = ['courses', 'classes', 'lessons', 'users']
const suggestionBank = [
  'Python cơ bản',
  'AI roadmap',
  'Business analytics',
  'Giao tiếp tiếng Anh',
  'Luyện thi IELTS',
  'Thiết kế chatbot'
]

const globalResources = [
  {
    type: 'course',
    id: 'course-001',
    title: 'Lập trình Python ứng dụng thực tế',
    description: 'Khóa học tổng hợp giúp bạn làm chủ Python và tự động hóa quy trình.',
    thumbnail_url:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=60',
    relevance_score: 96,
    highlight: '...Python ứng dụng thực tế...',
    category: 'Programming',
    level: 'Beginner'
  },
  {
    type: 'course',
    id: 'course-003',
    title: 'Chiến lược lãnh đạo sản phẩm với AI',
    description: 'Áp dụng AI vào lộ trình phát triển và vận hành sản phẩm.',
    thumbnail_url:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=60',
    relevance_score: 91,
    highlight: '...lãnh đạo sản phẩm với AI...',
    category: 'Business',
    level: 'Advanced'
  },
  {
    type: 'class',
    id: 'class-101',
    title: 'Lớp luyện thi IELTS cấp tốc',
    description: 'Lộ trình 06 tuần với giáo viên bản xứ và AI chấm điểm.',
    relevance_score: 88,
    highlight: '...IELTS cấp tốc...',
    category: 'Languages',
    level: 'Advanced'
  },
  {
    type: 'lesson',
    id: 'lesson-901',
    title: 'Phân tích dữ liệu với Pandas',
    description: 'Bài học thuộc khóa Python nâng cao, tập trung xử lý dataframe lớn.',
    relevance_score: 84,
    highlight: '...Pandas...',
    category: 'Programming',
    level: 'Intermediate'
  },
  {
    type: 'user',
    id: 'user-501',
    title: 'Trần Quỳnh Anh',
    description: 'Giảng viên Data Science với 8 năm kinh nghiệm tại Big4.',
    thumbnail_url: null,
    relevance_score: 82,
    highlight: '...Data Science...',
    category: 'Business',
    level: 'Advanced'
  },
  {
    type: 'lesson',
    id: 'lesson-902',
    title: 'Thiết lập chatbot AI với LangChain',
    description: 'Tích hợp nguồn dữ liệu nội bộ và tối ưu câu trả lời.',
    relevance_score: 80,
    highlight: '...chatbot AI...',
    category: 'Programming',
    level: 'Advanced'
  }
]

const normalize = (value) => value?.toString().toLowerCase() ?? ''

const matchesQuery = (item, query = '') => {
  if (!query?.trim()) return true
  const needle = normalize(query)
  return normalize(item.title).includes(needle) || normalize(item.description).includes(needle)
}

const matchesCategory = (item, category) => {
  if (!category) return true
  return item.category === category
}

const matchesLevel = (item, level) => {
  if (!level) return true
  return item.level === level
}

const matchesType = (item, type) => {
  if (!type) return true
  const normalized = type.endsWith('s') ? type.slice(0, -1) : type
  return item.type === normalized
}

const rankResults = (items = []) =>
  [...items].sort((a, b) => b.relevance_score - a.relevance_score || a.title.localeCompare(b.title))

const buildSuggestions = (query) => {
  if (!query) return suggestionBank
  const normalized = normalize(query)
  const matches = suggestionBank.filter((item) => normalize(item).includes(normalized))
  return matches.length ? matches : suggestionBank.slice(0, 3)
}

export const mockSearchAPI = {
  async globalSearch(params = {}) {
    await simulateDelay()
    const {
      q = '',
      type,
      category,
      level,
      skip = 0,
      limit = 10
    } = params

    const filtered = rankResults(
      globalResources.filter(
        (item) =>
          matchesQuery(item, q) && matchesType(item, type || '') && matchesCategory(item, category) && matchesLevel(item, level)
      )
    )

    const start = Number(skip) || 0
    const end = start + (Number(limit) || 10)
    const summaryByType = filtered.reduce(
      (acc, item) => {
        const key = `${item.type}s`
        acc[key] = (acc[key] || 0) + 1
        return acc
      },
      { courses: 0, classes: 0, lessons: 0, users: 0 }
    )
    return {
      query: q,
      total_results: filtered.length,
      results: filtered.slice(start, end),
      suggestions: buildSuggestions(q),
      filters: {
        available_categories: availableCategories,
        available_levels: availableLevels,
        available_types: availableTypes
      },
      summary_by_type: summaryByType
    }
  },

  async getFilters(params = {}) {
    await simulateDelay(220)
    return {
      resource: params.resource || 'courses',
      filters: {
        available_categories: availableCategories,
        available_levels: availableLevels,
        available_types: availableTypes
      },
      suggestions: suggestionBank,
      types: availableTypes
    }
  }
}
