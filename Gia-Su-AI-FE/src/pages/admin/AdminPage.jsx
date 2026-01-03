import React from 'react'
import { Outlet } from 'react-router-dom'

/**
 * Component AdminPage - Layout cho khu vực quản trị
 */
const AdminPage = () => {
  return (
    <div className="admin-page">
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminPage
