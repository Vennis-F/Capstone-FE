import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'

export type Props = {
  openDialog: boolean
  handleCloseDialog: () => void
}

const RequirementCurriculumnDialog = (props: Props) => {
  const { openDialog, handleCloseDialog } = props

  const requirements = [
    'Chương trình giảng dạy đóng vai trò quan trọng trong việc thu hút học viên và xây dựng uy tín cho bạn trên nền tảng này.',
    'Chúng tôi khuyến khích bạn xây dựng một chương trình với ít nhất 6 bài giảng.',
    'Trong khoảng từ 6 đến 10 bài, học viên được xem trước 1 bài giảng để có cái nhìn sơ bộ về nội dung.',
    'Nếu chương trình có hơn 10 bài giảng, chỉ tối đa 2 bài được xem trước.',
    'Mỗi bài giảng cần phải có video định dạng MP4 để nội dung trở nên sinh động hơn.',
    'Video sẽ giúp học viên tiếp cận thông tin một cách sinh động và dễ hiểu, tăng cường trải nghiệm học tập và giữ chân họ trong quá trình học.',
  ]

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth={true}>
      <DialogTitle sx={{ fontWeight: '600', fontSize: '20px' }}>
        Lưu ý khi tạo các bài giảng
      </DialogTitle>
      <Divider />
      <DialogContent>
        <List dense={true}>
          {requirements.map((requirement, index) => (
            <ListItem key={requirement}>
              <ListItemText
                primary={
                  <Typography fontWeight="bold" fontSize="20px">
                    {index + 1}. <Typography component="span">{requirement}</Typography>
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={handleCloseDialog} variant="outlined">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default RequirementCurriculumnDialog
