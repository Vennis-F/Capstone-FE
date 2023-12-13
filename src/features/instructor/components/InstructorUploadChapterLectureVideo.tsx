import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import UploadIcon from '@mui/icons-material/Upload'
import { Button, Typography, Box, LinearProgress, CircularProgress } from '@mui/material'
import { AxiosRequestConfig } from 'axios'
import React, { useState, ChangeEvent, useEffect } from 'react'

import { uploadChapterLectureVideo } from 'features/chapter-lecture/api'
import { ChapterLecture } from 'features/chapter-lecture/types'
import { MainColor } from 'libs/const/color'
import { toastError, toastSuccess } from 'libs/utils/handle-toast'

interface Props {
  chapterLecture: ChapterLecture
  handleCloseEditVideo: () => void
  showButtonReturn: boolean
}

const InstructorUploadChapterLectureVideo = ({
  showButtonReturn,
  chapterLecture,
  handleCloseEditVideo,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(`Ê t đang đổi ở bài giảng số ${chapterLecture.index}`)
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0])
    }
  }

  const handleUpload = async () => {
    setIsLoading(true)
    if (selectedFile) {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const config: AxiosRequestConfig = {
        onUploadProgress: progressEvent => {
          const progress = (progressEvent.loaded / progressEvent.total) * 100
          setUploadProgress(progress)
        },
      }

      try {
        await uploadChapterLectureVideo(chapterLecture.id, formData, config)
        toastSuccess({ message: 'Thêm video khóa học thành công' })
        handleCloseEditVideo()
      } catch (error) {
        console.error('Error uploading video', error)
      }
    } else {
      toastError({ message: 'Không file nào được chọn' })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    console.log('clear')
    return () => {
      setIsLoading(false)
      setSelectedFile(null)
      setUploadProgress(0)
    }
  }, [])

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      <Typography fontWeight="bold" color="GrayText">
        Chọn video bài giảng
      </Typography>
      <input
        accept="video/mp4"
        style={{ display: 'none' }}
        id={`upload-video-${chapterLecture.id}`}
        type="file"
        onChange={handleFileChange}
      />
      {selectedFile && (
        <Box mt={2}>
          <Typography variant="body1">Chọn: {selectedFile.name}</Typography>
        </Box>
      )}
      <Box mt={3} width="100%">
        <LinearProgress variant="determinate" value={uploadProgress} />
      </Box>
      <Box mt={2}>
        <label htmlFor={`upload-video-${chapterLecture.id}`}>
          <Button
            disabled={isLoading}
            variant="contained"
            color="primary"
            component="span"
            startIcon={<UploadIcon />}
          >
            Chọn video
          </Button>
        </label>
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
          disabled={isLoading || !selectedFile}
        >
          {!isLoading ? 'Cập nhật' : <CircularProgress size="26px" />}
        </Button>
      </Box>
      {showButtonReturn && (
        <Button disabled={isLoading} onClick={handleCloseEditVideo}>
          Trở về
        </Button>
      )}
    </Box>
  )
}

export default InstructorUploadChapterLectureVideo
