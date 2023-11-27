import { Container, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getListBanks, updateBankForInstructor } from 'features/instructor/api'
import { Bank } from 'features/instructor/types'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastSuccess } from 'libs/utils/handle-toast'

import InstructorUploadBankForm from './InstructorUploadBankForm'

type Props = {
  email: string
}

const InstructorUploadBankContainer = ({ email }: Props) => {
  const navigate = useNavigate()
  const [listBanks, setListBanks] = useState<Bank[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleGetListBanks = async () => {
    try {
      const response = await getListBanks()
      console.log(response)
      setListBanks(response.data)
    } catch (error) {
      console.error('[Cannot get list banks]', error)
    }
  }

  useEffect(() => {
    handleGetListBanks()
  }, [])

  //   const handleConfirmOTP = async () => {
  //     if (!code || !email) {
  //       toastError({ message: 'Mã OTP đang trống, vui lòng nhập mã OTP' })
  //     } else {
  //       try {
  //         await customerConfirm({ email: email, otp: code })
  //         if (isInstructor) navigate(`/instructor/signup/bank?email=${email}`)
  //         else navigate('/guest-login')
  //       } catch (error) {
  //         showErrorResponseSaga({ error, defaultMessage: 'OTP không hợp lệ' })
  //       }
  //     }
  //   }

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={10}
        sx={{
          margin: 'auto',
          textAlign: 'left',
          padding: '40px',
          borderRadius: '15px',
          width: '85%',
          fontFamily: 'sans-serif',
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
          Hãy nhập tài khoản ngân hàng của bạn
        </Typography>
        <Typography
          variant="caption"
          component={'div'}
          sx={{ fontFamily: 'sans-serif', marginBottom: '15px' }}
        >
          Nền tảng cần thông tin tài khoản ngân hàng để có thể chuyển khoản tiền học phí, doanh thu
          từ việc bán khóa học của bạn. Điều này sẽ giúp bạn nhận được thanh toán một cách thuận
          tiện và nhanh chóng.
        </Typography>

        <InstructorUploadBankForm
          defaultValues={{
            accountNumber: '',
            bank: '',
            accountHolderName: '',
          }}
          listBanks={listBanks}
          onSubmitClick={async data => {
            setIsLoading(true)
            try {
              console.log(data)
              await updateBankForInstructor(email, {
                accountNumber: data.accountNumber,
                bank: data.bank,
                accountHolderName: data.accountHolderName,
              })
              toastSuccess({ message: 'Đăng tải ngân hàng thành công' })
              navigate(`/instructor/signup/certificate?email=${email}`)
            } catch (error) {
              showErrorResponseSaga({
                error,
                defaultMessage: 'Đăng tải ngân hàng không thành công hãy kiểm tra lại thông tin',
              })
            }
            setIsLoading(false)
          }}
          isLoading={isLoading}
        />
      </Paper>
    </Container>
  )
}

export default InstructorUploadBankContainer
