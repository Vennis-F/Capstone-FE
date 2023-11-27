/* eslint-disable @typescript-eslint/no-unused-vars */
import AddIcon from '@mui/icons-material/Add'
import { Box, Container, Paper } from '@mui/material'
import { useEffect, useState } from 'react'

import CustomButton from 'libs/ui/components/CustomButton'
import DialogBinaryQuestion from 'libs/ui/components/DialogBinaryQuestion'
import TitleTypography from 'libs/ui/components/TitleTypography'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastError, toastSuccess } from 'libs/utils/handle-toast'
import { UserRole } from 'types'

import { createStaffByAdmin, deleteStaffByAdmin, getStaffsByAdmin } from '../apis'
import { StaffFilterResponse } from '../types'

import CreateStaffDialogForm from './CreateStaffDialogForm'
import EditStaffDialogForm from './EditStaffDialogForm'
import TableStaffs from './TableStaffs'

const StaffManageContainer = () => {
  const [staffs, setStaffs] = useState<StaffFilterResponse[]>([])
  const [currentStaff, setCurrentStaff] = useState<StaffFilterResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [isLoadingCreate, setIsLoadingCreate] = useState(false)
  const [isOpenFormCreate, setIsOpenFormCreate] = useState(false)
  const [isOpenBan, setIsOpenBan] = useState(false)
  const [currBanStaffId, setCurrBanStaffId] = useState<string | null>(null)

  const fetchStaffs = async () => {
    try {
      const fetchedStaffs = await getStaffsByAdmin()
      setStaffs(fetchedStaffs)
    } catch (error) {
      console.error('Error fetching Staffs:', error)
    }
  }

  const handleBanStaff = async () => {
    try {
      await deleteStaffByAdmin(currBanStaffId as string)
      fetchStaffs()
    } catch (error) {
      toastError({ message: 'Không thể ban người quản lý này được' })
      console.log(error)
    }
    setCurrBanStaffId(null)
    setIsOpenBan(false)
  }

  useEffect(() => {
    fetchStaffs()
  }, [])

  return (
    <Container maxWidth="lg">
      <TitleTypography title="Danh sách người quản lý" />

      <Box width="100%" textAlign="right" marginBottom="20px">
        <CustomButton
          onClick={() => {
            setIsOpenFormCreate(true)
          }}
          sxCustom={{
            width: '180px',
            textTransform: 'capitalize',
            padding: '10px 0px',
          }}
        >
          <AddIcon /> Người quản lý mới
        </CustomButton>
      </Box>

      <Paper elevation={10}>
        <TableStaffs
          staffs={staffs}
          onEditRow={staffId => {
            const staff = staffs.find(currStaff => currStaff.id === staffId) as StaffFilterResponse
            setCurrentStaff(staff)
            setIsOpenForm(true)
          }}
          onBanStaff={staffId => {
            setIsOpenBan(true)
            setCurrBanStaffId(staffId)
          }}
        />
      </Paper>

      {currentStaff && (
        <EditStaffDialogForm
          defaultValues={currentStaff}
          // onSubmitClick={async data => {
          //   setIsLoading(true)
          //   try {
          //     await updateStaffByStaff({
          //       StaffId: currentStaff.id,
          //       active: data.active,
          //       description: data.description,
          //       resources: data.resources,
          //       title: data.title,
          //     })
          //     fetchStaffs()
          //     setCurrentStaff(null)
          //     setIsOpenForm(false)
          //     toastSuccess({ message: 'Cập nhật bài đăng thành công' })
          //   } catch (error) {
          //     showErrorResponseSaga({ defaultMessage: 'Không thể cập nhật bài đăng', error })
          //   }
          //   setIsLoading(false)
          // }}
          openDialog={isOpenForm}
          // isLoading={isLoading}
          handleOpenDialog={() => setIsOpenForm(true)}
          handleCloseDialog={() => setIsOpenForm(false)}
          avatar={currentStaff.avatar}
        />
      )}

      <CreateStaffDialogForm
        defaultValues={{
          firstName: '',
          lastName: '',
          middleName: '',
          userName: '',
          password: '',
          phoneNumber: '',
        }}
        onSubmitClick={async (data, reset) => {
          setIsLoadingCreate(true)
          try {
            await createStaffByAdmin({
              firstName: data.firstName,
              lastName: data.lastName,
              middleName: data.middleName,
              userName: data.userName,
              password: data.password,
              phoneNumber: data.phoneNumber,
              role: UserRole.STAFF,
            })
            reset()
            fetchStaffs()
            setIsOpenFormCreate(false)
            toastSuccess({ message: 'Tạo bài đăng mới thành công' })
          } catch (error) {
            showErrorResponseSaga({ defaultMessage: 'Không thể tạo người quản lý mới', error })
          }
          setIsLoadingCreate(false)
        }}
        openDialog={isOpenFormCreate}
        isLoading={isLoadingCreate}
        handleOpenDialog={() => setIsOpenFormCreate(true)}
        handleCloseDialog={() => {
          setIsOpenFormCreate(false)
          // setCurrentStaff(null)
        }}
      />

      <DialogBinaryQuestion
        titleText="Ban khỏi nền tảng"
        contentText="Bạn có chắc muốn ban người quản lý này khỏi nền tảng?"
        open={isOpenBan}
        clickAcceptAction={handleBanStaff}
        clickCloseModal={() => {
          setCurrBanStaffId(null)
          setIsOpenBan(false)
        }}
      />
    </Container>
  )
}

export default StaffManageContainer
