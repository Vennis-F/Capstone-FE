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

import { getCustomersByAdmin } from '../apis'
import { UserFilterResponse } from '../types'

import TableCustomers from './TableCustomers'

const CustomerManageContainer = () => {
  const [customers, setCustomers] = useState<UserFilterResponse[]>([])
  // const [currentCustomer, setCurrentCustomer] = useState<UserFilterResponse | null>(null)
  // const [isLoading, setIsLoading] = useState(false)
  // const [isOpenForm, setIsOpenForm] = useState(false)

  const fetchCustomers = async () => {
    try {
      const fetchedCustomers = await getCustomersByAdmin()
      setCustomers(fetchedCustomers)
    } catch (error) {
      console.error('Error fetching Customers:', error)
    }
  }

  // const handleBanCustomer = async () => {
  //   try {
  //     await deleteCustomerByAdmin(currBanCustomerId as string)
  //     fetchCustomers()
  //   } catch (error) {
  //     toastError({ message: 'Không thể ban người quản lý này được' })
  //     console.log(error)
  //   }
  //   setCurrBanCustomerId(null)
  //   setIsOpenBan(false)
  // }

  useEffect(() => {
    fetchCustomers()
  }, [])

  return (
    <Container maxWidth="lg">
      <TitleTypography title="Danh sách khách hàng" />

      {/* <Box width="100%" textAlign="right" marginBottom="20px">
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
      </Box> */}

      <Paper elevation={10}>
        <TableCustomers
          customers={customers}
          // onEditRow={CustomerId => {
          //   const Customer = Customers.find(
          //     currCustomer => currCustomer.id === CustomerId,
          //   ) as CustomerFilterResponse
          //   setCurrentCustomer(Customer)
          //   setIsOpenForm(true)
          // }}
          // onBanCustomer={CustomerId => {
          //   setIsOpenBan(true)
          //   setCurrBanCustomerId(CustomerId)
          // }}
        />
      </Paper>

      {/* {currentCustomer && (
        <EditCustomerDialogForm
          defaultValues={currentCustomer}
          openDialog={isOpenForm}
          // isLoading={isLoading}
          handleOpenDialog={() => setIsOpenForm(true)}
          handleCloseDialog={() => setIsOpenForm(false)}
          avatar={currentCustomer.avatar}
        />
      )} */}

      {/* <CreateCustomerDialogForm
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
            await createCustomerByAdmin({
              firstName: data.firstName,
              lastName: data.lastName,
              middleName: data.middleName,
              userName: data.userName,
              password: data.password,
              phoneNumber: data.phoneNumber,
              role: UserRole.Customer,
            })
            reset()
            fetchCustomers()
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
          // setCurrentCustomer(null)
        }}
      />

      <DialogBinaryQuestion
        titleText="Ban khỏi nền tảng"
        contentText="Bạn có chắc muốn ban người quản lý này khỏi nền tảng?"
        open={isOpenBan}
        clickAcceptAction={handleBanCustomer}
        clickCloseModal={() => {
          setCurrBanCustomerId(null)
          setIsOpenBan(false)
        }}
      /> */}
    </Container>
  )
}

export default CustomerManageContainer
