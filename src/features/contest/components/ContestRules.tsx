/* eslint-disable  @typescript-eslint/indent */
import AddIcon from '@mui/icons-material/Add'
import StarIcon from '@mui/icons-material/Star'
import {
  Box,
  Container,
  Paper,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
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
      <Box
        width="100%"
        textAlign="right"
        marginY="20px"
        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
      >
        <Box sx={{ marginTop: '-20px', textAlign: 'left' }}>
          {contest.status === ContestStatus.ACTIVE && <TimeLeft contest={contest} />}
          {(contest.status === ContestStatus.EXPIRED ||
            contest.status === ContestStatus.PENDING) && (
            <Typography
              border="3px solid #c084fc"
              width="240px"
              fontWeight="bold"
              color="#c084fc"
              textAlign="center"
              padding="10px 14px"
              marginTop="20px"
              marginLeft="20px"
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

      <Container maxWidth="lg" style={{ padding: '20px', borderRadius: '10px' }}>
        <Typography style={{ fontWeight: 'bold', marginBottom: '20px', fontSize: 30 }}>
          THỂ LỆ CUỘC THI
        </Typography>
        <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#e56b87' }}>
          <Grid container spacing={5}>
            <Grid item xs={4}>
              <Image
                src={getImage(contest.thumbnailUrl)}
                style={{ height: '200px', width: '270px', padding: 0, marginLeft: 30 }}
                imageStyle={{ height: '200px', width: '270px', borderRadius: 3 }}
              />
            </Grid>
            <Grid item xs={8} style={{ marginLeft: '-20px', color: '#fff' }}>
              <List
              // sx={{
              //   backgroundColor: '#ff8c94',
              //   color: '#fff',
              //   borderRadius: '10px',
              //   padding: '16px',
              // }}
              >
                <ListItem disablePadding>
                  <ListItemIcon>
                    <StarIcon style={{ color: '#FFf' }} />
                  </ListItemIcon>
                  <ListItemText primary="Để tham gia cuộc thi, bạn chỉ cần đăng ký tài khoản và đăng nhập trên trang web vecungtreem.online" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <StarIcon style={{ color: '#FFf' }} />
                  </ListItemIcon>
                  <ListItemText primary="Vẽ theo đề tài mà cuộc thi đã đưa ra để được tính là tác phẩm hợp lệ" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <StarIcon style={{ color: '#FFf' }} />
                  </ListItemIcon>
                  <ListItemText primary="Không được sử dụng tác phẩm của người khác để tham gia cuộc thi." />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <StarIcon style={{ color: '#FFf' }} />
                  </ListItemIcon>
                  <ListItemText primary="Mỗi người tham gia cuộc thi chỉ có thể nộp một tác phẩm duy nhất." />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <StarIcon style={{ color: '#FFf' }} />
                  </ListItemIcon>
                  <ListItemText primary="Để xác nhận tác phẩm của mình là hợp lệ, mỗi người tham gia cũng cần tham gia vào quá trình bình chọn." />
                </ListItem>
              </List>
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
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <StarIcon style={{ color: '#FFf' }} />
              </ListItemIcon>
              <ListItemText primary="Mỗi người tham gia cuộc thi chỉ có thể gửi một bài dự thi duy nhất." />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <StarIcon style={{ color: '#FFf' }} />
              </ListItemIcon>
              <ListItemText
                primary="Các nhân viên hệ thống sẽ kiểm tra và xác nhận bài dự thi để đảm bảo tính hợp lệ và tuân thủ thể lệ cuộc
            thi."
              />
            </ListItem>
          </List>
        </Paper>
        <Typography style={{ fontWeight: 'bold', marginBottom: 20, marginTop: 40, fontSize: 30 }}>
          THỂ LỆ BÌNH CHỌN
        </Typography>
        <Paper elevation={3} style={{ padding: 20, backgroundColor: '#f08080', color: '#fff' }}>
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <StarIcon style={{ color: '#FFf' }} />
              </ListItemIcon>
              <ListItemText primary="Chỉ những người tham gia cuộc thi mới có quyền bình chọn cho bài thi mình ưa thích." />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <StarIcon style={{ color: '#FFf' }} />
              </ListItemIcon>
              <ListItemText primary="Mỗi người được bốn lượt bình chọn và không được phép bình chọn cho chính bài thi của mình." />
            </ListItem>
          </List>
        </Paper>
        <Typography style={{ fontWeight: 'bold', marginBottom: 20, marginTop: 40, fontSize: 30 }}>
          THỜI GIAN CUỘC THI
        </Typography>
        <Paper elevation={3} style={{ padding: 20, backgroundColor: '#9370db', color: '#fff' }}>
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <StarIcon style={{ color: '#FFf' }} />
              </ListItemIcon>
              <ListItemText
                primary={`Bắt đầu: ${getStringMinuteHourDayMonthYear(contest.startedDate)}`}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <StarIcon style={{ color: '#FFf' }} />
              </ListItemIcon>
              <ListItemText
                primary={`Kết thúc: ${getStringMinuteHourDayMonthYear(contest.expiredDate)}`}
              />
            </ListItem>
          </List>
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
