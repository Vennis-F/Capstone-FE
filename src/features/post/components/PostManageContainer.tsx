/* eslint-disable @typescript-eslint/no-unused-vars */
import AddIcon from '@mui/icons-material/Add'
import { Box, Container, Paper } from '@mui/material'
import { useEffect, useState } from 'react'

import LayoutBodyContainer from 'components/Layout/LayoutBodyContainer'
import CustomButton from 'libs/ui/components/CustomButton'
import DialogBinaryQuestion from 'libs/ui/components/DialogBinaryQuestion'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastSuccess } from 'libs/utils/handle-toast'
import { OrderType } from 'types'

import { createPostByStaff, deletePostByStaff, searchPosts, updatePostByStaff } from '../apis'
import { PostFilterResponse } from '../types'

import CreatePostDialogForm from './CreatePostDialogForm'
import EditPostDialogForm from './EditPostDialogForm'
import TablePosts from './TablePosts'

const PostManageContainer = () => {
  const [posts, setPosts] = useState<PostFilterResponse[]>([])
  const [currentPost, setCurrentPost] = useState<PostFilterResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [isLoadingCreate, setIsLoadingCreate] = useState(false)
  const [isOpenFormCreate, setIsOpenFormCreate] = useState(false)
  const [currentPostDelete, setCurrPostDelete] = useState<PostFilterResponse | null>(null)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await searchPosts({
        pageOptions: { take: 100000000000000000, page: 1, order: OrderType.DESC },
        sortCriterias: [],
      })
      setPosts(fetchedPosts.data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  console.log(currentPost)

  return (
    <Container maxWidth="lg">
      <LayoutBodyContainer title="Bài đăng" isPadding>
        <Box width="100%" textAlign="right" marginBottom="20px">
          <CustomButton
            onClick={() => {
              setIsOpenFormCreate(true)
            }}
            sxCustom={{
              width: '140px',
              textTransform: 'capitalize',
              padding: '10px 0px',
            }}
          >
            <AddIcon /> Bài đăng mới
          </CustomButton>
        </Box>

        <TablePosts
          posts={posts}
          onEditRow={postId => {
            const post = posts.find(currPost => currPost.id === postId) as PostFilterResponse
            setCurrentPost(post)
            setIsOpenForm(true)
          }}
          onDeleteRow={postId => {
            const post = posts.find(currPost => currPost.id === postId) as PostFilterResponse
            setCurrPostDelete(post)
          }}
        />
      </LayoutBodyContainer>

      {currentPost && (
        <EditPostDialogForm
          defaultValues={{
            title: currentPost.title,
            active: currentPost.active,
            description: currentPost.description,
            resources: currentPost.resources,
          }}
          otherValues={{
            url: currentPost.thumbnail,
            postId: currentPost.id,
          }}
          onSubmitClick={async data => {
            setIsLoading(true)
            try {
              await updatePostByStaff({
                postId: currentPost.id,
                active: data.active,
                description: data.description,
                resources: data.resources,
                title: data.title,
              })
              fetchPosts()
              setCurrentPost(null)
              setIsOpenForm(false)
              toastSuccess({ message: 'Cập nhật bài đăng thành công' })
            } catch (error) {
              showErrorResponseSaga({ defaultMessage: 'Không thể cập nhật bài đăng', error })
            }
            setIsLoading(false)
          }}
          openDialog={isOpenForm}
          isLoading={isLoading}
          handleOpenDialog={() => setIsOpenForm(true)}
          handleCloseDialog={() => setIsOpenForm(false)}
        />
      )}

      {currentPostDelete && (
        <DialogBinaryQuestion
          open={Boolean(currentPostDelete)}
          isLoading={isLoadingDelete}
          titleText="Xóa bài đăng"
          contentText="Bạn có chắc muốn xóa bài đăng này không?"
          clickAcceptAction={async () => {
            setIsLoadingDelete(true)
            try {
              await deletePostByStaff(currentPostDelete.id)
              toastSuccess({ message: 'Xóa bài đăng thành công' })
              fetchPosts()
            } catch (error) {
              showErrorResponseSaga({ defaultMessage: 'Xóa bài đăng không thành công', error })
            }
            setCurrPostDelete(null)
            setIsLoadingDelete(false)
          }}
          clickCloseModal={() => {
            setIsLoadingDelete(false)
            setCurrPostDelete(null)
          }}
        />
      )}

      <CreatePostDialogForm
        defaultValues={{
          title: '',
          description: '',
          resources: '',
        }}
        onSubmitClick={async (data, reset) => {
          setIsLoadingCreate(true)
          try {
            await createPostByStaff({
              title: data.title,
              description: data.description,
              resources: data.resources,
            })
            reset()
            fetchPosts()
            setIsOpenFormCreate(false)
            toastSuccess({ message: 'Tạo bài đăng mới thành công' })
          } catch (error) {
            showErrorResponseSaga({ defaultMessage: 'Không thể tạo bài đăng mới', error })
          }
          setIsLoadingCreate(false)
        }}
        openDialog={isOpenFormCreate}
        isLoading={isLoadingCreate}
        handleOpenDialog={() => setIsOpenFormCreate(true)}
        handleCloseDialog={() => {
          setIsOpenFormCreate(false)
          setCurrentPost(null)
        }}
      />
    </Container>
  )
}

export default PostManageContainer
