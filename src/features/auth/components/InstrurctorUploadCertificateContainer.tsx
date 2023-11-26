import { Container, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { uploadCertifcateForInstructor } from 'features/instructor/api'
import UploadFile from 'libs/ui/components/UploadFile'
import { toastError, toastSuccess } from 'libs/utils/handle-toast'

type Props = {
  email: string
}

const InstrurctorUploadCertificateContainer = ({ email }: Props) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={5}
        sx={{
          padding: '30px',
        }}
      >
        <Typography fontWeight="bold" color="GrayText" variant="h5" fontFamily="sans-serif">
          Chọn bằng cấp mà bạn muốn upload
        </Typography>
        <UploadFile
          onUploadFile={async file => {
            if (!file) return toastError({ message: 'Không file nào được chọn' })
            setIsLoading(true)

            try {
              const formData = new FormData()
              formData.append('file', file)

              const { status } = await uploadCertifcateForInstructor(email, formData)

              if (!status) throw new Error()
              toastSuccess({
                message: 'Đăng tải khóa bằng cấp thành công, bạn hãy check email và chờ xét duyệt',
              })
              navigate('/guest-login')
            } catch (error) {
              console.log('[component=InstrurctorUploadCertificateContainer]', error)

              toastError({
                message: 'Không đăng tải bằng cấp được, bạn vui lòng thử lại',
              })
            }
            return setIsLoading(false)
          }}
          isLoading={isLoading}
        />
      </Paper>
    </Container>
  )
}

export default InstrurctorUploadCertificateContainer
