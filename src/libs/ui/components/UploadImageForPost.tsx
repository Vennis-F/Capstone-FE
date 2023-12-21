import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import UploadIcon from '@mui/icons-material/Upload'
import { CircularProgress, Grid } from '@mui/material'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import RenderImage from 'material-ui-image'
import { ChangeEvent, useEffect, useState } from 'react'

import { getImage } from 'features/image/components/apis'
import { MainColor } from 'libs/const/color'
import { toastSuccess } from 'libs/utils/handle-toast'

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
  //   courseId: string
  onUploadToServer: (formData: FormData) => Promise<void>
  url?: string | null
}

const UploadImageForPost = ({ onUploadToServer, url }: Props) => {
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined)
  const [previewFile, setPreviewFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpload = async () => {
    if (previewFile) {
      setIsLoading(true)
      const formData = new FormData()
      formData.append('file', previewFile)
      try {
        await onUploadToServer(formData)
        setPreviewFile(null)
        toastSuccess({ message: 'Thay đổi ảnh thành công' })
      } catch (error) {
        console.error('Error uploading image', error)
      }
      setIsLoading(false)
    }
  }

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
          <VisuallyHiddenInput type="file" onChange={handleImageChange} />
        </Button>
        <Button
          component="label"
          variant="contained"
          onClick={handleUpload}
          startIcon={!isLoading ? <CloudUploadIcon /> : undefined}
          sx={{
            backgroundColor: MainColor.RED_500,
            ':hover': { backgroundColor: MainColor.RED_600 },
            marginLeft: '10px',
          }}
          disabled={isLoading || !previewFile}
        >
          {!isLoading ? 'Cập nhật' : <CircularProgress size="26px" />}
        </Button>
      </Grid>
    </Grid>
  )
}

export default UploadImageForPost
