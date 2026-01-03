import React, { useEffect, useState } from 'react'
import './ScrollTopButton.css'

const ScrollTopButton = ({ className = '' }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', toggleVisibility)
    toggleVisibility()

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      className={`scroll-top-button ${visible ? 'scroll-top-button--visible' : ''} ${className}`}
      onClick={handleClick}
      aria-label="Lên đầu trang"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 15l7-7 7 7"></path>
      </svg>
    </button>
  )
}

export default ScrollTopButton
