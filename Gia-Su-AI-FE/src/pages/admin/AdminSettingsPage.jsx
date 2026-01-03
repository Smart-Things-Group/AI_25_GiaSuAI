import React from 'react'
import Card, { CardHeader, CardBody } from '@components/ui/Card'
import Button from '@components/ui/Button'

const AdminSettingsPage = () => {
  return (
    <div className="admin-grid">
      <Card>
        <CardHeader>
          <h3>Cài đặt hệ thống</h3>
        </CardHeader>
        <CardBody>
          <p>Điều chỉnh cấu hình chung, ngôn ngữ và thương hiệu.</p>
          <Button>Cập nhật</Button>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3>Bảo mật</h3>
        </CardHeader>
        <CardBody>
          <p>Chính sách mật khẩu, xác thực hai lớp và nhật ký truy cập.</p>
          <Button>Thiết lập bảo mật</Button>
        </CardBody>
      </Card>
    </div>
  )
}

export default AdminSettingsPage
