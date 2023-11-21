import AddIcon from '@mui/icons-material/Add'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Slide,
  Typography,
} from '@mui/material'
import Container from '@mui/material/Container'
import { TransitionProps } from '@mui/material/transitions'
import React, { useEffect } from 'react'

import TitleTypography from 'libs/ui/components/TitleTypography'

import { useCharacterService } from '../hooks/useCharacterService'

import { CharacterForm } from './CharacterForm'
import { CharacterList } from './CharacterList'

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
}
/* eslint-disable prefer-arrow-callback */
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export const CharacterContainer = () => {
  const { characters, fetchAllCharacters, createCharacter } = useCharacterService()
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  useEffect(() => {
    fetchAllCharacters()
  }, [fetchAllCharacters])
  return (
    <>
      <Container>
        <Typography component="h6" variant="h6" align="center" color="text.primary" gutterBottom>
          CHỌN NGAY MỘT
        </Typography>
        <TitleTypography title="TƯỚNG" />
        <Container maxWidth="sm">
          <Typography
            component="summary"
            variant="body1"
            align="center"
            color="text.primary"
            gutterBottom
            maxWidth="sm"
          >
            Với hơn 140 tướng, bạn chắc chắn sẽ tìm thấy một lựa chọn phù hợp với lối chơi của mình.
            Chọn một tướng tủ hoặc sử dụng điêu luyện tất cả.
          </Typography>
        </Container>
      </Container>
      <Container sx={{ py: 4 }} maxWidth="lg">
        <CharacterList characters={characters} />
      </Container>
      <Fab sx={fabStyle} color="primary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>{'Thêm một em vào bể tướng nào'}</DialogTitle>
        <DialogContent>
          <CharacterForm
            onSubmitClick={(data, reset) => {
              console.log('[data form] ', data)
              createCharacter(data)
              reset()
              handleClose()
            }}
            // defaultValues={}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
