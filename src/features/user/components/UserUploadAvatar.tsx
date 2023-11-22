import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Avatar } from '@mui/material'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import { ChangeEvent } from 'react'

import { getImage } from 'features/image/components/apis'
import { toastSuccess } from 'libs/utils/handle-toast'

import { uploadAvatarUser } from '../apis'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

interface Props {
  avatar?: string
  otherAction?: () => void
}

const UserUploadAvatar = ({ avatar, otherAction }: Props) => {
  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const formData = new FormData()
      formData.append('file', file)

      try {
        await uploadAvatarUser(formData)
        if (otherAction) otherAction()
        toastSuccess({ message: 'Thay đổi ảnh đại diện thành công' })
      } catch (error) {
        console.error('Error uploading avatar', error)
      }
    }
  }

  return (
    <>
      <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
        Upload file
        <VisuallyHiddenInput type="file" onChange={handleImageChange} />
      </Button>
      {avatar && <Avatar alt="Avatar" src={getImage(avatar)} sx={{ width: 100, height: 100 }} />}
    </>
  )
}

export default UserUploadAvatar
