/* eslint-disable @typescript-eslint/no-unused-vars */
import AddIcon from '@mui/icons-material/Add'
import { Box, Container, Paper } from '@mui/material'
import { useEffect, useState } from 'react'

import CustomButton from 'libs/ui/components/CustomButton'
import TitleTypography from 'libs/ui/components/TitleTypography'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastSuccess } from 'libs/utils/handle-toast'
import { OrderType, PageOptions } from 'types'

import { getTransactionPayOffsByInstructor } from '../api'
import { TransactionPayOffResponse } from '../types'

import TableTransactionPayOffsInstructor from './TableTransactionPayOffsInstructor'

const InstructorManageTransactionPayOffContainer = () => {
  const [transactionPayOffs, setTransactionPayOffs] = useState<TransactionPayOffResponse[]>([])
  const [currentTransactionPayoff, setCurrentTransactionPayoff] =
    useState<TransactionPayOffResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [isLoadingCreate, setIsLoadingCreate] = useState(false)
  const [isOpenFormCreate, setIsOpenFormCreate] = useState(false)

  const fetchTransactionPayoffs = async () => {
    try {
      const fetchedTransactionPayoffs = await getTransactionPayOffsByInstructor()
      setTransactionPayOffs(fetchedTransactionPayoffs)
    } catch (error) {
      console.error('Error fetching TransactionPayoffs:', error)
    }
  }

  useEffect(() => {
    fetchTransactionPayoffs()
  }, [])

  return (
    <Container maxWidth="lg">
      <TitleTypography title="Danh sách thanh toán" />

      <Paper elevation={10}>
        <TableTransactionPayOffsInstructor
          transactionPayOffsResponse={transactionPayOffs}
          onEditRow={currId => {
            const transactionPayoff = transactionPayOffs.find(
              transactionPayOff => transactionPayOff.id === currId,
            ) as TransactionPayOffResponse
            setCurrentTransactionPayoff(transactionPayoff)
            setIsOpenForm(true)
          }}
        />
      </Paper>
      {/* 
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
      )} */}
    </Container>
  )
}

export default InstructorManageTransactionPayOffContainer
