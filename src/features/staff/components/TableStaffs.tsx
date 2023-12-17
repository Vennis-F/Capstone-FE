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

import { StaffFilterResponse } from '../types'

interface Props {
  staffs: StaffFilterResponse[]
  onBanStaff: (staffId: string) => void
  onReactiveStaff: (staffId: string) => void
  onEditRow: (id: string) => void
}

const TableStaffs = ({ staffs, onBanStaff, onEditRow, onReactiveStaff }: Props) => {
  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 70, sortable: false, filterable: false },
    {
      field: 'fullName',
      headerName: 'Họ và tên',
      width: 250,
      valueGetter: (params: GridValueGetterParams) => formatFullName(params.row),
    },
    // {
    //   field: 'email',
    //   headerName: 'Email',
    //   width: 130,
    // },
    { field: 'userName', headerName: 'Tên đăng nhập', width: 160 },
    {
      field: 'avatar',
      headerName: 'Ảnh đại diện',
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <RenderImage
          src={getImage(params.row.avatar)}
          alt="Preview"
          style={{ height: '48px', width: '144px', padding: 0 }}
          imageStyle={{ height: '48px', width: '144px' }}
        />
      ),
      sortable: false,
      filterable: false,
    },
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
      field: '',
      headerName: 'Hành động',
      description: 'Cập nhật hoặc ẩn Staff',
      width: 200,
      renderCell: (params: GridRenderCellParams) => {
        const staffId = params.row.id
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
            {!params.row.active ? (
              <Button
                variant="contained"
                color="success"
                size="small"
                disabled={params.row.active}
                onClick={() => {
                  onReactiveStaff(staffId)
                }}
              >
                Kích hoạt
              </Button>
            ) : (
              <Button
                variant="contained"
                color="error"
                size="small"
                disabled={!params.row.active}
                onClick={() => {
                  onBanStaff(staffId)
                }} // Thay handleDelete bằng hàm xử lý sự kiện delete
              >
                Xóa
              </Button>
            )}
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
        rows={staffs}
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

export default TableStaffs
