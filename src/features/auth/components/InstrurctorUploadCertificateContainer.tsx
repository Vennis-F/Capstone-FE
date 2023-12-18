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
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            marginBottom: '10px',
            fontFamily: 'sans-serif',
            textAlign: 'center',
          }}
        >
          Chọn bằng cấp mà bạn muốn đăng tải
        </Typography>
        <Typography
          variant="caption"
          component={'div'}
          sx={{ fontFamily: 'sans-serif', marginBottom: '15px' }}
        >
          Để chúng tôi có thể đánh giá được năng lực của bạn, thông tin về bằng cấp là cần thiết.
          Thông tin này sẽ giúp chúng tôi hiểu rõ hơn về khả năng và kiến thức của bạn. Vui lòng tải
          lên bằng cấp của bạn dưới định dạng file PDF để hoàn tất quá trình đánh giá năng lực.
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
                message: 'Đăng tải khóa bằng cấp thành công',
              })
              navigate('/instructor/signup/success')
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
