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

import { TransactionPayOffResponse } from '../types'

interface Props {
  transactionPayOffsResponse: TransactionPayOffResponse[]
  onEditRow: (id: string) => void
}

const TableTransactionPayOffsInstructor = ({ transactionPayOffsResponse, onEditRow }: Props) => {
  const columns: GridColDef[] = [
    {
      field: 'senderId',
      headerName: 'ID người thanh toán',
      width: 70,
      sortable: false,
      filterable: false,
    },
    {
      field: 'totalPaymentAmount',
      headerName: 'Tổng tiền thanh toán',
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.paymentAmount === 0 ? 0 : `${formatCurrency(params.row.totalPaymentAmount)}VND`,
    },
    {
      field: 'insertedDate',
      headerName: 'Ngày tạo',
      type: 'date',
      width: 130,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.insertedDate ? new Date(params.row.insertedDate) : null,
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

  const renderData = transactionPayOffsResponse.map(transaction => ({
    ...transaction,
    id: uuidv4(),
  }))

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={renderData}
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

export default TableTransactionPayOffsInstructor
