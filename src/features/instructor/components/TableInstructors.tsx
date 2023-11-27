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

import { getImage } from 'features/image/components/apis'
import { formatFullName } from 'libs/utils/handle-name'

import { InstructorFilterResponse, InstructorStatus } from '../types'

interface Props {
  instructors: InstructorFilterResponse[]
  onApproveOrRejectInstructor: (InstructorId: string, status: InstructorStatus) => void
  onEditRow: (id: string) => void
}

const TableInstructors = ({ instructors, onEditRow, onApproveOrRejectInstructor }: Props) => {
  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 70, sortable: false, filterable: false },
    {
      field: 'fullName',
      headerName: 'Họ và tên',
      width: 230,
      valueGetter: (params: GridValueGetterParams) => formatFullName(params.row),
    },
    // {
    //   field: 'email',
    //   headerName: 'Email',
    //   width: 130,
    // },
    { field: 'email', headerName: 'Email', width: 160 },
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
    },
    {
      field: 'action1',
      headerName: 'Hành động',
      description: 'Cập nhật hoặc ẩn Instructor',
      width: 120,
      renderCell: (params: GridRenderCellParams) => {
        const InstructorId = params.row.id
        return (
          <div>
            <Button
              variant="contained"
              color="primary"
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
      field: 'action2',
      headerName: 'Xét duyệt',
      description: 'Chấp nhận hoặc loại bỏ',
      width: 250,
      renderCell: (params: GridRenderCellParams) => {
        const InstructorId = params.row.id
        return (
          <div>
            {params.row.status === InstructorStatus.Pending && (
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() =>
                  onApproveOrRejectInstructor(params.row.id, InstructorStatus.Approved)
                } // Thay handleEdit bằng hàm xử lý sự kiện edit
                sx={{ marginRight: '10px' }}
              >
                Chấp nhận
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => onApproveOrRejectInstructor(params.row.id, InstructorStatus.Reject)} // Thay handleEdit bằng hàm xử lý sự kiện edit
              sx={{ marginRight: '10px' }}
            >
              Loại bỏ
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

export default TableInstructors
