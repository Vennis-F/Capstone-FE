/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid'

import { formatCurrency } from 'libs/utils/handle-price'

import { RefundFilterResponse } from '../types'

interface Props {
  refunds: RefundFilterResponse[]
  // onEditRow: (id: string) => void
}

const TableRefundsInCustomer = ({ refunds }: Props) => {
  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 70, sortable: false, filterable: false },
    // {
    //   field: 'fullName',
    //   headerName: 'Tên người yêu cầu',
    //   width: 200,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.lastName} ${params.row.middleName} ${params.row.firstName}`,
    // },
    { field: 'courseTitle', headerName: 'Tên khóa học', width: 130 },
    { field: 'bank', headerName: 'Ngân hàng', width: 130 },
    { field: 'accountNumber', headerName: 'Tài khoản Ngân hàng', width: 150 },
    { field: 'accountName', headerName: 'Tài khoản Ngân hàng', width: 150 },
    {
      field: 'refundPrice',
      headerName: 'Số tiền phải hoàn',
      width: 150,
      valueGetter: (params: GridValueGetterParams) => formatCurrency(params.row.refundPrice),
    },
    { field: 'refundReason', headerName: 'Lý do hoàn tiền', width: 130 },
    {
      field: 'insertedDate',
      headerName: 'Ngày tạo',
      type: 'date',
      width: 130,
      valueGetter: (params: GridValueGetterParams) => new Date(params.row.insertedDate),
    },
    {
      field: 'isApproved',
      headerName: 'Đã hoàn tiền',
      type: 'boolean',
      width: 130,
      sortable: false,
    },
    // {
    //   // field: 'u',
    //   field: '',
    //   headerName: 'Hành động',
    //   description: 'Hoàn tiền',
    //   width: 160,
    //   renderCell: (params: GridRenderCellParams) => (
    //     <div>
    //       <Button
    //         variant="contained"
    //         color="primary"
    //         size="small"
    //         onClick={() => onEditRow(params.row.id)} // Thay handleEdit bằng hàm xử lý sự kiện edit
    //         sx={{ marginRight: '10px' }}
    //         disabled={params.row.isApproved}
    //       >
    //         Đã hoàn tiền
    //       </Button>
    //     </div>
    //   ),
    //   sortable: false,
    //   filterable: false,
    // },
  ]

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={refunds}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
          sorting: {
            sortModel: [
              {
                field: 'insertedDate',
                sort: 'desc',
              },
            ],
          },
        }}
        pageSizeOptions={[10, 15]}
        density="comfortable"
      />
    </div>
  )
}

export default TableRefundsInCustomer
