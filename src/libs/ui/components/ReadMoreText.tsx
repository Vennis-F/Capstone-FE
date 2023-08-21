import Typography from '@mui/material/Typography'
import React, { useState } from 'react'

type ReadMoreTextProps = {
  text: string
  maxCharacterCount: number
}

const ReadMoreText = ({ text, maxCharacterCount }: ReadMoreTextProps) => {
  const [isTruncated, setIsTruncated] = useState(true)

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated)
  }

  const truncatedText = isTruncated ? text.slice(0, maxCharacterCount) : text

  return (
    <Typography variant="body1" sx={{ color: 'white' }}>
      {truncatedText}
      {text.length > maxCharacterCount && (
        <span onClick={toggleTruncate} style={{ cursor: 'pointer', color: '#D0A85C' }}>
          {isTruncated ? '... Read more' : ' Read less'}
        </span>
      )}
    </Typography>
  )
}

export default ReadMoreText
