import UploadIcon from '@mui/icons-material/Upload'
import { Grid } from '@mui/material'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import RenderImage from 'material-ui-image'
import { ChangeEvent, useEffect, useState } from 'react'

import { getImage } from 'features/image/components/apis'

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
  onChangeFile: (file: File) => void
  url?: string | null
}

const UploadImageControl = ({ url, onChangeFile }: Props) => {
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined)
  const [previewFile, setPreviewFile] = useState<File | null>(null)

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = async e => {
        if (e.target?.result) {
          const img = new Image()
          img.src = e.target.result as string

          img.onload = () => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            const maxWidth = 750
            const maxHeight = 422

            let { width, height } = img

            if (width > maxWidth || height > maxHeight) {
              const scaleFactor = Math.min(maxWidth / width, maxHeight / height)
              width *= scaleFactor
              height *= scaleFactor
            }

            canvas.width = width
            canvas.height = height

            ctx?.drawImage(img, 0, 0, width, height)

            // Convert canvas to Blob with specific file type (.jpg, .jpeg, .gif, .png)
            canvas.toBlob(
              blob => {
                if (blob) {
                  const croppedFile = new File([blob], file.name, {
                    type: 'image/jpeg', // Change to the required file type
                    lastModified: Date.now(),
                  })
                  const fileUrl = URL.createObjectURL(croppedFile) // Tạo URL từ file đã chọn
                  setPreviewImage(fileUrl)
                  setPreviewFile(croppedFile)
                  onChangeFile(croppedFile)
                }
              },
              'image/jpeg',
              0.9,
            )
          }
        }
      }

      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    if (url) setPreviewImage(getImage(url))
  }, [url])

  console.log(previewFile)

  return (
    <Grid container alignItems="flex-end">
      <Grid item marginRight="20px">
        <RenderImage
          src={previewImage || 'https://s.udemycdn.com/course/750x422/placeholder.jpg'}
          alt="Preview"
          style={{ height: '148px', width: '244px', padding: 0 }}
          imageStyle={{ height: '148px', width: '244px' }}
        />
      </Grid>
      <Grid item>
        <Button component="label" variant="contained" startIcon={<UploadIcon />}>
          Tải file lên
          <VisuallyHiddenInput
            type="file"
            onChange={handleImageChange}
            accept="image/png, image/jpeg, image/gif, image/jpg"
          />
        </Button>
      </Grid>
    </Grid>
  )
}

export default UploadImageControl
