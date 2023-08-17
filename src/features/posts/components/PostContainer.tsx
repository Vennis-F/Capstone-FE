import AddIcon from '@mui/icons-material/Add'
import { Fab } from '@mui/material'
import Container from '@mui/material/Container'
import React, { useEffect } from 'react'

import { PostForm } from 'features/posts/components/PostForm'
import { PostList } from 'features/posts/components/PostList'
import { usePostService } from 'features/posts/hooks/usePostService'

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
}

export const PostContainer = () => {
  const { posts, deletePost, updatePost, fetchAllPosts, createPost } = usePostService()

  useEffect(() => {
    fetchAllPosts()
  }, [fetchAllPosts])
  return (
    <>
      <Container maxWidth="xs">
        <PostForm onSubmitClick={createPost} />
      </Container>
      <Fab sx={fabStyle} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      <Container sx={{ py: 4 }} maxWidth="md">
        <PostList posts={posts} onDeletePost={deletePost} onUpdatePost={updatePost} />
      </Container>
    </>
  )
}
