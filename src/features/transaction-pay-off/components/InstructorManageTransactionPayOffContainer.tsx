/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/indent */
import AddIcon from '@mui/icons-material/Add'
import {
  Box,
  Container,
  Dialog,
  Paper,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'

import TitleTypography from 'libs/ui/components/TitleTypography'
import { calcTotalPaymentAmount, formatCurrency } from 'libs/utils/handle-price'
import { toastError } from 'libs/utils/handle-toast'

import {
  getTransactionOrderDetailByTransacionPayOffByInstructor,
  getTransactionPayOffsByInstructor,
} from '../api'
import { TransactionOrderDetailResponse, TransactionPayOffResponse } from '../types'

import TableTransactionOrderDetailsInInstructor from './TableTransactionOrderDetailsInInstructor'
import TableTransactionPayOffsInstructor from './TableTransactionPayOffsInstructor'

const InstructorManageTransactionPayOffContainer = () => {
  const [transactionPayOffs, setTransactionPayOffs] = useState<TransactionPayOffResponse[]>([])
  const [currentTransactionPayoff, setCurrentTransactionPayoff] =
    useState<TransactionPayOffResponse | null>(null)
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [currentTransactionOrderDetails, setCurrentTransactionOrderDetails] = useState<
    TransactionOrderDetailResponse[] | null
  >(null)

  const fetchTransactionPayoffs = async () => {
    try {
      const fetchedTransactionPayoffs = await getTransactionPayOffsByInstructor()
      setTransactionPayOffs(fetchedTransactionPayoffs)
    } catch (error) {
      console.error('Error fetching TransactionPayoffs:', error)
    }
  }

  const fetchTransactionOrderDetail = async (transactionPayOffId: string) => {
    try {
      const fetchedTransactionOrderDetails =
        await getTransactionOrderDetailByTransacionPayOffByInstructor(transactionPayOffId)
      setCurrentTransactionOrderDetails(fetchedTransactionOrderDetails)
    } catch (error) {
      console.error('Error fetching TransactionPayoffs:', error)
    }
    return null
  }

  useEffect(() => {
    fetchTransactionPayoffs()
  }, [])

  return (
    <Container maxWidth="md">
      <TitleTypography title="Danh sách thanh toán" />

      <Paper elevation={10}>
        <TableTransactionPayOffsInstructor
          transactionPayOffsResponse={transactionPayOffs}
          onEditRow={async currId => {
            const transactionPayoff = transactionPayOffs.find(
              transactionPayOff => transactionPayOff.id === currId,
            ) as TransactionPayOffResponse
            await fetchTransactionOrderDetail(currId)
            setCurrentTransactionPayoff(transactionPayoff)
            setIsOpenForm(true)
          }}
        />
      </Paper>

      {currentTransactionOrderDetails && (
        <Dialog
          open={isOpenForm}
          onClose={() => {
            setIsOpenForm(false)
            setCurrentTransactionOrderDetails(null)
            setCurrentTransactionPayoff(null)
          }}
          fullWidth={true}
          maxWidth="lg"
        >
          {/* <DialogTitle>Bản chi tiết giao dịch thanh toán  </DialogTitlte> */}
          <DialogContent>
            <TableTransactionOrderDetailsInInstructor
              transactionOrderDetailsResponse={currentTransactionOrderDetails}
            />
            <Grid container sx={{ marginTop: '20px' }} alignItems="center">
              <Grid item marginLeft="auto">
                <Typography fontWeight="bold" color="GrayText">
                  Tổng tiền thanh toán:
                  <Typography
                    fontWeight="bold"
                    fontSize="26px"
                    component="span"
                    color="black"
                    marginLeft="20px"
                  >
                    {formatCurrency(calcTotalPaymentAmount(currentTransactionOrderDetails))}VND
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      )}
    </Container>
  )
}

export default InstructorManageTransactionPayOffContainer
