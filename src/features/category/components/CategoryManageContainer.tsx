import AddIcon from '@mui/icons-material/Add'
import { Box, Container } from '@mui/material'
import { useEffect, useState } from 'react'

import LayoutBodyContainer from 'components/Layout/LayoutBodyContainer'
import CustomButton from 'libs/ui/components/CustomButton'
import DialogBinaryQuestion from 'libs/ui/components/DialogBinaryQuestion'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastSuccess } from 'libs/utils/handle-toast'

import {
  createCategoryByAdmin,
  deleteCategoryByAdmin,
  getCategoriesByAdmin,
  updateCategoryThumbnailByAdmin,
} from '../api'
import { Category } from '../types'

import CreateCategoryDialogForm from './CreateCategoryDialogForm'
import EditCategoryThumbnailDialogForm from './EditCategoryThumbnailDialogForm'
import TableCategories from './TableCategories'

const CategoryManageContainer = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [currentCateId, setCurrentCateId] = useState<string | null>(null)
  const [openDelete, setIsOpenDelete] = useState(false)
  const [isLoadingCreate, setIsLoadingCreate] = useState(false)
  const [isOpenFormCreate, setIsOpenFormCreate] = useState(false)
  const [currCateEditThumbnail, setCurrCateEditThumbnail] = useState<Category | null>(null)
  const [isLoadingEdit, setIsLoadingEdit] = useState(false)

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
      <LayoutBodyContainer title="Thể loại" isPadding={true}>
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
        <TableCategories
          categories={categories}
          onDeleteCategory={id => {
            setIsOpenDelete(true)
            setCurrentCateId(id)
          }}
          onEdit={category => setCurrCateEditThumbnail(category)}
        />
      </LayoutBodyContainer>

      {currentCateId && (
        <DialogBinaryQuestion
          titleText="Xóa thể loại"
          contentText="Bạn có chắc muốn xóa thể loại này không?"
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
        onSubmitClick={async (data, file, reset) => {
          setIsLoadingCreate(true)
          try {
            const category = await createCategoryByAdmin({
              name: data.name,
            })

            const formData = new FormData()
            formData.append('file', file)
            await updateCategoryThumbnailByAdmin(category.id, formData)

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

      {currCateEditThumbnail && (
        <EditCategoryThumbnailDialogForm
          category={currCateEditThumbnail}
          handleCloseDialog={() => {
            setIsLoadingEdit(false)
            setCurrCateEditThumbnail(null)
          }}
          isLoading={isLoadingEdit}
          onSubmitClick={async file => {
            setIsLoadingEdit(true)
            console.log(currCateEditThumbnail)
            try {
              const formData = new FormData()
              formData.append('file', file)
              await updateCategoryThumbnailByAdmin(currCateEditThumbnail.id, formData)

              fetchCategories()
              setCurrCateEditThumbnail(null)
              toastSuccess({ message: 'Cập nhật ảnh thành công' })
            } catch (error) {
              showErrorResponseSaga({ defaultMessage: 'Không thể cập nhật thể loại', error })
            }
            setIsLoadingEdit(false)
          }}
          openDialog={Boolean(currCateEditThumbnail)}
        />
      )}
    </Container>
  )
}

export default CategoryManageContainer
