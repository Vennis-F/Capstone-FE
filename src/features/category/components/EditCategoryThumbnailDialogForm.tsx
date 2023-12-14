import { Box, Button, CircularProgress, Dialog, DialogTitle, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import { useState } from 'react'

import { MainColor } from 'libs/const/color'
import UploadImageControl from 'libs/ui/components/UploadImageControl'

import { Category } from '../types'

export type Props = {
  openDialog: boolean
  handleCloseDialog: () => void
  isLoading: boolean
  category: Category
  onSubmitClick(file: File): void
}

const EditCategoryThumbnailDialogForm = (props: Props) => {
  const { openDialog, handleCloseDialog, isLoading, category, onSubmitClick } = props
  const [previewFile, setPreviewFile] = useState<File | null>(null)

  const submitHandler = () => {
    if (previewFile) onSubmitClick(previewFile)
  }

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth={true}>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: '600', fontSize: '30px' }}>
        Đổi ảnh thể loại
      </DialogTitle>
      <Stack sx={{ padding: '20px' }} direction="column" spacing={1} justifyContent="center">
        <Box sx={{ height: '60px', marginBottom: '40px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Hình ảnh
          </Typography>
          <UploadImageControl
            url={category.thumbnailUrl}
            onChangeFile={file => {
              setPreviewFile(file)
            }}
          />
        </Box>
        <Box sx={{ height: '120px' }} />

        <Button
          onClick={() => submitHandler()}
          variant={'contained'}
          size="large"
          sx={{
            width: '140px',
            backgroundColor: MainColor.RED_500,
            fontWeight: '600',
            '&:hover': {
              backgroundColor: MainColor.RED_600,
            },
          }}
          disabled={isLoading}
        >
          {!isLoading ? 'Đổi ảnh' : <CircularProgress size="26px" />}
        </Button>
      </Stack>
    </Dialog>
  )
}

export default EditCategoryThumbnailDialogForm
