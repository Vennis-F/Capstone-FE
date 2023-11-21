import { Tooltip } from '@mui/material'
import Typography from '@mui/material/Typography'
import { SxProps } from '@mui/system'
import React, { useState } from 'react'

type ReadMoreTextProps = {
  text: string
  maxCharacterCount: number
  isTruncatedText?: boolean
  sxCustom?: SxProps
}

const ReadMoreText = ({
  sxCustom,
  text,
  maxCharacterCount,
  isTruncatedText = false,
}: ReadMoreTextProps) => {
  const [isTruncated, setIsTruncated] = useState(true)

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated)
  }

  const truncatedText = isTruncated ? text.slice(0, maxCharacterCount) : text

  return isTruncatedText ? (
    <Tooltip title={text} placement="top">
      <Typography variant="body1" sx={{ color: 'black', ...sxCustom }}>
        {truncatedText}
        {text.length > maxCharacterCount && (
          <span style={{ color: 'black' }}>
            {isTruncated ? `${isTruncatedText ? '...' : ''}` : ' Rút gọn'}
          </span>
        )}
      </Typography>
    </Tooltip>
  ) : (
    <Typography variant="body1" sx={{ color: 'black', ...sxCustom }}>
      {truncatedText}
      {text.length > maxCharacterCount && (
        <span onClick={toggleTruncate} style={{ cursor: 'pointer', color: '#146C94' }}>
          {isTruncated ? '... Đọc thêm' : ' Rút gọn'}
        </span>
      )}
    </Typography>
  )
}

export default ReadMoreText
