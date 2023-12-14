import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  TextField,
} from '@mui/material'
import React, { useState } from 'react'

type Props = {
  star: number
  description: string
  open: boolean
  isLoading: boolean
  onClose: () => void
  onAccept: (star: number, description: string) => void
}

const UpdateFeedbackCourseDialog = (props: Props) => {
  const [description, setDescription] = useState(props.description)
  const [star, setStar] = useState<number>(props.star)

  const handleSubmit = () => {
    props.onAccept(star, description)
  }

  const handleClose = () => {
    setDescription(props.description)
    setStar(props.star)
    props.onClose()
  }

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ textAlign: 'center' }}
    >
      <DialogTitle id="alert-dialog-title">{'Cập nhật đánh giá của bạn'}</DialogTitle>
      <DialogContent>
        <Rating
          name="size-large"
          value={star}
          onChange={(event, newValue) => {
            setStar(newValue as number)
          }}
          size="large"
        />
        <TextField
          fullWidth
          size="medium"
          value={description}
          onChange={e => setDescription(e.target.value)}
          multiline
          placeholder="Hãy cho chúng tôi biết trải nghiệm cá nhân của riêng bạn khi tham gia khóa học này. Khóa học có phù hợp với bạn không?"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Không</Button>
        <Button disabled={props.isLoading} onClick={handleSubmit}>
          Cập nhật
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UpdateFeedbackCourseDialog
