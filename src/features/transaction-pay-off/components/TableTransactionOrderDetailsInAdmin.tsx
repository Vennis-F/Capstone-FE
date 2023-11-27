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
      headerName: 'Tiền thanh toán',
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.paymentAmount === 0 ? 0 : `${formatCurrency(params.row.paymentAmount)}VND`,
    },
    {
      field: 'refundAmount',
      headerName: 'Tiền hoàn trả',
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.refundAmount === 0 ? 0 : `${formatCurrency(params.row.refundAmount)}VND`,
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
      width: 130,
    },
    {
      field: 'active',
      headerName: 'Hoạt động',
      type: 'boolean',
      width: 130,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.active !== null ? params.row.active : null,
    },
  ]

  const totalPaymentAmount = transactionOrderDetailsResponse.reduce(
    (total, transaction) => total + transaction.paymentAmount,
    0,
  )

  const totalRefundAmount = transactionOrderDetailsResponse.reduce(
    (total, transaction) => total + transaction.refundAmount,
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
      refundAmount: totalRefundAmount, // Gán tổng refundAmount vào cột
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
        // checkboxSelection
        // sortModel={[
        //   {
        //     field: 'age',
        //     sort: 'asc', // Default sorting order for the 'age' column
        //   },
        // ]}
        // onSortModelChange={model => handleSortModelChange(model)}
        // onPaginationModelChange={model => handelPaginationModelChange(model)}
        // onFilterModelChange={model => console.log(model)}
        density="comfortable"
      />
    </div>
  )
}

export default TableTransactionOrderDetailsInAdmin
