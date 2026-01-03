const nowIso = () => new Date().toISOString()
const genId = (prefix = 'id') => `${prefix}-${Math.random().toString(36).slice(2, 10)}`

let conversations = [
  {
    conversation_id: 'conv-001',
    course_id: 'course-001',
    course_title: 'Lap trinh Python tu co ban den nang cao',
    topic_summary: 'Hoi ve closures va vong lap',
    message_count: 3,
    last_message_preview: 'Ban co the giai thich closure trong Python khong?',
    created_at: nowIso(),
    last_updated: nowIso()
  }
]

const messagesByConv = {
  'conv-001': [
    {
      message_id: 'msg-1',
      role: 'assistant',
      content:
        'Chao ban! Toi la AI Tutor. Ban co the hoi ve noi dung khoa hoc Python nay, tu syntax co ban den module nang cao.',
      timestamp: nowIso(),
      sources: []
    },
    {
      message_id: 'msg-2',
      role: 'user',
      content: 'Closure la gi?',
      timestamp: nowIso(),
      sources: []
    },
    {
      message_id: 'msg-3',
      role: 'assistant',
      content:
        'Closure la mot ham giu lai tham chieu den bien o scope ben ngoai khi ham do duoc goi. VD: `def outer(x): def inner(): return x`.',
      timestamp: nowIso(),
      sources: [
        { type: 'lesson', title: 'Intro to Closures', url: '#', excerpt: 'Closure giu lai bien ben ngoai.' }
      ]
    }
  ]
}

export const mockChatAPI = {
  async sendCourseChat(courseId, payload = {}) {
    const conversationId = payload.conversation_id || genId('conv')
    const messageId = genId('msg')
    const answerText =
      payload.question?.toLowerCase().includes('quiz') || payload.context_type === 'lesson'
        ? 'Day la tra loi mock: Ban can on lai quiz. Xem lai lesson lien quan hoac bam vao nguon duoi day.'
        : 'Tra loi mock tu schema 6.1: AI su dung context khoa hoc de giai dap.'

    if (!conversations.find((c) => c.conversation_id === conversationId)) {
      conversations.push({
        conversation_id: conversationId,
        course_id: courseId,
        course_title: 'Khoa hoc demo',
        topic_summary: payload.question?.slice(0, 50) || 'Hoi dap khoa hoc',
        message_count: 0,
        last_message_preview: '',
        created_at: nowIso(),
        last_updated: nowIso()
      })
      messagesByConv[conversationId] = []
    }

    messagesByConv[conversationId].push({
      message_id: messageId + '-user',
      role: 'user',
      content: payload.question,
      timestamp: nowIso(),
      sources: []
    })

    const assistantMessage = {
      conversation_id: conversationId,
      message_id: messageId,
      question: payload.question,
      answer: answerText,
      sources: [
        {
          type: 'lesson',
          id: 'lesson-001',
          title: 'Lesson 1: Tong quan',
          excerpt: 'Noi dung tong quan ve khoa hoc.'
        }
      ],
      related_lessons: [
        { lesson_id: 'lesson-001', title: 'Lesson 1: Tong quan', url: '#' },
        { lesson_id: 'lesson-002', title: 'Lesson 2: Closures', url: '#' }
      ],
      timestamp: nowIso(),
      tokens_used: 120
    }

    messagesByConv[conversationId].push({
      message_id: messageId,
      role: 'assistant',
      content: assistantMessage.answer,
      timestamp: assistantMessage.timestamp,
      sources: assistantMessage.sources
    })

    const conv = conversations.find((c) => c.conversation_id === conversationId)
    if (conv) {
      conv.message_count = (conv.message_count || 0) + 2
      conv.last_message_preview = assistantMessage.answer.slice(0, 100)
      conv.last_updated = nowIso()
    }

    return assistantMessage
  },

  async getChatHistory({ course_id, skip = 0, limit = 20 } = {}) {
    const filtered = course_id
      ? conversations.filter((c) => c.course_id === course_id)
      : conversations.slice()
    const sliced = filtered.slice(skip, skip + limit)
    const grouped_by_date = {
      today: sliced.map((c) => c.conversation_id),
      yesterday: [],
      this_week: [],
      older: []
    }
    return {
      conversations: sliced,
      grouped_by_date,
      total: filtered.length,
      skip,
      limit
    }
  },

  async getConversationDetail(conversationId) {
    const conv = conversations.find((c) => c.conversation_id === conversationId)
    if (!conv) {
      throw new Error('Conversation not found')
    }
    return {
      conversation_id: conv.conversation_id,
      course: {
        course_id: conv.course_id,
        title: conv.course_title,
        thumbnail_url: null
      },
      created_at: conv.created_at,
      last_updated: conv.last_updated,
      message_count: messagesByConv[conversationId]?.length || 0,
      messages: messagesByConv[conversationId] || []
    }
  },

  async deleteAllConversations() {
    const deletedCount = conversations.length
    conversations = []
    Object.keys(messagesByConv).forEach((k) => delete messagesByConv[k])
    return {
      deleted_count: deletedCount,
      message: 'Da xoa tat ca lich su chat',
      deleted_at: nowIso()
    }
  },

  async deleteConversation(conversationId) {
    const before = conversations.length
    conversations = conversations.filter((c) => c.conversation_id !== conversationId)
    delete messagesByConv[conversationId]
    return {
      conversation_id: conversationId,
      message: 'Conversation da duoc xoa',
      deleted_at: nowIso(),
      deleted: before !== conversations.length
    }
  }
}
