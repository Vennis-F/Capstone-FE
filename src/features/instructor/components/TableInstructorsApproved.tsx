/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Typography } from '@mui/material'
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

import { getImage } from 'features/image/components/apis'
import { formatFullName } from 'libs/utils/handle-name'

import {
  InstructorFilterResponse,
  InstructorStatus,
  InstructorStatusInfo,
  instructorStatusInfors,
} from '../types'

interface Props {
  instructors: InstructorFilterResponse[]
  // onApproveOrRejectInstructor: (InstructorId: string, status: InstructorStatus) => void
  onEditRow: (id: string) => void
  onPaymentInstructor: (instructorId: string) => void
}

const TableInstructorsApproved = ({
  instructors,
  onEditRow,
  // onApproveOrRejectInstructor,
  onPaymentInstructor,
}: Props) => {
  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 70, sortable: false, filterable: false },
    {
      field: 'fullName',
      headerName: 'Họ và tên',
      width: 230,
      valueGetter: (params: GridValueGetterParams) => formatFullName(params.row),
    },
    { field: 'email', headerName: 'Email', width: 250 },
    // {
    //   field: 'avatar',
    //   headerName: 'Ảnh đại diện',
    //   width: 130,
    //   renderCell: (params: GridRenderCellParams) => (
    //     <RenderImage
    //       src={getImage(params.row.avatar)}
    //       alt="Preview"
    //       style={{ height: '48px', width: '144px', padding: 0 }}
    //       imageStyle={{ height: '48px', width: '144px' }}
    //     />
    //   ),
    //   sortable: false,
    //   filterable: false,
    // },
    {
      field: 'phoneNumber',
      headerName: 'Số điện thoại',
      width: 130,
    },
    {
      field: 'active',
      headerName: 'Hoạt động',
      type: 'boolean',
      width: 130,
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 130,
      renderCell: (params: GridRenderCellParams) => {
        const statusInfor: InstructorStatusInfo = instructorStatusInfors.find(
          infor => infor.status === params.row.status,
        ) as InstructorStatusInfo

        return (
          <Typography color={statusInfor.color} fontWeight="bold">
            {statusInfor.vietnamese}
          </Typography>
        )
      },
    },
    {
      field: 'action1',
      headerName: 'Hành động',
      description: 'Xem chi tiết',
      width: 120,
      renderCell: (params: GridRenderCellParams) => {
        const InstructorId = params.row.id
        return (
          <div>
            <Button
              variant="contained"
              color="info"
              size="small"
              onClick={() => onEditRow(params.row.id)} // Thay handleEdit bằng hàm xử lý sự kiện edit
              sx={{ marginRight: '10px' }}
            >
              Chi tiết
            </Button>
          </div>
        )
      },
      sortable: false,
      filterable: false,
    },
    {
      field: 'action3',
      headerName: 'Thanh toán',
      description: 'Thanh toán cho giảng viên',
      width: 140,
      renderCell: (params: GridRenderCellParams) => {
        const instructorId = params.row.id
        return (
          <div>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => onPaymentInstructor(instructorId)} // Thay handleEdit bằng hàm xử lý sự kiện edit
              sx={{ marginRight: '10px' }}
            >
              Thanh toán
            </Button>
          </div>
        )
      },
      sortable: false,
      filterable: false,
    },
  ]

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={instructors}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 15]}
        density="comfortable"
      />
    </div>
  )
}

export default TableInstructorsApproved
