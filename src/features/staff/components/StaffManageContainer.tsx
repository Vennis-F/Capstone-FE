/* eslint-disable @typescript-eslint/no-unused-vars */
import AddIcon from '@mui/icons-material/Add'
import { Box, Container, Paper } from '@mui/material'
import { useEffect, useState } from 'react'

import LayoutBodyContainer from 'components/Layout/LayoutBodyContainer'
import CustomButton from 'libs/ui/components/CustomButton'
import DialogBinaryQuestion from 'libs/ui/components/DialogBinaryQuestion'
import TitleTypography from 'libs/ui/components/TitleTypography'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastError, toastSuccess } from 'libs/utils/handle-toast'
import { UserRole } from 'types'

import {
  createStaffByAdmin,
  deleteStaffByAdmin,
  getStaffsByAdmin,
  reActiveStaffByAdmin,
} from '../apis'
import { StaffFilterResponse } from '../types'

import CreateStaffDialogForm from './CreateStaffDialogForm'
import EditStaffDialogForm from './EditStaffDialogForm'
import TableStaffs from './TableStaffs'

const StaffManageContainer = () => {
  const [staffs, setStaffs] = useState<StaffFilterResponse[]>([])
  const [currentStaff, setCurrentStaff] = useState<StaffFilterResponse | null>(null)
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [isLoadingCreate, setIsLoadingCreate] = useState(false)
  const [isOpenFormCreate, setIsOpenFormCreate] = useState(false)
  const [isOpenBan, setIsOpenBan] = useState(false)
  const [currBanStaffId, setCurrBanStaffId] = useState<string | null>(null)
  const [currReActiveStaffId, setCurrReActiveStaffId] = useState<string | null>(null)
  const [isLoadingReActive, setIsLoadingReActive] = useState(false)

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
      toastSuccess({ message: 'Xóa nhân viên thành công' })
    } catch (error) {
      toastError({ message: 'Không thể xóa nhân viên này được' })
      console.log(error)
    }
    setCurrBanStaffId(null)
    setIsOpenBan(false)
  }

  const handleReActiveStaff = async () => {
    setIsLoadingReActive(true)
    try {
      await reActiveStaffByAdmin(currReActiveStaffId as string)
      fetchStaffs()
      toastSuccess({ message: 'Kích hoạt nhân viên thành công' })
    } catch (error) {
      toastError({ message: 'Không thể kích hoạt nhân viên được' })
      console.log(error)
    }
    setIsLoadingReActive(false)
    setCurrReActiveStaffId(null)
  }

  useEffect(() => {
    fetchStaffs()
  }, [])

  return (
    <Container maxWidth="lg">
      <LayoutBodyContainer title="Danh sách nhân viên" isPadding>
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
            <AddIcon /> Nhân viên mới
          </CustomButton>
        </Box>

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
          onReactiveStaff={staffId => {
            setCurrReActiveStaffId(staffId)
          }}
        />
      </LayoutBodyContainer>

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
            showErrorResponseSaga({ defaultMessage: 'Không thể tạo nhân viên mới', error })
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
        titleText="Xóa khỏi nền tảng"
        contentText="Bạn có chắc muốn xóa nhân viên này khỏi nền tảng?"
        open={isOpenBan}
        clickAcceptAction={handleBanStaff}
        clickCloseModal={() => {
          setCurrBanStaffId(null)
          setIsOpenBan(false)
        }}
      />

      {currReActiveStaffId && (
        <DialogBinaryQuestion
          titleText="Kích hoạt nhân viên"
          contentText="Bạn có chắc muốn kích hoạt lại nhân viên này?"
          open={Boolean(currReActiveStaffId)}
          clickAcceptAction={handleReActiveStaff}
          clickCloseModal={() => {
            setCurrReActiveStaffId(null)
          }}
          isLoading={isLoadingReActive}
        />
      )}
    </Container>
  )
}

export default StaffManageContainer
