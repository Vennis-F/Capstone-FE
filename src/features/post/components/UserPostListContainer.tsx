import { Box, Container, Grid, Pagination, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { MainColor } from 'libs/const/color'
import { OrderType } from 'types'

import { searchPosts } from '../apis'
import { PostFilterResponse } from '../types'

import PostCardView from './PostCardView'

const UserPostListContainer = () => {
  const [posts, setPosts] = useState<PostFilterResponse[]>([])
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)

  const fetchPosts = async () => {
    try {
      const { data, meta } = await searchPosts({
        pageOptions: { take: 9, page: 1, order: OrderType.DESC },
        sortCriterias: [],
        active: true,
      })
      setPosts(data)
      setPageCount(meta.pageCount)
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  console.log('[component=UserPostListContainer] posts length', posts.length, pageCount)

  return (
    <Container>
      <Typography variant="h4" fontWeight="bold" marginBottom="40px">
        Blog&nbsp;
        <Typography component="span" variant="inherit" color={MainColor.RED_500}>
          Vẽ cùng trẻ em
        </Typography>
      </Typography>
      <Grid container spacing={5}>
        {posts.map(post => (
          <PostCardView post={post} key={post.id} />
        ))}
      </Grid>
      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginY: '40px' }}>
          <Stack spacing={2}>
            <Pagination count={pageCount} page={page} onChange={handleChange} color="secondary" />
          </Stack>
        </Box>
      )}
    </Container>
  )
}

export default UserPostListContainer
