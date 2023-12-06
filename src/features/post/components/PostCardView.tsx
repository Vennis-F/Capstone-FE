import { Box, Grid, Paper, Typography } from '@mui/material'
import RenderImage from 'material-ui-image'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getImage } from 'features/image/components/apis'
import { MainColor } from 'libs/const/color'
import { getStringDayMonthYear } from 'libs/utils/handle-date'

import { PostFilterResponse } from '../types'

type Props = {
  post: PostFilterResponse
}

const PostCardView = ({ post }: Props) => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Grid item xs={4}>
      <Paper
        elevation={isHovered ? 10 : 5}
        onClick={() => navigate(`/blog/detail/${post.id}`)}
        sx={{ cursor: 'pointer' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <RenderImage
          src={
            post.thumbnail
              ? getImage(post.thumbnail)
              : 'https://s.udemycdn.com/course/750x422/placeholder.jpg'
          }
          alt="Preview"
          style={{ height: '320px', width: '100%', padding: 0 }}
          imageStyle={{ height: '320px', width: '100%' }}
        />
        <Box height="120px" padding="10px">
          <Typography
            color={MainColor.RED_600}
            fontWeight="bold"
            fontSize="18px"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontFamily: 'sans-serif',
              marginBottom: '10px',
            }}
          >
            {post.title}
          </Typography>
          <Typography fontSize="12px" marginBottom="10px">
            <Typography
              variant="inherit"
              component="span"
              color="GrayText"
            >{` ${getStringDayMonthYear(post.updatedDate)}`}</Typography>
          </Typography>
          <Typography
            sx={{
              color: '#848484',
              fontSize: '13px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              lineHeight: '20px',
              maxHeight: 40,
            }}
          >
            {post.description}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  )
}

export default PostCardView
