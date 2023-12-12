/* eslint-disable  @typescript-eslint/indent */
import AddIcon from '@mui/icons-material/Add'
import { Box, Container, Paper, Grid, Typography } from '@mui/material'
import Image from 'material-ui-image'
import { useEffect, useState } from 'react'

import {
  checkCustomerDrawingSubmitted,
  createCustomerDrawing,
  updateCustomerDrawingImage,
} from 'features/customer-drawing/api'
import CreateCustomerDrawingDialogForm from 'features/customer-drawing/components/CreateCustomerDrawingDialogForm'
import { getImage } from 'features/image/components/apis'
import CustomButton from 'libs/ui/components/CustomButton'
import { getStringMinuteHourDayMonthYear } from 'libs/utils/handle-date'
import { renderHTML } from 'libs/utils/handle-html-data'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastSuccess, toastWarn } from 'libs/utils/handle-toast'
import { getAccessToken, getUserRole } from 'libs/utils/handle-token'
import { UserRole } from 'types'

import { Contest, ContestStatus } from '../types'

import TimeLeft from './TimeLeft'

type Props = {
  contest: Contest
}
const ContestRules = ({ contest }: Props) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)

  const handleJoinContest = async () => {
    const userRole = getUserRole()
    if (!userRole) return toastWarn({ message: 'Hãy đăng nhập trước khi tham gia cuộc thi' })

    setOpen(true)
    return null
  }

  const handleCustomerDrawingSubmit = async () => {
    const isSubmitRes = await checkCustomerDrawingSubmitted(contest.id)
    setIsSubmit(isSubmitRes)
  }

  useEffect(() => {
    if (getAccessToken() && getUserRole() === UserRole.CUSTOMER) handleCustomerDrawingSubmit()
  }, [])
  return (
    <>
      <Box width="100%" textAlign="right" marginY="20px" sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <Box sx={{ marginTop: "-20px", textAlign: "left" }}>
          {contest.status === ContestStatus.ACTIVE && <TimeLeft contest={contest} />}
          {(contest.status === ContestStatus.EXPIRED || contest.status === ContestStatus.PENDING) && (
            <Typography
              border="1px solid #c084fc"
              width="240px"
              fontWeight="bold"
              color="#c084fc"
              textAlign="center"
              padding="10px 14px"
            >
              {contest.status === ContestStatus.PENDING
                ? 'CUỘC THI CHƯA DIỄN RA'
                : 'CUỘC THI ĐÃ KẾT THÚC'}
            </Typography>
          )}
        </Box>
        <Box>
          {contest.status === ContestStatus.ACTIVE &&
            getAccessToken() &&
            getUserRole() === UserRole.CUSTOMER && (
              <CustomButton
                onClick={handleJoinContest}
                sxCustom={{ width: '220px' }}
                disable={isSubmit}
              >
                {!isSubmit ? (
                  <>
                    <AddIcon /> Tham gia cuộc thi
                  </>
                ) : (
                  'Bạn đã đăng tải bài thi'
                )}
              </CustomButton>
            )}
        </Box>
      </Box>
      <Container
        maxWidth="lg"
        style={{ backgroundColor: '#F3F3F3', padding: '20px', borderRadius: '10px' }}
      >
        <Typography style={{ fontWeight: 'bold', marginBottom: '20px', fontSize: 30 }}>
          THỂ LỆ CUỘC THI
        </Typography>
        <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#e56b87' }}>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <Image
                src={getImage(contest.thumbnailUrl)}
                style={{ height: '200px', width: '270px', padding: 0, marginLeft: 30 }}
                imageStyle={{ height: '200px', width: '270px', borderRadius: 3 }}
              />
            </Grid>
            <Grid item xs={6} style={{ marginLeft: '-20px', color: '#fff' }}>
              <Typography>
                1. Bạn chỉ cần có tài khoản và đăng nhập vào trang web vecungtreem.online là có thể
                tham gia cuộc thi.
              </Typography>
              <Typography>2. Vẽ đúng đề tài mà cuộc thi đã cho.</Typography>
              <Typography>
                3. Không sử dụng tác phẩm của người khác để tham gia cuộc thi.
              </Typography>
              <Typography>
                4. Mỗi người tham gia cuộc thi chỉ có thế nộp 1 tác phẩm dự thi.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Typography style={{ fontWeight: 'bold', marginBottom: 20, marginTop: 40, fontSize: 30 }}>
          MIÊU TẢ
        </Typography>
        <Paper elevation={3} style={{ padding: 20, backgroundColor: '#ff8c94', color: '#fff' }}>
          {renderHTML(contest.description)}
        </Paper>
        <Typography style={{ fontWeight: 'bold', marginBottom: 20, marginTop: 40, fontSize: 30 }}>
          THỂ LỆ NỘP BÀI
        </Typography>
        <Paper elevation={3} style={{ padding: 20, backgroundColor: '#ff8c94', color: '#fff' }}>
          <Typography>
            Mỗi người tham gia có thể gửi 1 bài dự thi, và sẽ đợi hội đồng xét duyệt bài thi đó.
          </Typography>
        </Paper>
        <Typography style={{ fontWeight: 'bold', marginBottom: 20, marginTop: 40, fontSize: 30 }}>
          THỂ LỆ BÌNH CHỌN
        </Typography>
        <Paper elevation={3} style={{ padding: 20, backgroundColor: '#f08080', color: '#fff' }}>
          <Typography>
            1.Bạn phải tham gia cuộc thi thì mới được bình chọn bài mình thích.
          </Typography>
          <Typography>
            2.Mỗi người chỉ có một lượt bình chọn và không được bình chọn cho chính bài thi của
            mình.
          </Typography>
        </Paper>
        <Typography style={{ fontWeight: 'bold', marginBottom: 20, marginTop: 40, fontSize: 30 }}>
          THỜI GIAN CUỘC THI
        </Typography>
        <Paper elevation={3} style={{ padding: 20, backgroundColor: '#9370db', color: '#fff' }}>
          <Grid container spacing={0} style={{ marginBottom: 10 }}>
            <Grid item xs={3}>
              <Typography>Bắt đầu cuộc thi :</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography style={{ marginLeft: -50 }}>
                {getStringMinuteHourDayMonthYear(contest.startedDate)}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={0} style={{ marginBottom: 10 }}>
            <Grid item xs={3}>
              <Typography>Kết thúc cuộc thi :</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography style={{ marginLeft: -50 }}>
                {getStringMinuteHourDayMonthYear(contest.expiredDate)}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Typography style={{ fontWeight: 'bold', marginBottom: 20, marginTop: 40, fontSize: 30 }}>
          GIẢI THƯỞNG
        </Typography>
        <Paper elevation={3} style={{ padding: 20, backgroundColor: '#9370db', color: '#fff' }}>
          {renderHTML(contest.prize)}
        </Paper>
      </Container>

      <CreateCustomerDrawingDialogForm
        defaultValues={{
          description: '',
          title: '',
        }}
        handleCloseDialog={() => setOpen(false)}
        isLoading={loading}
        onSubmitClick={async (data, file, reset) => {
          setLoading(true)
          try {
            const customerDrawing = await createCustomerDrawing(contest.id, {
              title: data.title,
              description: data.description,
            })

            const formData = new FormData()
            formData.append('file', file)
            await updateCustomerDrawingImage(customerDrawing.id, formData)

            toastSuccess({ message: 'Bạn đã tạo bài thi thành công!!!' })
            handleCustomerDrawingSubmit()
            setOpen(false)
            reset()
          } catch (error) {
            showErrorResponseSaga({ defaultMessage: 'Đăng tải bài vẽ không thành công', error })
          }
          setLoading(false)
        }}
        openDialog={open}
      // otherValues={}
      />
    </>
  )
}
export default ContestRules
