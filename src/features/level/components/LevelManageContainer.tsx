import AddIcon from '@mui/icons-material/Add'
import { Box, Container } from '@mui/material'
import { useEffect, useState } from 'react'

import LayoutBodyContainer from 'components/Layout/LayoutBodyContainer'
import CustomButton from 'libs/ui/components/CustomButton'
import DialogBinaryQuestion from 'libs/ui/components/DialogBinaryQuestion'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastSuccess } from 'libs/utils/handle-toast'

import { createLevelByAdmin, deleteLevelByAdmin, getLevelsByAdmin } from '../api'
import { Level } from '../types'

import CreateLevelDialogForm from './CreateLevelDialogForm'
import TableLevels from './TableLevels'

const LevelManageContainer = () => {
  const [levels, setLevels] = useState<Level[]>([])
  const [currentLevelId, setCurrentLevelId] = useState<string | null>(null)
  const [openDelete, setIsOpenDelete] = useState(false)
  const [isLoadingCreate, setIsLoadingCreate] = useState(false)
  const [isOpenFormCreate, setIsOpenFormCreate] = useState(false)

  const fetchLevels = async () => {
    try {
      const data = await getLevelsByAdmin()
      setLevels(data)
    } catch (error) {
      console.error('Error fetching levels:', error)
    }
  }

  useEffect(() => {
    fetchLevels()
  }, [])

  return (
    <Container maxWidth="lg">
      <LayoutBodyContainer title="Cấp độ" isPadding={true}>
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
            <AddIcon /> Cấp độ mới
          </CustomButton>
        </Box>
        <TableLevels
          levels={levels}
          onDeleteLevel={id => {
            setIsOpenDelete(true)
            setCurrentLevelId(id)
          }}
        />
      </LayoutBodyContainer>
      {currentLevelId && (
        <DialogBinaryQuestion
          titleText="Bạn có chắc muốn xóa cấp độ này không"
          contentText="Xóa nhé"
          open={openDelete}
          clickAcceptAction={async () => {
            try {
              await deleteLevelByAdmin(currentLevelId)
              toastSuccess({ message: 'Xóa cấp độ thành công' })
              fetchLevels()
            } catch (error) {
              showErrorResponseSaga({ error, defaultMessage: 'Xóa cấp độ không thành công' })
            }
            setCurrentLevelId(null)
            setIsOpenDelete(false)
          }}
          clickCloseModal={() => {
            setIsOpenDelete(false)
            setCurrentLevelId(null)
          }}
        />
      )}
      <CreateLevelDialogForm
        defaultValues={{
          name: '',
        }}
        onSubmitClick={async (data, reset) => {
          setIsLoadingCreate(true)
          try {
            await createLevelByAdmin({
              name: data.name,
            })
            reset()
            fetchLevels()
            setIsOpenFormCreate(false)
            toastSuccess({ message: 'Tạo cấp độ mới thành công' })
          } catch (error) {
            showErrorResponseSaga({ defaultMessage: 'Không thể tạo cấp độ mới', error })
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

export default LevelManageContainer
