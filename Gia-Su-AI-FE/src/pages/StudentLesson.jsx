
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCourseStore } from '@stores/courseStore'
import chatService from '@services/chatService'
import quizService from '@services/quizService'
import CurriculumSidebar from '@components/dashboard/CurriculumSidebar'
import ScrollTopButton from '@components/ui/ScrollTopButton'
import './StudentLesson.css'

const StudentLesson = () => {
  const { courseId, lessonId } = useParams()
  const navigate = useNavigate()
  const {
    currentLesson: lesson,
    isLoading: loading,
    error,
    getLesson,
    getModule
  } = useCourseStore()
  
  const [isCurriculumOpen, setCurriculumOpen] = useState(true)
  const [quizDetails, setQuizDetails] = useState(null)
  const [quizLoading, setQuizLoading] = useState(false)
  const [quizError, setQuizError] = useState(null)
  const [moduleInfo, setModuleInfo] = useState(null)
  const [assessment, setAssessment] = useState(null)
  // ... (rest of the state variables remain for now)
  const [assessmentLoading, setAssessmentLoading] = useState(false)
  const [assessmentError, setAssessmentError] = useState(null)
  const [showQuizQuestions, setShowQuizQuestions] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [submitState, setSubmitState] = useState({ status: 'idle', message: '' })
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [quizTimeLeft, setQuizTimeLeft] = useState(null)
  const [quizResults, setQuizResults] = useState(null)
  const [quizResultsLoading, setQuizResultsLoading] = useState(false)
  const [retakeLoading, setRetakeLoading] = useState(false)
  const [retakeError, setRetakeError] = useState(null)
  const [practiceData, setPracticeData] = useState(null)
  const [practiceLoading, setPracticeLoading] = useState(false)
  const [practiceError, setPracticeError] = useState(null)
  const autoAdvanceRef = useRef(false)
  const enablePracticeExercises = false
  const [chatOpen, setChatOpen] = useState(false)
  const [chatConversationId, setChatConversationId] = useState(null)
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      answer:
        'Chào bạn! Tôi là trợ lý AI của khóa học. Bạn có thể hỏi bất kỳ câu hỏi nào về nội dung module/bài học hiện tại.',
      timestamp: new Date().toISOString(),
      sources: []
    }
  ])
  const [chatInput, setChatInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)
  const videoSectionRef = useRef(null)

  const quizFallback = {
    id: 'quiz-mock-demo',
    title: 'Quiz sau bài học',
    description: 'Quiz ngắn giúp bạn ôn lại kiến thức trước khi mở bài tiếp theo.',
    question_count: 5,
    time_limit: 15,
    pass_threshold: 70,
    mandatory_question_count: 1,
    user_attempts: 0,
    best_score: null,
    last_attempt_at: null
  }
  const usingStaticQuestions = Array.isArray(lesson?.quiz_questions) && lesson.quiz_questions.length > 0

  useEffect(() => {
    const fetchLesson = async () => {
      await getLesson(courseId, lessonId)
    }
    fetchLesson()
  }, [courseId, lessonId, getLesson])

  useEffect(() => {
    const fetchModule = async () => {
      if (!lesson?.module_id) {
        setModuleInfo(null)
        return
      }
      try {
        const data = await courseService.getModule(courseId, lesson.module_id)
        setModuleInfo(data)
      } catch (err) {
        console.warn('Không thể tải thông tin module', err)
        setModuleInfo(null)
      }
    }
    fetchModule()
  }, [courseId, lesson?.module_id])

  useEffect(() => {
    const fetchQuizDetails = async () => {
      if (!lesson?.has_quiz || !lesson.quiz_info?.quiz_id) {
        setQuizDetails(null)
        return
      }
      try {
        setQuizLoading(true)
        const data = await quizService.getQuizInfo(lesson.quiz_info.quiz_id)
        setQuizDetails(data)
        setQuizError(null)
      } catch (err) {
        setQuizError(err.message || 'Không thể tải thông tin quiz')
        setQuizDetails(quizFallback)
      } finally {
        setQuizLoading(false)
      }
    }

    fetchQuizDetails()
  }, [lesson?.has_quiz, lesson?.quiz_info?.quiz_id])

  useEffect(() => {
    const loadAssessment = async () => {
      if (!lesson?.module_id) {
        setAssessment(null)
        return
      }
      setAssessmentLoading(true)
      // If lesson already has static quiz questions, use them instead of the generic mock pool
      if (usingStaticQuestions) {
        const mappedQuestions = lesson.quiz_questions.map((q, idx) => ({
          question_id: q.id || `qq-${idx + 1}`,
          order: q.order || idx + 1,
          question_text: q.question_text,
          options: q.options || [],
          difficulty: q.difficulty || 'mixed',
          is_mandatory: Boolean(q.is_mandatory),
          points: q.points || 0,
          correct_answer: q.correct_answer,
          explanation: q.explanation || ''
        }))
        setAssessment({
          assessment_id: `asm-${lesson.module_id}`,
          module_id: lesson.module_id,
          module_title: lesson.title || lesson.module_id,
          assessment_type: 'review',
          question_count: mappedQuestions.length,
          time_limit_minutes: lesson.quiz_info?.time_limit || 15,
          total_points: mappedQuestions.reduce((sum, q) => sum + (q.points || 0), 0),
          pass_threshold: lesson.quiz_info?.pass_threshold || 70,
          questions: mappedQuestions,
          instructions: 'Tra loi cac cau hoi ben duoi.'
        })
        setAssessmentLoading(false)
        setAssessmentError(null)
        return
      }
      try {
        setAssessmentLoading(true)
        const payload = {
          assessment_type: 'review',
          question_count: lesson.quiz_info?.question_count || 8,
          difficulty_preference: 'mixed',
          focus_topics: lesson.learning_objectives || [],
          time_limit_minutes: lesson.quiz_info?.time_limit || 15
        }
        const data = await quizService.generateModuleAssessment(courseId, lesson.module_id, payload)
        setAssessment(data)
        setAssessmentError(null)
      } catch (err) {
        setAssessment(null)
        setAssessmentError(err.message || 'Không thể sinh quiz module')
      } finally {
        setAssessmentLoading(false)
      }
      }

      loadAssessment()
  }, [courseId, lesson?.module_id, lesson?.quiz_info?.question_count, lesson?.learning_objectives, usingStaticQuestions])

  const handleNavigateLesson = (targetId) => {
    if (!targetId) return
    navigate(`/dashboard/courses/${courseId}/lessons/${targetId}`)
  }

  const handleJumpToMainContent = () => {
    if (lesson?.content?.video_url && videoSectionRef.current) {
      videoSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    document.querySelector('.lesson-main')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleStartQuizInline = () => {
    setShowQuizQuestions(true)
    setSubmitState({ status: 'idle', message: '' })
    setCurrentQuestionIdx(0)
    const seconds =
      ((assessment?.time_limit_minutes || quizPreview?.time_limit || 15) ?? 15) * 60
    setQuizTimeLeft(seconds)
    autoAdvanceRef.current = false
  }

  const handleSelectAnswer = (questionId, optionId) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionId }))
  }

  const buildLocalResults = () => {
    if (!assessment?.questions?.length) return null
    const passThreshold = quizPreview?.pass_threshold || lesson?.quiz_info?.pass_threshold || 70
    let correctCount = 0
    const results =
      assessment.questions.map((q) => {
        const studentAnswer = selectedAnswers[q.question_id] || ''
        const correctAnswer = q.correct_answer || ''
        const isCorrect = studentAnswer === correctAnswer
        if (isCorrect) correctCount += 1
        return {
          question_id: q.question_id,
          question_content: q.question_text,
          student_answer: studentAnswer,
          correct_answer: correctAnswer,
          is_correct: isCorrect,
          is_mandatory: Boolean(q.is_mandatory),
          score: q.points || 0,
          explanation: q.explanation || ''
        }
      }) || []
    const totalScore = Math.round((correctCount / (assessment.questions.length || 1)) * 100)
    return {
      attempt_id: `attempt-${quizPreview?.id || 'local'}`,
      quiz_id: quizPreview?.id,
      total_score: totalScore,
      status: totalScore >= passThreshold ? 'Pass' : 'Fail',
      pass_threshold: passThreshold,
      results
    }
  }

  const handleSubmitQuiz = async () => {
    if (!quizPreview?.id || !assessment?.questions?.length) return
    const answersPayload = assessment.questions.map((q) => ({
      question_id: q.question_id,
      selected_option: selectedAnswers[q.question_id] || ''
    }))
    try {
      setSubmitState({ status: 'submitting', message: '' })
      if (usingStaticQuestions) {
        const localResults = buildLocalResults()
        setQuizResults(localResults)
        setSubmitState({ status: 'idle', message: '' })
        setShowQuizQuestions(true) // giu trang thai hien thi de xem ngay dap an
        if (enablePracticeExercises && localResults?.status?.toLowerCase() === 'fail') {
          generatePracticeFromResults([])
        } else {
          setPracticeData(null)
        }
      } else {
        await quizService.submitQuizAttempt(quizPreview.id, { answers: answersPayload })
        setSubmitState({ status: 'idle', message: '' })
        await fetchQuizResults()
      }
    } catch (err) {
      setSubmitState({ status: 'error', message: err.message || 'Nộp bài thất bại' })
    }
  }

  const handleNextQuestion = () => {
    if (!assessment?.questions?.length) return
    setCurrentQuestionIdx((prev) => Math.min(prev + 1, assessment.questions.length - 1))
  }

  const fetchQuizResults = async () => {
    if (!quizPreview?.id) return
    if (usingStaticQuestions) {
      const localResults = buildLocalResults()
      setQuizResults(localResults)
      return
    }
    try {
      setQuizResultsLoading(true)
      const data = await quizService.getQuizResultsPublic(quizPreview.id)
      setQuizResults(data)
      if (enablePracticeExercises && data?.status?.toLowerCase() === 'fail') {
        const incorrectSkills =
          data.results
            ?.filter((r) => !r.is_correct && r.related_skill)
            ?.map((r) => r.related_skill) || []
        generatePracticeFromResults(incorrectSkills)
      } else {
        setPracticeData(null)
      }

      if (
        data?.status?.toLowerCase() === 'pass' &&
        lesson.navigation?.next_lesson?.id &&
        !autoAdvanceRef.current
      ) {
        autoAdvanceRef.current = true
        setTimeout(() => {
          navigate(`/dashboard/courses/${courseId}/lessons/${lesson.navigation.next_lesson.id}`)
        }, 1200)
      }
    } catch (err) {
      setSubmitState({ status: 'error', message: err.message || 'Không thể lấy kết quả quiz' })
    } finally {
      setQuizResultsLoading(false)
    }
  }

  const handleRetakeQuiz = async () => {
    if (!quizPreview?.id) return
    try {
      setRetakeLoading(true)
      setRetakeError(null)
      const resp = await quizService.retakeQuiz(quizPreview.id)
      const mappedQuestions =
        resp?.questions?.map((q, idx) => ({
          question_id: q.id,
          order: idx + 1,
          question_text: q.content,
          options:
            q.options?.map((opt, i) => ({
              option_id: String.fromCharCode(65 + i),
              content: opt
            })) || [],
          difficulty: 'mixed',
          is_mandatory: false,
          points: 0
        })) || []
      setAssessment((prev) => ({
        ...(prev || {}),
        questions: mappedQuestions,
        question_count: mappedQuestions.length
      }))
      setSelectedAnswers({})
      setCurrentQuestionIdx(0)
      setQuizResults(null)
      setShowQuizQuestions(true)
      setSubmitState({ status: 'idle', message: '' })
      setQuizTimeLeft(((assessment?.time_limit_minutes || quizPreview?.time_limit || 15) ?? 15) * 60)
      autoAdvanceRef.current = false
    } catch (err) {
      setRetakeError(err.message || 'Không thể làm lại quiz')
    } finally {
      setRetakeLoading(false)
    }
  }

  const generatePracticeFromResults = async (focusSkills = []) => {
    if (!enablePracticeExercises) {
      setPracticeData(null)
      setPracticeError(null)
      return
    }
    try {
      setPracticeLoading(true)
      setPracticeError(null)
      const payload = {
        lesson_id: lesson?.id,
        course_id: courseId,
        difficulty: 'medium',
        question_count: 5,
        practice_type: 'multiple_choice',
        focus_skills: focusSkills
      }
      const data = await quizService.generatePracticeExercises(payload)
      setPracticeData(data)
    } catch (err) {
      setPracticeError(err.message || 'Không thể tạo bài luyện tập cá nhân hóa')
    } finally {
      setPracticeLoading(false)
    }
  }

  const handleSendChat = async () => {
    if (!chatInput.trim()) return
    const question = chatInput.trim()
    setChatMessages((prev) => [...prev, { role: 'user', question, timestamp: new Date().toISOString() }])
    setChatInput('')
    try {
      setChatLoading(true)
      const resp = await chatService.sendCourseChat(courseId, {
        question,
        conversation_id: chatConversationId,
        context_type: 'lesson'
      })
      setChatConversationId(resp?.conversation_id || chatConversationId)
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          answer: resp?.answer,
          timestamp: resp?.timestamp || new Date().toISOString(),
          sources: resp?.sources || []
        }
      ])
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        { role: 'assistant', answer: err.message || 'Không thể gửi tin nhắn', timestamp: new Date().toISOString() }
      ])
    } finally {
      setChatLoading(false)
    }
  }

  useEffect(() => {
    if (!showQuizQuestions || !quizTimeLeft) return
    const timer = setInterval(() => {
      setQuizTimeLeft((prev) => (prev && prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [showQuizQuestions, quizTimeLeft])

  const formatTimer = (seconds) => {
    if (seconds == null) return ''
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handlePrevQuestion = () => {
    setCurrentQuestionIdx((prev) => Math.max(prev - 1, 0))
  }

  const closeCurriculumDrawer = () => setCurriculumOpen(false)
  const openCurriculumDrawer = () => setCurriculumOpen(true)

  if (loading) {
    return <div className="lesson-page">Đang tải nội dung bài học...</div>
  }

  if (error) {
    return <div className="lesson-page error">{error}</div>
  }

  if (!lesson) return null

  const spentMinutes = lesson.completion_status?.time_spent_minutes || 0
  const videoProgress = lesson.completion_status?.video_progress_percent
  const isLessonCompleted = lesson.completion_status?.is_completed
  const statusLabel = isLessonCompleted
    ? 'Đã hoàn thành'
    : spentMinutes > 0
      ? 'Đang học'
      : 'Chưa hoàn thành'
  const statusClass = isLessonCompleted
    ? 'status-pill status-pill--success'
    : spentMinutes > 0
      ? 'status-pill status-pill--progress'
      : 'status-pill status-pill--idle'
  const lessonDescription = lesson.description?.trim() ? lesson.description : null
const quizMeta = lesson.quiz_info || {}
  const quizPreview =
    quizDetails ||
    (lesson.has_quiz
      ? {
          id: quizMeta.quiz_id || `${lesson.id}-quiz`,
          title: quizMeta.title || 'Quiz sau bài học',
          description:
            quizMeta.description ||
            'Quiz ngắn giúp bạn ôn lại kiến thức trước khi mở bài tiếp theo.',
          question_count: quizMeta.question_count || 0,
          time_limit: quizMeta.time_limit || 15,
          pass_threshold: quizMeta.pass_threshold || 70,
          mandatory_question_count:
            quizMeta.mandatory_question_count || (quizMeta.is_mandatory ? 1 : 0),
          user_attempts: quizMeta.user_attempts ?? 0,
          best_score: quizMeta.best_score ?? null,
          last_attempt_at: quizMeta.last_attempt_at || null
        }
      : null)
  const quizPassed = quizResults?.status?.toLowerCase() === 'pass'
  const formatDateTime = (isoString) => {
    if (!isoString) return 'Chưa có'
    const parsed = new Date(isoString)
    if (Number.isNaN(parsed.getTime())) return 'Chưa có'
    return parsed.toLocaleString()
  }
  const theoryContent =
    lesson.content?.text_content ||
    '<p>Hiện chưa có nội dung lý thuyết cho bài học này. Vui lòng quay lại sau.</p>'
  const videoUrl = lesson.content?.video_url
  const isHtmlEmbed = typeof videoUrl === 'string' && videoUrl.endsWith('.html')
  const isYouTube =
    typeof videoUrl === 'string' &&
    (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be'))
  const embedYouTubeUrl = isYouTube
    ? videoUrl
        .replace('watch?v=', 'embed/')
        .replace('youtu.be/', 'www.youtube.com/embed/')
    : null
  const insights = [
    { label: 'Thời lượng', value: `${lesson.duration_minutes || 0} phút` },
    { label: 'Đã học', value: `${spentMinutes} phút` },
    { label: 'Video', value: videoProgress != null ? `${videoProgress}%` : 'Chưa xem' },
    { label: 'Trạng thái', value: statusLabel }
]

  const moduleLabel = (() => {
    const title = moduleInfo?.title || lesson.module_title || lesson.module_name
    const id = lesson.module_id || ''
    const numericFromId = id.match(/(\d+)/)?.[0]
    const order =
      moduleInfo?.order ||
      lesson.module_order ||
      lesson.module_index ||
      (numericFromId ? Number(numericFromId) : null)
    if (title && order) return `Chương ${order}: ${title}`
    if (title) return `Chương: ${title}`
    if (order) return `Chương ${order}`
    return `Chương: ${id || '---'}`
  })()

  return (
    <div className="lesson-page">
      <div className="lesson-shell">
        <div className={`lesson-content-column ${!isCurriculumOpen ? 'expanded' : ''}`}>
          <header className="lesson-header">
            <div className="breadcrumb">
              <Link to={`/dashboard/courses/${courseId}`}>Khóa học</Link>
              <span>/</span>
              <Link to={`/dashboard/courses/${courseId}/modules/${lesson.module_id}`}>Module</Link>
              <span>/</span>
              <strong>{lesson.title}</strong>
            </div>

            <div className="lesson-hero">
              <div className="lesson-hero-text">
                <p className="lesson-eyebrow">{moduleLabel}</p>
                <h1>
                  Bài {lesson.order}: {lesson.title}
                </h1>
                {lessonDescription && <p className="lesson-description">{lessonDescription}</p>}
              </div>
              <div className="lesson-hero-actions">
                <button
                  type="button"
                  className="ghost"
                  disabled={!lesson.navigation?.previous_lesson?.id}
                  onClick={() => handleNavigateLesson(lesson.navigation?.previous_lesson?.id)}
                >
                  Bài trước
                </button>
                {!isCurriculumOpen && (
                  <button
                    type="button"
                    className="curriculum-inline-toggle"
                    onClick={openCurriculumDrawer}
                  >
                    Chương trình học
                  </button>
                )}
              </div>
            </div>

            <div className="lesson-insights">
              {insights.map((insight) => (
                <div className="lesson-insight" key={insight.label}>
                  <p>{insight.label}</p>
                  <strong>{insight.value}</strong>
                </div>
              ))}
            </div>
          </header>

          <main className="lesson-main">
            {lesson.learning_objectives?.length ? (
              <section className="lesson-card">
                <h2>Mục tiêu học tập</h2>
                <ul className="objectives-list">
                  {lesson.learning_objectives.map((objective, index) => (
                    <li key={`${objective}-${index}`}>{objective}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="lesson-card">
              <div className="lesson-card-heading">
                <h2 className="lesson-heading-with-icon">
                  <span className="lesson-heading-icon" aria-hidden="true">
                    <span className="icon-layer layer-green" />
                    <span className="icon-layer layer-pink" />
                    <span className="icon-layer layer-blue" />
                  </span>
                  Nội dung lý thuyết
                </h2>
              </div>
              <div className="lesson-text-content" dangerouslySetInnerHTML={{ __html: theoryContent }} />
            </section>

            {lesson.content?.video_url && (
              <section
                className={`lesson-card lesson-card--emphasis lesson-video-section ${
                  isHtmlEmbed ? 'lesson-video-section--simulation' : ''
                }`}
                ref={videoSectionRef}
              >
                <div className="lesson-card-heading video-heading">
                  <div className="lesson-heading-with-icon">
                    <span className="video-camera-icon" aria-hidden="true" />
                    <h2>{isHtmlEmbed ? 'Mô phỏng bài toán' : 'Video bài học'}</h2>
                  </div>
                    {videoProgress != null && (
                    <span className="pill pill--ghost">{videoProgress}% đã xem</span>
                  )}
                </div>
                <div className="lesson-video-layout">
                  <div className={`lesson-video-wrapper ${isHtmlEmbed ? 'simulation' : 'compact'}`}>
                    {isHtmlEmbed ? (
                      <iframe
                        src={videoUrl}
                        title={lesson.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : isYouTube && embedYouTubeUrl ? (
                      <iframe
                        src={embedYouTubeUrl}
                        title={lesson.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video controls preload="metadata" poster={lesson.content?.video_thumbnail || undefined}>
                        <source src={lesson.content.video_url} type="video/mp4" />
                        Tr?nh duy?t c?a b?n kh?ng h? tr? video.
                      </video>
                    )}
                  </div>

                  {lesson.resources?.length ? (
                    <aside className="video-notes">
                      <div className="video-notes-heading">
                        <span className="note-clipboard-icon" aria-hidden="true" />
                        <h3>Tài liệu bổ sung</h3>
                      </div>
                      <ul className="video-bullets">
                        {lesson.resources.map((res) => (
                          <li key={res.id || res.title}>
                            <strong>{res.title}</strong>
                            <br />
                            <small>{res.description}</small>
                            <br />
                            <a href={res.url} target="_blank" rel="noreferrer">Xem</a>
                          </li>
                        ))}
                      </ul>
                    </aside>
                  ) : null}
                </div>
              </section>
            )}
            {quizPreview && (
              <section
                className={`lesson-card lesson-quiz-card ${showQuizQuestions ? 'quiz-card-playing' : ''}`}
              >
                {!showQuizQuestions && (
                  <div className="quiz-hero">
                    <img
                      className="quiz-hero-icon"
                      src="https://cdn3d.iconscout.com/3d/premium/thumb/quiz-3d-icon-png-download-10553616.png"
                      alt="Quiz icon"
                    />
                    <h2>Quiz sau bài học</h2>
                    <p className="quiz-description">
                      {quizPreview.description ||
                        'Quiz giúp bạn củng cố kiến thức trước khi tiếp tục bài học.'}
                    </p>
                  </div>
                )}

                {quizLoading ? (
                  <p className="quiz-hint">Đang tải thông tin quiz...</p>
                ) : quizError ? (
                  <p className="quiz-error">{quizError}</p>
                ) : showQuizQuestions ? (
                  <div className="quiz-play">
                    {quizResultsLoading && <p className="quiz-hint">Đang tải kết quả...</p>}
                    {assessmentLoading && <p className="quiz-hint">Đang sinh câu hỏi tự động...</p>}
                    {assessmentError && <p className="quiz-error">{assessmentError}</p>}
                    {quizResults ? (
                      <div className="quiz-results">
                        <div className="quiz-results-summary">
                          <img
                            src="https://cdn3d.iconscout.com/3d/premium/thumb/quiz-3d-icon-png-download-10553616.png"
                            alt="Quiz icon"
                            className="quiz-result-icon"
                          />
                          <h3 className="quiz-result-title">Kết quả bài quiz</h3>
                          <p
                            className={`quiz-result-score ${
                              quizResults.status?.toLowerCase() === 'pass' ? 'pass' : 'fail'
                            }`}
                          >
                            {quizResults.total_score}/100 - {quizResults.status} (Yêu cầu: {quizResults.pass_threshold}
                            %)
                          </p>
                        </div>
                        <div className="quiz-result-list">
                          {quizResults.results?.map((r, idx) => {
                            const q = assessment?.questions?.find((item) => item.question_id === r.question_id)
                            return (
                              <div className="quiz-result-item" key={r.question_id}>
                                <p className="quiz-question-text">
                                  Câu {idx + 1}: {r.question_content}
                                </p>
                                {q?.options?.length ? (
                                  <ul className="quiz-options-grid">
                                    {q.options.map((opt) => {
                                      const isCorrect = opt.option_id === r.correct_answer
                                      const isSelected = opt.option_id === r.student_answer
                                      const optionClass = isCorrect
                                        ? 'correct-option'
                                        : isSelected
                                          ? 'incorrect-option'
                                          : ''
                                      return (
                                        <li key={`${q.question_id}-${opt.option_id}`}>
                                          <label className={`quiz-option ${optionClass}`}>
                                            <input type="radio" disabled checked={isSelected} />
                                            <span className="option-letter">{opt.option_id}.</span>
                                            <span>{opt.content}</span>
                                          </label>
                                        </li>
                                      )
                                    })}
                                  </ul>
                                ) : null}
                                <p className={`quiz-explain ${r.is_correct ? 'correct' : 'incorrect'}`}>
                                  Giải thích: {r.explanation}
                                </p>
                                {!r.is_correct && r.related_lesson_link && (
                                  <a className="quiz-review-link" href={r.related_lesson_link}>
                                    Ôn lại bài học
                                  </a>
                                )}
                              </div>
                            )
                          })}
                        </div>
                        {quizResults.status?.toLowerCase() === 'fail' && (
                          <div className="quiz-actions">
                            <button
                              type="button"
                              className="quiz-cta"
                              disabled={retakeLoading || !quizPreview?.id}
                              onClick={handleRetakeQuiz}
                            >
                              {retakeLoading ? 'Đang tạo quiz mới...' : 'Làm lại quiz'}
                            </button>
                            {retakeError && <p className="quiz-error">{retakeError}</p>}
                          </div>
                        )}
                        {enablePracticeExercises && quizResults.status?.toLowerCase() === 'fail' && (
                          <div className="practice-block">
                            <h4>Luyện tập cá nhân hóa</h4>
                            {practiceLoading && <p className="quiz-hint">Đang tạo bài luyện tập...</p>}
                            {practiceError && <p className="quiz-error">{practiceError}</p>}
                            {practiceData?.exercises?.length ? (
                              <ul className="practice-list">
                                {practiceData.exercises.map((ex) => (
                                  <li key={ex.id} className="practice-item">
                                    <div className="practice-meta">
                                      <span className="pill pill--ghost">{ex.type}</span>
                                      <span className="pill pill--ghost">{ex.difficulty}</span>
                                      {ex.related_skill && (
                                        <span className="pill pill--ghost">{ex.related_skill}</span>
                                      )}
                                    </div>
                                    <p className="practice-question">{ex.question}</p>
                                    {ex.options?.length ? (
                                      <ul className="practice-options">
                                        {ex.options.map((opt, idx) => (
                                          <li key={`${ex.id}-opt-${idx}`}>{opt}</li>
                                        ))}
                                      </ul>
                                    ) : null}
                                    <p className="practice-answer">
                                      Đáp án: {ex.correct_answer} | {ex.explanation}
                                    </p>
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                          </div>
                        )}
                      </div>
                    ) : assessment && assessment.questions?.length ? (
                      <>
                        <div className="quiz-play-top">
                          <div className="quiz-play-badges">
                            <span className="pill pill--ghost">
                             Câu {currentQuestionIdx + 1}/{assessment.questions.length}
                            </span>
                            <span className="pill pill--ghost">
                              {formatTimer(quizTimeLeft || 0)}
                            </span>
                          </div>
                        </div>

                        <div className="quiz-question-card">
                          {(() => {
                            const q = assessment.questions[currentQuestionIdx]
                            return (
                              <>
                                <p className="quiz-question-text">
                                  Câu {currentQuestionIdx + 1}: {q.question_text}
                                </p>
                                {q.options?.length ? (
                                  <ul className="quiz-options-grid">
                                    {q.options.map((opt) => (
                                      <li key={`${q.question_id}-${opt.option_id}`}>
                                        <label className="quiz-option">
                                          <input
                                            type="radio"
                                            name={`q-${q.question_id}`}
                                            value={opt.option_id}
                                            checked={selectedAnswers[q.question_id] === opt.option_id}
                                            onChange={() => handleSelectAnswer(q.question_id, opt.option_id)}
                                          />
                                          <span className="option-letter">{opt.option_id}.</span>
                                          <span>{opt.content}</span>
                                        </label>
                                      </li>
                                    ))}
                                  </ul>
                                ) : null}
                                {q.hint && <p className="question-hint">G?i ?: {q.hint}</p>}
                              </>
                            )
                          })()}
                        </div>

                        <div className="quiz-play-actions">
                          <button
                            type="button"
                            className="ghost ghost-compact"
                            disabled={currentQuestionIdx === 0}
                            onClick={handlePrevQuestion}
                          >
                            ← Câu trước
                          </button>
                          {currentQuestionIdx < assessment.questions.length - 1 ? (
                            <button type="button" className="quiz-cta" onClick={handleNextQuestion}>
                              Câu tiếp →
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="quiz-cta"
                              disabled={submitState.status === 'submitting'}
                              onClick={handleSubmitQuiz}
                            >
                              {submitState.status === 'submitting' ? 'Đang nộp...' : 'Nộp bài'}
                            </button>
                          )}
                        </div>
                        {submitState.status === 'error' && <p className="quiz-error">{submitState.message}</p>}
                      </>
                    ) : (
                      <p className="quiz-hint">Chưa có câu hỏi.</p>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="quiz-meta-grid quiz-hero-grid">
                      <div className="quiz-meta hero-card">
                        <strong>{quizPreview.question_count ?? 0}</strong>
                        <span>Cau hoi</span>
                      </div>
                      <div className="quiz-meta hero-card">
                        <strong>{quizPreview.time_limit ?? 0}</strong>
                        <span>Phut</span>
                      </div>
                      <div className="quiz-meta hero-card">
                        <strong>{quizPreview.pass_threshold ?? 0}%</strong>
                        <span>Dat yeu cau</span>
                      </div>
                    </div>

                    <ul className="quiz-feature-list">
                      <li>
                        Điểm liệt: {quizPreview.mandatory_question_count ?? 0} &nbsp;|&nbsp; Lần đã làm:{' '}
                        {quizPreview.user_attempts ?? 0} &nbsp;|&nbsp; Điểm cao nhất:{' '}
                        {quizPreview.best_score != null ? `${quizPreview.best_score}/100` : 'Chưa có'}.
                      </li>
                    </ul>

                    <div className="quiz-actions">
                      <button
                        type="button"
                        className="quiz-cta"
                        disabled={!quizPreview?.id || assessmentLoading}
                        onClick={handleStartQuizInline}
                      >
                        Bắt đầu làm bài
                      </button>
                    </div>
                  </>
                )}
              </section>
            )}

            <div className="lesson-support-grid">
              <section className="lesson-card compact">
                <div className="navigation-actions nav-align-end">
                  <button
                    type="button"
                    className="primary"
                    disabled={
                      !lesson.navigation?.next_lesson?.id ||
                      lesson.navigation?.next_lesson?.is_locked ||
                      (lesson.has_quiz && !quizPassed)
                    }
                    onClick={() => handleNavigateLesson(lesson.navigation?.next_lesson?.id)}
                  >
                    {lesson.navigation?.next_lesson?.is_locked ? 'Đang Khóa' : 'Bài tiếp theo'}
                  </button>
                </div>
                {lesson.navigation?.next_lesson?.is_locked && (
                  <p className="locked-note">Hoàn thành bài này để mở nội dung tiếp theo.</p>
                )}
              </section>

              
            </div>
          </main>
        </div>
        <aside className={`curriculum-drawer ${isCurriculumOpen ? 'open' : 'collapsed'}`}>
          <button
            type="button"
            className="curriculum-drawer-close"
            onClick={closeCurriculumDrawer}
            aria-label="Thu gon chuong trinh hoc"
          >
            <span>&times;</span>
          </button>
          <CurriculumSidebar
            courseId={courseId}
            activeLessonId={lesson.id}
            onSelectLesson={handleNavigateLesson}
            variant="drawer"
          />
        </aside>
      </div>

      <div className={`lesson-chat-fab ${chatOpen ? 'hide' : ''}`}>
        <button type="button" className="chat-fab-button" onClick={() => setChatOpen(true)}>
          <img
            src="https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-flat/512/Robot-Flat-icon.png"
            alt="Chat AI"
          />
        </button>
      </div>

      {chatOpen && (
        <div className="lesson-chat-panel">
          <div className="chat-panel-header">
            <div>
              <p className="chat-title">AI Tutor</p>
            </div>
            <button type="button" className="ghost close" onClick={() => setChatOpen(false)}>
              ✕
            </button>
          </div>
          <div className="chat-messages">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.role}`}>
                {msg.question && <p className="chat-question">{msg.question}</p>}
                {msg.answer && <p className="chat-answer">{msg.answer}</p>}
                {msg.sources?.length ? (
                  <ul className="chat-sources">
                    {msg.sources.map((s, i) => (
                      <li key={i}>
                        <strong>{s.title}</strong> - {s.excerpt}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
          <div className="chat-input-row">
            <input
              type="text"
              placeholder="Hoi ve bai hoc..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
            />
            <button type="button" className="chat-send" onClick={handleSendChat} disabled={chatLoading}>
              {chatLoading ? '...' : 'Gui'}
            </button>
          </div>
        </div>
      )}

      <ScrollTopButton />
    </div>
  )
}

export default StudentLesson
