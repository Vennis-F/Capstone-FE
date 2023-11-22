import AddIcon from '@mui/icons-material/Add'
import { Box, Container, Paper } from '@mui/material'
import { useEffect, useState } from 'react'

import CustomButton from 'libs/ui/components/CustomButton'
import DialogBinaryQuestion from 'libs/ui/components/DialogBinaryQuestion'
import TitleTypography from 'libs/ui/components/TitleTypography'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastSuccess } from 'libs/utils/handle-toast'

import { createCategoryByAdmin, deleteCategoryByAdmin, getCategoriesByAdmin } from '../api'
import { Category } from '../types'

import CreateCategoryDialogForm from './CreateCategoryDialogForm'
import TableCategories from './TableCategories'

const CategoryManageContainer = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [currentCateId, setCurrentCateId] = useState<string | null>(null)
  const [openDelete, setIsOpenDelete] = useState(false)
  const [isLoadingCreate, setIsLoadingCreate] = useState(false)
  const [isOpenFormCreate, setIsOpenFormCreate] = useState(false)

  const fetchCategories = async () => {
    try {
      const data = await getCategoriesByAdmin()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <Container maxWidth="lg">
      <TitleTypography title="Thể loại" />
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
          <AddIcon /> Thể loại mới
        </CustomButton>
      </Box>
      <Paper elevation={10}>
        <TableCategories
          categories={categories}
          onDeleteCategory={id => {
            setIsOpenDelete(true)
            setCurrentCateId(id)
          }}
        />
      </Paper>
      {currentCateId && (
        <DialogBinaryQuestion
          titleText="Bạn có chắc muốn xóa thể loại này không"
          contentText="Xóa nhé"
          open={openDelete}
          clickAcceptAction={async () => {
            try {
              await deleteCategoryByAdmin(currentCateId)
              toastSuccess({ message: 'Xóa thể loại thành công' })
              fetchCategories()
            } catch (error) {
              showErrorResponseSaga({ error, defaultMessage: 'Xóa thể loại không thành công' })
            }
            setCurrentCateId(null)
            setIsOpenDelete(false)
          }}
          clickCloseModal={() => {
            setIsOpenDelete(false)
            setCurrentCateId(null)
          }}
        />
      )}
      <CreateCategoryDialogForm
        defaultValues={{
          name: '',
        }}
        onSubmitClick={async (data, reset) => {
          setIsLoadingCreate(true)
          try {
            await createCategoryByAdmin({
              name: data.name,
            })
            reset()
            fetchCategories()
            setIsOpenFormCreate(false)
            toastSuccess({ message: 'Tạo thể loại mới thành công' })
          } catch (error) {
            showErrorResponseSaga({ defaultMessage: 'Không thể tạo thể loại mới', error })
          }
          setIsLoadingCreate(false)
        }}
        openDialog={isOpenFormCreate}
        isLoading={isLoadingCreate}
        handleOpenDialog={() => setIsOpenFormCreate(true)}
        handleCloseDialog={() => setIsOpenFormCreate(false)}
      />
    </Container>
  )
}

export default CategoryManageContainer
