/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@mui/material'
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  GridSortModel,
  GridValueGetterParams,
} from '@mui/x-data-grid'
import RenderImage from 'material-ui-image'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { formatFullName } from 'libs/utils/handle-name'
import { formatCurrency } from 'libs/utils/handle-price'

import { TransactionOrderDetailResponse } from '../types'

interface Props {
  transactionOrderDetailsResponse: TransactionOrderDetailResponse[]
  // onApproveOrRejectInstructor: (InstructorId: string, status: InstructorStatus) => void
  // onEditRow: (id: string) => void
  // onPaymentInstructor: (instructorId: string) => void
}

const TableTransactionOrderDetailsInAdmin = ({
  transactionOrderDetailsResponse,
}: // onEditRow,
// onApproveOrRejectInstructor,
// onPaymentInstructor,
Props) => {
  const columns: GridColDef[] = [
    // {
    //   field: 'refundId',
    //   headerName: 'ID hoàn tiền',
    //   width: 70,
    //   sortable: false,
    //   filterable: false,
    // },
    {
      field: 'buyer',
      headerName: 'Tên người mua',
      width: 250,
    },
    {
      field: 'paymentAmount',
      headerName: 'Tiền thanh toán (80%)',
      width: 180,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.paymentAmount === 0 ? 0 : `${formatCurrency(params.row.paymentAmount)}VND`,
    },
    {
      field: 'systemPaymentAmount',
      headerName: 'Tiền hệ thống nhận (20%)',
      width: 200,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.paymentAmount === 0 ? 0 : `${formatCurrency(params.row.systemPaymentAmount)}VND`,
    },
    {
      field: 'refundAmount',
      headerName: 'Tiền hoàn trả (80%)',
      width: 180,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.refundAmount === 0 ? 0 : `${formatCurrency(params.row.refundAmount)}VND`,
    },
    {
      field: 'systemRefundAmount',
      headerName: 'Tiền hệ thống hoàn trả (20%)',
      width: 200,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.refundAmount === 0 ? 0 : `${formatCurrency(params.row.systemRefundAmount)}VND`,
    },
    {
      field: 'insertedDate',
      headerName: 'Ngày tạo',
      type: 'date',
      width: 130,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.insertedDate ? new Date(params.row.insertedDate) : null,
    },

    { field: 'courseName', headerName: 'Tên khóa học', width: 160 },
    {
      field: 'author',
      headerName: 'Tên tác giả',
      width: 180,
    },
  ]

  const totalPaymentAmount = transactionOrderDetailsResponse.reduce(
    (total, transaction) => total + transaction.paymentAmount,
    0,
  )

  const totalSystemPaymentAmount = transactionOrderDetailsResponse.reduce(
    (total, transaction) => total + transaction.systemPaymentAmount,
    0,
  )

  const totalRefundAmount = transactionOrderDetailsResponse.reduce(
    (total, transaction) => total + transaction.refundAmount,
    0,
  )

  const totalSystemRefundAmount = transactionOrderDetailsResponse.reduce(
    (total, transaction) => total + transaction.systemRefundAmount,
    0,
  )

  const totalCombinedAmount = totalPaymentAmount + totalRefundAmount

  const renderData = transactionOrderDetailsResponse.map(transaction => ({
    ...transaction,
    id: uuidv4(),
  }))

  const renderDataWithTotal = [
    ...renderData,
    {
      id: 'totalRow', // ID đặc biệt cho dòng tổng
      buyer: 'Tổng:', // Các giá trị khác bạn có thể thay đổi tùy thuộc vào cột
      paymentAmount: totalPaymentAmount, // Gán tổng paymentAmount vào cột
      systemPaymentAmount: totalSystemPaymentAmount, // Gán tổng paymentAmount vào cột
      refundAmount: totalRefundAmount, // Gán tổng refundAmount vào cột
      systemRefundAmount: totalSystemRefundAmount, // Gán tổng refundAmount vào cột
      insertedDate: null, // Ví dụ, null cho các cột không có dữ liệu ngày
      courseName: null,
      author: null,
      active: null,
    },
  ]

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={renderDataWithTotal}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 15]}
        density="comfortable"
      />
    </div>
  )
}

export default TableTransactionOrderDetailsInAdmin
