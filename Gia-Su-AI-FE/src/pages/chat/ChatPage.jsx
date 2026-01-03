import React, { useEffect, useMemo, useState } from 'react'
import chatService from '@services/chatService'
import './ChatPage.css'

const ChatPage = () => {
  const [conversations, setConversations] = useState([])
  const [selectedConv, setSelectedConv] = useState(null)
  const [conversationId, setConversationId] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [historyLoading, setHistoryLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)

  const activeCourseId = useMemo(() => {
    if (selectedConv?.course_id) return selectedConv.course_id
    if (conversations[0]?.course_id) return conversations[0].course_id
    return 'course-001'
  }, [selectedConv, conversations])

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setHistoryLoading(true)
        const res = await chatService.getChatHistory({ limit: 20 })
        setConversations(res?.conversations || [])
        setError(null)
        if (res?.conversations?.length) {
          handleSelectConversation(res.conversations[0])
        } else {
          setMessages([
            {
              message_id: 'greet-1',
              role: 'assistant',
              content:
                'Xin chào! Tôi là AI Tutor. Tôi có thể giúp bạn học tập, giải đáp thắc mắc, và hỗ trợ làm bài tập. Bạn muốn học về chủ đề gì hôm nay?',
              timestamp: new Date().toISOString()
            }
          ])
        }
      } catch (err) {
        setError(err.message || 'Khong the tai lich su chat')
      } finally {
        setHistoryLoading(false)
      }
    }
    loadHistory()
  }, [])

  const handleSelectConversation = async (conv) => {
    if (!conv) return
    setSelectedConv(conv)
    setConversationId(conv.conversation_id)
    try {
      setLoading(true)
      const detail = await chatService.getConversationDetail(conv.conversation_id)
      setMessages(detail?.messages || [])
      setError(null)
    } catch (err) {
      setError(err.message || 'Khong the tai hoi thoai')
    } finally {
      setLoading(false)
    }
  }

  const handleNewConversation = () => {
    setSelectedConv(null)
    setConversationId(null)
    setMessages([
      {
        message_id: 'greet-new',
        role: 'assistant',
        content:
          'Chào bạn! Bạn muốn hỏi về chủ đề nào? Tôi có thể giải thích khái niệm, gợi ý học tập, hoặc ôn quiz.',
        timestamp: new Date().toISOString()
      }
    ])
  }

  const handleSend = async () => {
    if (!input.trim()) return
    const question = input.trim()
    setMessages((prev) => [...prev, { message_id: Date.now(), role: 'user', content: question }])
    setInput('')
    try {
      setSending(true)
      const resp = await chatService.sendCourseChat(activeCourseId, {
        question,
        conversation_id: conversationId,
        context_type: 'general'
      })
      setConversationId(resp?.conversation_id || conversationId)
      setMessages((prev) => [
        ...prev,
        {
          message_id: resp?.message_id || `msg-${Date.now()}`,
          role: 'assistant',
          content: resp?.answer,
          sources: resp?.sources || [],
          timestamp: resp?.timestamp || new Date().toISOString()
        }
      ])
      const res = await chatService.getChatHistory({ limit: 20 })
      setConversations(res?.conversations || [])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          message_id: `err-${Date.now()}`,
          role: 'assistant',
          content: err.message || 'Khong the gui tin nhan'
        }
      ])
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="chat-page">
      <div className="chat-main">
        <div className="chat-left">
          <div className="chat-card-header">
            <div className="chat-title-block">
              <div className="chat-avatar">
                <img
                  src="https://www.shutterstock.com/image-vector/chat-bot-icon-design-robot-600nw-2476207303.jpg"
                  alt="AI"
                />
                <span className="dot" />
              </div>
              <div>
                <h2 className="chat-title-text">AI Tutor</h2>
                <p className="chat-subtitle">Trợ lý học tập thông minh</p>
              </div>
            </div>
            <span className="chat-status">
              <span className="status-icon">✦</span>
              Đang hoạt động
            </span>
          </div>

          <div className="chat-messages-panel">
            <div className="chat-messages-list">
              {historyLoading || loading ? <div className="chat-loading">Đang tải...</div> : null}
              {messages.map((msg) => (
                <div key={msg.message_id} className={`chat-bubble ${msg.role}`}>
                  <p>{msg.content}</p>
                  {msg.sources?.length ? (
                    <ul className="chat-source-list">
                      {msg.sources.map((s, idx) => (
                        <li key={idx}>
                          <strong>{s.title}</strong> - {s.excerpt}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {msg.role === 'assistant' && (
                    <div className="chat-tags">
                      <span className="chip">Lập trình Python</span>
                      <span className="chip">Machine Learning</span>
                      <span className="chip">Toán học</span>
                      <span className="chip">Tiếng Anh</span>
                      <span className="chip">Khoa học</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="chat-input-bar">
              <input
                type="text"
                placeholder="Nhập câu hỏi hoặc chủ đề bạn muốn học..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <div className="chat-input-actions">
                
                <button className="chat-send-btn filled" onClick={handleSend} disabled={sending}>
                  {sending ? '...' : '↪'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="chat-sidebar">
          <div className="chat-sidebar-header">
            <h4>Lịch sử trò chuyện</h4>
            <div className="sidebar-actions">
              <button className="new-chat-btn" onClick={handleNewConversation}>
                ✏️ Đoạn chat mới
              </button>
            </div>
          </div>
          {error && <div className="chat-error">{error}</div>}
          <div className="chat-conv-list">
            {conversations.map((conv) => (
              <div
                key={conv.conversation_id}
                className={`chat-conv-item ${conv.conversation_id === conversationId ? 'active' : ''}`}
                onClick={() => handleSelectConversation(conv)}
              >
                <div className="chat-conv-title">{conv.topic_summary || conv.course_title}</div>
                <div className="chat-conv-preview">{conv.last_message_preview}</div>
              </div>
            ))}
            {!conversations.length && !historyLoading && (
              <div className="chat-empty">Chưa có cuộc trò chuyện nào</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
