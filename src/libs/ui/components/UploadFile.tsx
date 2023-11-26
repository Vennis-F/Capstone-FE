import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import UploadIcon from '@mui/icons-material/Upload'
import { Button, Typography, Box, CircularProgress } from '@mui/material'
import React, { useState, ChangeEvent } from 'react'

import { MainColor } from 'libs/const/color'

interface Props {
  onUploadFile: (file: File | null) => void
  file?: File
  isLoading: boolean
}

const UploadFile = ({ onUploadFile, isLoading }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0])
    }
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      <input
        accept="application/pdf"
        style={{ display: 'none' }}
        id={`upload-file`}
        type="file"
        onChange={handleFileChange}
      />
      {selectedFile && (
        <Box mt={2}>
          <Typography variant="body1">Chọn: {selectedFile.name}</Typography>
        </Box>
      )}
      <Box mt={2}>
        <label htmlFor={`upload-file`}>
          <Button variant="contained" color="primary" component="span" startIcon={<UploadIcon />}>
            Chọn file
          </Button>
        </label>
        <Button
          component="label"
          variant="contained"
          onClick={() => onUploadFile(selectedFile)}
          startIcon={!isLoading ? <CloudUploadIcon /> : undefined}
          sx={{
            backgroundColor: MainColor.RED_500,
            ':hover': { backgroundColor: MainColor.RED_600 },
            marginLeft: '10px',
          }}
          disabled={isLoading || !selectedFile}
        >
          {!isLoading ? 'Đăng tải' : <CircularProgress size="26px" />}
        </Button>
      </Box>
    </Box>
  )
}

export default UploadFile
