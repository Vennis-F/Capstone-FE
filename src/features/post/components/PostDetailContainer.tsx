import GrainIcon from '@mui/icons-material/Grain'
import HomeIcon from '@mui/icons-material/Home'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import { Breadcrumbs, Container, Link, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { MainColor } from 'libs/const/color'
import TitleTypography from 'libs/ui/components/TitleTypography'
import BackdropCustom from 'libs/ui/custom-components/BackdropCustom'
import { getStringDayMonthYear } from 'libs/utils/handle-date'
import { renderHTML } from 'libs/utils/handle-html-data'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'

import { getPostById } from '../apis'
import { PostFilterResponse } from '../types'

type Props = {
  postId: string
}

const PostDetailContainer = ({ postId }: Props) => {
  const [post, setPost] = useState<PostFilterResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const handleGetPostDetail = async () => {
    try {
      const postRes = await getPostById(postId)
      setPost(postRes)
    } catch (error) {
      showErrorResponseSaga({ error, defaultMessage: 'Không tìm thấy blog' })
    }
    setLoading(false)
  }

  useEffect(() => {
    handleGetPostDetail()
  }, [postId])

  console.log('[postDetailContainer]', post)

  return (
    <Container maxWidth="md" sx={{ fontFamily: 'sans-serif' }}>
      <BackdropCustom open={loading} />
      {post && (
        <>
          <Breadcrumbs sx={{ marginBottom: '10px' }}>
            <Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center', color: MainColor.YELLOW_500 }}
              color="inherit"
              href="/"
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Trang chủ
            </Link>
            <Link
              underline="hover"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: MainColor.YELLOW_500,
                cursor: 'pointer',
              }}
              color="inherit"
              onClick={() => navigate('/blog')}
            >
              <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              {'Blog'}
            </Link>
            <Typography
              sx={{ display: 'flex', alignItems: 'center', color: '#9c7d21' }}
              color="text.primary"
            >
              <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              {post.title}
            </Typography>
          </Breadcrumbs>
          <TitleTypography title={post.title} />
          <Typography fontSize="12px">
            Bởi&nbsp;
            <Typography
              variant="inherit"
              component="span"
              color="#1D4D79"
            >{`${post.user.lastName} ${post.user.middleName} ${post.user.firstName} - `}</Typography>
            <Typography
              variant="inherit"
              component="span"
              color="GrayText"
            >{` ${getStringDayMonthYear(post.updatedDate)}`}</Typography>
          </Typography>
          {renderHTML(post.resources)}
        </>
      )}
    </Container>
  )
}

export default PostDetailContainer
