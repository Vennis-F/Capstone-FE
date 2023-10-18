import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  //   Button,
} from '@mui/material'

type Props = {
  open: boolean
  clickCloseModal: () => void
  clickAcceptAction: () => void
  titleText: string
  contentText: string
}

const DialogBinaryQuestion = ({
  titleText,
  contentText,
  open,
  clickCloseModal,
  clickAcceptAction,
}: Props) => (
  <Dialog
    open={open}
    onClose={clickCloseModal}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{titleText}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">{contentText}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={clickCloseModal} sx={{ color: '#19A7CE', fontWeight: '600' }}>
        Không
      </Button>
      <Button onClick={clickAcceptAction} autoFocus sx={{ color: '#19A7CE', fontWeight: '600' }}>
        Có
      </Button>
    </DialogActions>
  </Dialog>
)

export default DialogBinaryQuestion
