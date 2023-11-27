import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  CircularProgress,
  //   Button,
} from '@mui/material'

type Props = {
  open: boolean
  clickCloseModal: () => void
  clickAcceptAction: () => void
  titleText: string
  contentText: string
  isLoading?: boolean
}

const DialogBinaryQuestion = ({
  titleText,
  contentText,
  open,
  isLoading,
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
      <Button
        onClick={clickCloseModal}
        disabled={isLoading !== undefined && isLoading}
        sx={{ color: '#19A7CE', fontWeight: '600' }}
      >
        Không
      </Button>
      {isLoading === undefined ? (
        <Button onClick={clickAcceptAction} autoFocus sx={{ color: '#19A7CE', fontWeight: '600' }}>
          Có
        </Button>
      ) : (
        <Button
          onClick={clickAcceptAction}
          disabled={isLoading}
          autoFocus
          sx={{ color: '#19A7CE', fontWeight: '600' }}
        >
          {!isLoading ? 'Có' : <CircularProgress size="26px" />}
        </Button>
      )}
    </DialogActions>
  </Dialog>
)

export default DialogBinaryQuestion
