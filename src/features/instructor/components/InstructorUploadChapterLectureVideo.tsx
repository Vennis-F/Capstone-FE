import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Button, Container, Typography, Box, LinearProgress } from '@mui/material'
import React, { useState, ChangeEvent } from 'react'

import { uploadChapterLectureVideo } from 'features/chapter-lecture/api'
import { ChapterLecture } from 'features/chapter-lecture/types'
import { toastSuccess } from 'libs/utils/handle-toast'

interface Props {
  chapterLecture: ChapterLecture
}

const InstructorUploadChapterLectureVideo = ({ chapterLecture }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (selectedFile) {
      const interval = setInterval(() => {
        setUploadProgress(prevProgress => {
          if (prevProgress === 100) {
            clearInterval(interval)
            return 100
          }
          const diff = Math.random() * 10
          return Math.min(prevProgress + diff, 100)
        })
      }, 500)

      const formData = new FormData()
      formData.append('file', selectedFile)
      try {
        await uploadChapterLectureVideo(chapterLecture.id, formData)
        toastSuccess({ message: 'Thêm video khóa học thành công' })
      } catch (error) {
        console.error('Error uploading avatar', error)
      }
    } else {
      console.log('No file selected')
    }
  }

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <input
          accept="video/*"
          style={{ display: 'none' }}
          id="upload-video"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="upload-video">
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Select Video
          </Button>
        </label>
        {selectedFile && (
          <Box mt={2}>
            <Typography variant="body1">Selected: {selectedFile.name}</Typography>
          </Box>
        )}
        <Box mt={3} width="100%">
          <LinearProgress variant="determinate" value={uploadProgress} />
        </Box>
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleUpload}>
            Upload
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default InstructorUploadChapterLectureVideo
